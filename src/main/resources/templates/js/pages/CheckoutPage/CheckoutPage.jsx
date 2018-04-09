import React from 'react';
import {connect} from 'react-redux';
import {history} from '../../_helpers/index';
import {Navigation, Loader} from '../../_components/index'
import {Link, Redirect} from 'react-router-dom';
import {sortList} from '../../_helpers/index'
import {
    CanPurchase,
    HasCard,
    HasAddress,
    BooksInBasketSingleton,
    addDiscount10,
    addDiscount20,
    removeDiscounts
} from "../../_helpers";

import {checkoutActions, basketActions} from '../../_actions/index';

class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            discounted: false,
            code: '',
            validCode10: 'off2',
            validCode20: 'off5'
        };

        this.handleChange = this.handleChange.bind(this);
        this.sort = this.sort.bind(this);
        this.pay = this.pay.bind(this);
        this.checkDiscount = this.checkDiscount.bind(this);
        this.removeDiscount = this.removeDiscount.bind(this);
        this.getBooks = this.getBooks.bind(this);
        new BooksInBasketSingleton.getInstance().accept(new removeDiscounts());
    }

    sort(key, order) {
        this.props.dispatch(basketActions.sort(key, order));
    }

    handleChange(e) {
        this.setState({'discounted': false});
        const {name, value} = e.target;
        this.setState({[name]: (value ? value : null)});
    }

    checkDiscount() {
        if (this.state.code) {
            this.setState({'discounted': true});
            const booksInBasketSingleton = BooksInBasketSingleton.getInstance();
            if (this.state.code === this.state.validCode10 && booksInBasketSingleton.getBasketCount() >= 2) {
                booksInBasketSingleton.accept(new addDiscount10());
            } else if (this.state.code === this.state.validCode20 && booksInBasketSingleton.getBasketCount() >= 5) {
                booksInBasketSingleton.accept(new addDiscount20());
            }
        }
    }

    removeDiscount() {
        const booksInBasketSingleton = BooksInBasketSingleton.getInstance();
        this.setState({'code': ''});
        this.setState({'discounted': false});
        booksInBasketSingleton.accept(new removeDiscounts())
    }

    pay() {
        const {user, dispatch} = this.props;
        if (new CanPurchase().canPurchase(user, BooksInBasketSingleton.getInstance().getBooksInBasket()))
            dispatch(checkoutActions.buy(user.id, BooksInBasketSingleton.getInstance().getBookList()));
    }

    getBooks(books) {
        const vMiddle = {
            verticalAlign: 'middle'
        };
        if (books.length === 0)
            return (<tr>
                <td colSpan={9} align={'center'}>Basket is empty</td>
            </tr>);
        else
            return books.map((book) => (
                    <tr className={'not_first' + (book.book.available < book.quantity ? ' overorder' : '')}
                        key={book.book.id} onClick={() => history.push('/books/' + book.book.id)}>
                        <td>
                            {book.book.image ?
                                <a href={book.book.image} target="_blank">
                                    <img className={'imageSmall'} src={book.book.image}/>
                                </a> :
                                <a href={'/main/resources/static/images/default.jpeg'} target="_blank">
                                    <img className={'imageSmall'} src={'/main/resources/static/images/default.jpeg'}/>
                                </a>
                            }</td>
                        <td style={vMiddle}>{book.book.title}</td>
                        <td style={vMiddle}>{(book.book.price).toFixed(2) + ' EUR'}</td>

                        {book.book.available < book.quantity && this.state.submitted ? (
                            <td style={vMiddle}>{book.quantity}<br/>Not enough<br/>in stock</td>
                        ) : (
                            <td style={vMiddle}>{book.quantity}</td>
                        )}

                        <td style={vMiddle}>{(book.quantity * book.book.price).toFixed(2) + ' EUR'}</td>
                    </tr>
                )
            );
    }

    render() {
        const {user, paying, sortKey, sortOrder} = this.props;
        const booksInBasketSingleton = BooksInBasketSingleton.getInstance();
        const {validCode10, validCode20, code, discounted} = this.state;
        return (
            <div>
                {!user ?
                    <Redirect to='/'/> : (
                        <div>
                            <Navigation/>
                            <div className="container">
                                {paying ? <Loader/> : (
                                    <div>
                                        <table style={{'width': '100%'}}>
                                            <tbody>
                                            <tr>
                                                <td colSpan={2} style={{
                                                    'textAlign': 'left',
                                                    'backgroundColor': 'white',
                                                    'padding': '10px'
                                                }}>
                                                    <h3>Order Summary: </h3>
                                                    <div className={'form-group' + (user.address ? '' : ' overorder')}>
                                                        <label>Ship to:</label>
                                                        {new HasAddress().hasAddress(user) ? (
                                                            <div className={'form-group'}
                                                                 style={{
                                                                     'padding': '10px',
                                                                     'border': '1px solid grey'
                                                                 }}>
                                                                {user.address.line1 && user.address.line1}
                                                                {user.address.line2 &&
                                                                <span><br/>{user.address.line2}</span>}
                                                                {user.address.city &&
                                                                <span><br/>{user.address.city}</span>}
                                                                {user.address.postCode &&
                                                                <span><br/>{user.address.postCode}</span>}
                                                                {user.address.country &&
                                                                <span><br/>{user.address.country}</span>}
                                                                <div className={'form-group'}>
                                                                    <Link to={'/users/' + user.id + '/address'}
                                                                          onClick={() => localStorage.setItem('url', 'basket')}
                                                                          className="btn btn-link">Edit
                                                                        Address</Link>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className={'form-group'}>
                                                                <span
                                                                    className="label label-danger">Address is required</span>
                                                                <Link to={'/users/' + user.id + '/newaddress'}
                                                                      onClick={() => localStorage.setItem('url', 'basket')}
                                                                      className="btn btn-link">Add
                                                                    Address</Link>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className={'form-group' + (user.card ? '' : ' overorder')}>
                                                        <label>Payment Option:</label>
                                                        {new HasCard().hasCard(user) ? (
                                                            <div className={'form-group'} style={{
                                                                'padding': '10px',
                                                                'border': '1px solid grey'
                                                            }}>
                                                                {user.card.type && user.card.type}
                                                                {user.card.number &&
                                                                <span><br/>{user.card.number}</span>}
                                                                {(user.card.expiryM && user.card.expiryM) &&
                                                                <span><br/>{user.card.expiryM}/{user.card.expiryY}</span>}
                                                                {user.card.cvv && <span><br/>{user.card.cvv}</span>}
                                                                <div className={'form-group'}>
                                                                    <Link to={'/users/' + user.id + '/card'}
                                                                          onClick={() => localStorage.setItem('url', 'basket')}
                                                                          className="btn btn-link">Edit Card</Link>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className={'form-group'}>
                                                                <span
                                                                    className="label label-danger">Card is required</span>
                                                                <Link to={'/users/' + user.id + '/newcard'}
                                                                      onClick={() => localStorage.setItem('url', 'basket')}
                                                                      className="btn btn-link">Add Card</Link>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <hr/>
                                                    {booksInBasketSingleton.getBasketCount() > 0 &&
                                                    <div className={'text-right'} style={{'paddingBottom': '10px'}}>
                                                        <button className={'btn btn-primary'}
                                                                onClick={() => history.push('/basket')}>
                                                            Edit Basket
                                                        </button>
                                                    </div>
                                                    }

                                                    <table className="table table-striped">
                                                        <tbody>
                                                        <tr>
                                                            <th>Cover</th>
                                                            <th className='description not_first'
                                                                onClick={() => this.sort('title', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                                                {sortKey === 'title' && (sortOrder === 'asc' ?
                                                                    <img className={'icon'}
                                                                         src={'/main/resources/static/images/az.png'}/> :
                                                                    <img className={'icon'}
                                                                         src={'/main/resources/static/images/za.png'}/>)}
                                                                Title
                                                            </th>
                                                            <th className='not_first'
                                                                onClick={() => this.sort('price', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                                                {sortKey === 'price' && (sortOrder === 'asc' ?
                                                                    <img className={'icon'}
                                                                         src={'/main/resources/static/images/09.png'}/> :
                                                                    <img className={'icon'}
                                                                         src={'/main/resources/static/images/90.png'}/>)}
                                                                Price
                                                            </th>
                                                            <th className='not_first'
                                                                onClick={() => this.sort('quantity', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                                                {sortKey === 'quantity' && (sortOrder === 'asc' ?
                                                                    <img className={'icon'}
                                                                         src={'/main/resources/static/images/09.png'}/> :
                                                                    <img className={'icon'}
                                                                         src={'/main/resources/static/images/90.png'}/>)}
                                                                Order quantity
                                                            </th>
                                                            <th className='not_first'
                                                                onClick={() => this.sort('total', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                                                {sortKey === 'total' && (sortOrder === 'asc' ?
                                                                    <img className={'icon'}
                                                                         src={'/main/resources/static/images/09.png'}/> :
                                                                    <img className={'icon'}
                                                                         src={'/main/resources/static/images/90.png'}/>)}
                                                                Total
                                                            </th>
                                                        </tr>
                                                        {this.getBooks(sortList(booksInBasketSingleton.getBooksInBasket(), sortKey, sortOrder))}
                                                        </tbody>
                                                    </table>
                                                </td>

                                                <td style={{'verticalAlign': 'top', 'whiteSpace': 'normal'}}>
                                                    <div>
                                                        <div>
                                                            <span className="label label-warning"
                                                            >*Enter '{validCode10}' to get 10% off if ordering 2 or more books
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="label label-warning"
                                                            >*Enter '{validCode20}' to get 20% off if ordering 5 or more books
                                                            </span>
                                                        </div>

                                                        {discounted && booksInBasketSingleton.getBasketDiscount() > 0 ?
                                                            <div className={'col-md-12'}
                                                                 style={{'padding': '10px 0 10px 0'}}>
                                                                <span
                                                                    className="label label-success">Discount applied</span>
                                                                <span className="glyphicon glyphicon-remove-circle"
                                                                      aria-hidden="true" onClick={this.removeDiscount}/>
                                                            </div> : (
                                                                <div className={'col-md-12'}
                                                                     style={{'padding': '10px 0 10px 0'}}>
                                                                    <div className={'col-md-8 text-left'}>
                                                                        <input type="text" className="form-control"
                                                                               name="code"
                                                                               value={code}
                                                                               onChange={this.handleChange}/>
                                                                    </div>
                                                                    <div className={'col-md-4'}>
                                                                        <button className={'btn'}
                                                                                onClick={this.checkDiscount}>
                                                                            Apply
                                                                        </button>
                                                                    </div>
                                                                </div>)
                                                        }

                                                        <div>
                                                            {discounted && booksInBasketSingleton.getBasketDiscount() === 0 &&
                                                            <span className="label label-danger">Discount can't be applied</span>
                                                            }
                                                        </div>

                                                        <div className={'text-right'}>
                                                            {discounted && booksInBasketSingleton.getBasketDiscount() > 0 &&
                                                            <h5>You
                                                                saved: {booksInBasketSingleton.getBasketDiscount().toFixed(2)}
                                                                EUR</h5>
                                                            }
                                                            <h4>
                                                                Order
                                                                Total: {booksInBasketSingleton.getBasketTotal().toFixed(2)}
                                                                EUR
                                                            </h4>
                                                        </div>
                                                        <button className={'btn btn-primary btn-block'}
                                                                onClick={this.pay}
                                                                disabled={!(new CanPurchase().canPurchase(user, booksInBasketSingleton.getBooksInBasket()))}>
                                                            Pay
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.authentication;
    const {booksInBasket, sortKey, sortOrder} = state.basket;
    const {paying} = state.checkout;
    return {
        booksInBasket,
        user,
        paying,
        sortKey,
        sortOrder
    };
}

const connectedCheckoutPage = connect(mapStateToProps)(CheckoutPage);
export {connectedCheckoutPage as CheckoutPage};