import React from 'react';
import {connect} from 'react-redux';
import {history} from '../../_helpers/index';
import {Redirect} from 'react-router-dom'
import {Navigation, Loader} from '../../_components/index'
import {sortList} from '../../_helpers/index'

import {userActions, bookActions} from '../../_actions/index';
import {basketActions} from "../../_actions/basket.actions";

class ShowBasketPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.removeFromBasket = this.removeFromBasket.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(bookActions.getAll());
    }

    handleLogout() {
        this.props.dispatch(userActions.logout());
        // history.push('/login');
    }

    removeFromBasket(book) {
        this.props.dispatch(basketActions.removeBook(book));
    }

    sort(key, order) {
        this.props.dispatch(basketActions.sort(key, order));
    }

    getBooks(books) {
        const vMiddle = {
            verticalAlign: 'middle'
        };
        if (books.length === 0)
            return (<tr>
                <td colSpan={7} align={'center'}>Basket is empty</td>
            </tr>);
        else
            return books.map((book) => (
                    <tr className='not_first' key={book.book.id} onClick={() => history.push('/books/' + book.book.id)}>
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
                        <td style={vMiddle}>{book.book.author}</td>
                        <td style={vMiddle}>{book.book.category}</td>
                        <td style={vMiddle}>{book.book.available}</td>
                        <td style={vMiddle}>{(book.book.price).toFixed(2) + ' EUR'}</td>
                        <td style={vMiddle}>{(book.quantity)}</td>
                        <td style={vMiddle}>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                this.removeFromBasket(book.book)
                            }
                            } disabled={book.available < 1}
                                    className="btn btn-primary btn-block">Remove from basket
                            </button>
                        </td>
                    </tr>
                )
            );
    }


    render() {
        const {booksInBasket, sortKey, sortOrder} = this.props;
        return (
            <div>
                <Navigation/>
                <div className="container">
                    <table className="table table-striped">
                        <tbody>
                        <tr>
                            <th>Cover</th>
                            <th className='description not_first' onClick={() => this.sort('title', sortOrder==='asc' ? 'desc' : 'asc')}>
                                {sortKey === 'title' && (sortOrder === 'asc' ?
                                    <img className={'icon'} src={'/main/resources/static/images/az.png'}/> :
                                    <img className={'icon'} src={'/main/resources/static/images/za.png'}/>)}
                                Title
                            </th>
                            <th className='not_first' onClick={() => this.sort('author', sortOrder==='asc' ? 'desc' : 'asc')}>
                                {sortKey === 'author' && (sortOrder === 'asc' ?
                                    <img className={'icon'} src={'/main/resources/static/images/az.png'}/> :
                                    <img className={'icon'} src={'/main/resources/static/images/za.png'}/>)}
                                Author
                            </th>
                            <th className='not_first' onClick={() => this.sort('category', sortOrder==='asc' ? 'desc' : 'asc')}>
                                {sortKey === 'category' && (sortOrder === 'asc' ?
                                    <img className={'icon'} src={'/main/resources/static/images/az.png'}/> :
                                    <img className={'icon'} src={'/main/resources/static/images/za.png'}/>)}
                                Category
                            </th>
                            <th className='not_first' onClick={() => this.sort('available', sortOrder==='asc' ? 'desc' : 'asc')}>
                                {sortKey === 'available' && (sortOrder === 'asc' ?
                                    <img className={'icon'} src={'/main/resources/static/images/09.png'}/> :
                                    <img className={'icon'} src={'/main/resources/static/images/90.png'}/>)}
                                Available
                            </th>
                            <th className='not_first' onClick={() => this.sort('price', sortOrder==='asc' ? 'desc' : 'asc')}>
                                {sortKey === 'price' && (sortOrder === 'asc' ?
                                    <img className={'icon'} src={'/main/resources/static/images/09.png'}/> :
                                    <img className={'icon'} src={'/main/resources/static/images/90.png'}/>)}
                                Price
                            </th>
                            <th>Order quantity</th>
                            <th></th>
                        </tr>
                        {this.getBooks(sortList(booksInBasket, sortKey, sortOrder))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {booksInBasket, sortKey, sortOrder} = state.basket;
    return {
        booksInBasket,
        sortKey,
        sortOrder
    };
}

const connectedBasketPage = connect(mapStateToProps)(ShowBasketPage);
export {connectedBasketPage as ShowBasketPage};