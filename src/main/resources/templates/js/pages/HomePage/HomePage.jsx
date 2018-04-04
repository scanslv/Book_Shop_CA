import React from 'react';
import {connect} from 'react-redux';
import {history} from '../../_helpers/index';
import {Redirect} from 'react-router-dom'
import {Navigation, Loader} from '../../_components/index'

import {userActions, bookActions} from '../../_actions/index';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        HomePage.handleClick = HomePage.handleClick.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(bookActions.getAll());
    }

    handleLogout() {
        this.props.dispatch(userActions.logout());
        // history.push('/login');
    }

    static handleClick(type) {
        switch (type) {
            case 'users':
                history.push('/users');
                break;
            case 'feeds':
                history.push('/feeds');
                break;
            case 'comments':
                history.push('/comments');
                break;
            case 'newrequests':
                history.push('/requests');
                break;
            default:
                history.push('/');
                break;
        }
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
                                                <th>Price</th>
                                            </tr>
                                            {getBooks(books)}
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
const vMiddle = {
  verticalAlign: 'middle'
};

function getBooks(books) {
    if (books.length === 0)
        return (<tr>
            <td colSpan={5} align={'center'}>Nothing to show yet</td>
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
                    <td style={vMiddle}>{(book.price).toFixed(2) +' EUR'}</td>
                </tr>
            )
        );
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