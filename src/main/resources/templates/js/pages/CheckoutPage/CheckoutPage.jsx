import React from 'react';
import {connect} from 'react-redux';
import {history} from '../../_helpers/index';
import {Navigation, Loader} from '../../_components/index'
import {Link, Redirect} from 'react-router-dom';
import {CanPurchase, HasCard, HasAddress, BooksInBasketSingleton} from "../../_helpers";

import {checkoutActions} from '../../_actions/index';

class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            discounted: false,
            saving: 0,
            code: '',
            validCode: 'off2'
        };

        this.handleChange = this.handleChange.bind(this);
        this.pay = this.pay.bind(this);
        this.checkDiscount = this.checkDiscount.bind(this);
        this.removeDiscount = this.removeDiscount.bind(this);
    }

    handleChange(e) {
        this.setState({'discounted': false});
        const {name, value} = e.target;
        this.setState({[name]: (value ? value : null)});
    }

    checkDiscount() {
        this.setState({'discounted': true});
        const booksInBasketSingleton = BooksInBasketSingleton.getInstance();
        if (this.state.code === this.state.validCode && booksInBasketSingleton.getBasketCount() >= 2) {
            this.setState({'saving': booksInBasketSingleton.getBasketTotal() * 0.1})
        }
    }

    removeDiscount() {
        this.setState({'code': ''});
        this.setState({'discounted': false});
        this.setState({'saving': 0})
    }

    pay() {
        const {user, dispatch} = this.props;
        if (new CanPurchase().canPurchase(user, BooksInBasketSingleton.getInstance().getBooksInBasket()))
            dispatch(checkoutActions.buy(user.id, BooksInBasketSingleton.getInstance().getBookList()));
    }

    render() {
        const {user, paying} = this.props;
        const booksInBasketSingleton = BooksInBasketSingleton.getInstance();
        const {validCode, code, discounted, saving} = this.state;
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
                                                    <div className={'form-group'}>
                                                        <label>Books to
                                                            order: {booksInBasketSingleton.getBasketCount()}</label>
                                                    </div>
                                                    <div className={'form-group' + (user.address ? '' : ' overorder')}>
                                                        <label>Ship to:</label>
                                                        {new HasAddress().hasAddress(user) ? (
                                                            <div className={'form-group'}>
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
                                                            <div className={'form-group'}>
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
                                                </td>

                                                <td style={{'verticalAlign': 'bottom', 'whiteSpace': 'normal'}}>
                                                    <div>
                                                        <span className="label label-warning"
                                                        >*Enter '{validCode}' to get 10% off if ordering 2 or more books
                                                        </span>

                                                        {discounted && saving > 0 ?
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
                                                            {discounted && (booksInBasketSingleton.getBasketCount() <= 2 && saving === 0) &&
                                                            <span className="label label-danger">Discount can't be applied</span>
                                                            }
                                                        </div>

                                                        <div className={'text-right'}>
                                                            {discounted && saving > 0 &&
                                                            <h5>You saved: {saving.toFixed(2)} EUR</h5>
                                                            }
                                                            <h4>
                                                                Order
                                                                Total: {getTotal(booksInBasketSingleton.getBasketTotal(), saving).toFixed(2)}
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

function getTotal(basketTotal, saving) {
    return basketTotal - saving;
}

function mapStateToProps(state) {
    const {user} = state.authentication;
    const {booksInBasket} = state.basket;
    const {paying} = state.checkout;
    return {
        booksInBasket,
        user,
        paying
    };
}

const connectedCheckoutPage = connect(mapStateToProps)(CheckoutPage);
export {connectedCheckoutPage as CheckoutPage};