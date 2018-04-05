import React from 'react';
import {connect} from 'react-redux';
import {Navigation, Loader} from "../../_components/index";
import {allUsersActions} from '../../_actions/index'
import {history} from "../../_helpers/history";
import {sortList} from '../../_helpers/index'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'

class AllUsersPage extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.match.path === '/users-all' || !this.props.users) {
            const {dispatch} = this.props;
            dispatch(allUsersActions.getAll());
        }

        Moment.locale('en-GB');
        momentLocalizer();

        this.getUserRecords = this.getUserRecords.bind(this);
        this.sort = this.sort.bind(this);
    }

    getUserRecords(users) {
        if (users.length === 0)
            return (<tr>
                <td colSpan={8} align={'center'}>No records yet</td>
            </tr>);
        else
            return users.map((user) => (
                    <tr className='not_first' key={user.id} onClick={() => history.push('/users/' + user.id)}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.comments.length}</td>
                        <td>{Moment(user.reg_date).format('lll')}</td>
                        <td>{Moment(user.mod_date).format('lll')}</td>
                    </tr>
                )
            );
    }

    sort(key, order) {
        this.props.dispatch(allUsersActions.sort(key, order));
    }

    render() {
        const {users, gettingUsers, sortKey, sortOrder} = this.props;

        return (
            <div>
                <Navigation/>
                {gettingUsers ? (
                    <Loader/>
                ) : (
                    !users ? (
                        <div>Nothing to show</div>
                    ) : (
                        <div className="container">
                            <table className="table table-striped">
                                <tbody>
                                <tr>
                                    <th className='not_first'
                                        onClick={() => this.sort('id', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'id' && (sortOrder === 'asc' ?
                                            <img className={'icon'} src={'/main/resources/static/images/09.png'}/> :
                                            <img className={'icon'} src={'/main/resources/static/images/90.png'}/>)}
                                        ID
                                    </th>
                                    <th className='not_first'
                                        onClick={() => this.sort('name', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'name' && (sortOrder === 'asc' ?
                                            <img className={'icon'} src={'/main/resources/static/images/az.png'}/> :
                                            <img className={'icon'} src={'/main/resources/static/images/za.png'}/>)}
                                        Name
                                    </th>
                                    <th className='not_first'
                                        onClick={() => this.sort('surname', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'surname' && (sortOrder === 'asc' ?
                                            <img className={'icon'} src={'/main/resources/static/images/az.png'}/> :
                                            <img className={'icon'} src={'/main/resources/static/images/za.png'}/>)}
                                        Surname
                                    </th>
                                    <th className='not_first'
                                        onClick={() => this.sort('email', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'email' && (sortOrder === 'asc' ?
                                            <img className={'icon'} src={'/main/resources/static/images/az.png'}/> :
                                            <img className={'icon'} src={'/main/resources/static/images/za.png'}/>)}
                                        Email
                                    </th>
                                    <th className='not_first'
                                        onClick={() => this.sort('role', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'role' && (sortOrder === 'asc' ?
                                            <img className={'icon'} src={'/main/resources/static/images/az.png'}/> :
                                            <img className={'icon'} src={'/main/resources/static/images/za.png'}/>)}
                                        Role
                                    </th>
                                    <th>
                                        Comments
                                    </th>
                                    <th className='not_first'
                                        onClick={() => this.sort('reg_date', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'reg_date' && (sortOrder === 'asc' ?
                                            <img className={'icon'} src={'/main/resources/static/images/09.png'}/> :
                                            <img className={'icon'} src={'/main/resources/static/images/90.png'}/>)}
                                        Registered
                                    </th>
                                    <th className='not_first'
                                        onClick={() => this.sort('mod_date', sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortKey === 'mod_date' && (sortOrder === 'asc' ?
                                            <img className={'icon'} src={'/main/resources/static/images/09.png'}/> :
                                            <img className={'icon'} src={'/main/resources/static/images/90.png'}/>)}
                                        Last modified
                                    </th>
                                </tr>
                                {this.getUserRecords(sortList(users, sortKey, sortOrder))}
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
    const {gettingUsers, users, sortKey, sortOrder} = state.allUsers;
    return {
        gettingUsers, users, sortKey, sortOrder
    };
}

const connectedAllUsersPage = connect(mapStateToProps)(AllUsersPage);
export {connectedAllUsersPage as AllUsersPage};