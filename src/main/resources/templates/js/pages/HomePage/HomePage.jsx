import React from 'react';
import {connect} from 'react-redux';
import {history} from '../../_helpers/index';
import {Redirect} from 'react-router-dom'
import {Navigation, Loader} from '../../_components/index'

import {userActions, bookActions, basketActions} from '../../_actions/index';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.addToBasket = this.addToBasket.bind(this);
        this.getBooks = this.getBooks.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(bookActions.getAll());
    }

    handleLogout() {
        this.props.dispatch(userActions.logout());
        // history.push('/login');
    }

    addToBasket(book) {
        this.props.dispatch(basketActions.addBook(book));
    }


    getBooks(books) {
        const vMiddle = {
            verticalAlign: 'middle'
        };
        if (books.length === 0)
            return (<tr>
                <td colSpan={6} align={'center'}>Nothing to show yet</td>
            </tr>);
        else
            return books.map((book) => (
                    <tr className='not_first' key={book.id} onClick={() => history.push('/books/' + book.id)}>
                        <td>
                            {book.image ?
                                <a href={book.image} target="_blank">
                                    <img className={'imageSmall'} src={book.image}/>
                                </a> :
                                <a href={'/main/resources/static/images/default.jpeg'} target="_blank">
                                    <img className={'imageSmall'} src={'/main/resources/static/images/default.jpeg'}/>
                                </a>
                            }</td>
                        <td style={vMiddle}>{book.title}</td>
                        <td style={vMiddle}>{book.author}</td>
                        <td style={vMiddle}>{book.category}</td>
                        <td style={vMiddle}>{book.available}</td>
                        <td style={vMiddle}>{(book.price).toFixed(2) + ' EUR'}</td>
                        <td style={vMiddle}>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                this.addToBasket(book)
                            }
                            } disabled={book.available < 1}
                                    className="btn btn-primary btn-block">Add to basket
                            </button>
                        </td>
                    </tr>
                )
            );
    }


    render() {
        const {books, gettingBooks} = this.props;
        return (
            <div>
                <Navigation/>
                {gettingBooks ? (
                    <Loader/>
                ) : (
                    !books ? (
                        <div>Nothing to show</div>
                    ) : (
                        <div>
                            {gettingBooks ? (
                                <Loader/>
                            ) : (
                                !books ? (
                                    <div>Nothing to show</div>
                                ) : (
                                    <div className="container">
                                        <table className="table table-striped">
                                            <tbody>
                                            <tr>
                                                <th>Cover</th>
                                                <th className='description'>Title</th>
                                                <th>Author</th>
                                                <th>Category</th>
                                                <th>Available</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                            {this.getBooks(books)}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            )}
                        </div>
                    )
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {books, gettingBooks} = state.book;
    return {
        books,
        gettingBooks
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};