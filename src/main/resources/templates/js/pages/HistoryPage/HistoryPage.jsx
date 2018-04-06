import React from 'react';
import {connect} from 'react-redux';
import {Navigation, Loader} from "../../_components/index";
import {allUsersActions, historyActions} from "../../_actions";
import {history} from "../../_helpers";
import {sortList, getRating} from '../../_helpers/index'

require('react-widgets/lib/scss/react-widgets.scss');

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
        };

        const id = this.state.id;
        const {dispatch} = this.props;
        dispatch(allUsersActions.getUser(id));

        this.sort = this.sort.bind(this);
    }

    sort(key, order) {
        this.props.dispatch(historyActions.sort(key, order));
    }

    getBooks(books) {
        const vMiddle = {
            verticalAlign: 'middle'
        };
        const uniqid = require('uniqid');
        if (books.length === 0)
            return (<tr>
                <td colSpan={6} align={'center'}>Nothing to show yet</td>
            </tr>);
        else
            return books.map((book) => (
                    <tr className='not_first' key={uniqid()} onClick={() => history.push('/books/' + book.id)}>
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
                        <td style={vMiddle}>{getRating(book.comments)}</td>
                        <td style={vMiddle}>{book.comments.length}</td>
                    </tr>
                )
            );
    }

    render() {
        const {user, gettingUser, sortKey, sortOrder} = this.props;

        return (
            <div>
                <Navigation/>
                {gettingUser ? (
                    <Loader/>
                ) : (
                    !user || !user.books_purchased ? (
                        <div>Nothing to show</div>
                    ) : (
                        <div className="container">
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
                                        onClick={() => this.sort('author', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'author' && (sortOrder === 'asc' ?
                                            <img className={'icon'}
                                                 src={'/main/resources/static/images/az.png'}/> :
                                            <img className={'icon'}
                                                 src={'/main/resources/static/images/za.png'}/>)}
                                        Author
                                    </th>
                                    <th className='not_first'
                                        onClick={() => this.sort('category', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'category' && (sortOrder === 'asc' ?
                                            <img className={'icon'}
                                                 src={'/main/resources/static/images/az.png'}/> :
                                            <img className={'icon'}
                                                 src={'/main/resources/static/images/za.png'}/>)}
                                        Category
                                    </th>
                                    <th className='not_first'
                                        onClick={() => this.sort('rating', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'rating' && (sortOrder === 'asc' ?
                                            <img className={'icon'}
                                                 src={'/main/resources/static/images/09.png'}/> :
                                            <img className={'icon'}
                                                 src={'/main/resources/static/images/90.png'}/>)}
                                        Rating
                                    </th>
                                    <th className='not_first'
                                        onClick={() => this.sort('comments', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'comments' && (sortOrder === 'asc' ?
                                            <img className={'icon'}
                                                 src={'/main/resources/static/images/09.png'}/> :
                                            <img className={'icon'}
                                                 src={'/main/resources/static/images/90.png'}/>)}
                                        Comments
                                    </th>
                                </tr>
                                {this.getBooks(sortList(user.books_purchased, sortKey, sortOrder))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {gettingUser, user} = state.allUsers;
    const {sortKey, sortOrder} = state.orderHistory;
    return {
        gettingUser, user, sortKey, sortOrder
    };
}

const connectedHistoryPage = connect(mapStateToProps)(HistoryPage);
export {connectedHistoryPage as HistoryPage};