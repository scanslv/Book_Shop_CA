import React from 'react';
import {connect} from 'react-redux';
import {Navigation, Loader} from "../../_components/index";
import {allUsersActions} from '../../_actions/index'
import {history} from "../../_helpers/history";

class AllUsersPage extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.match.path === '/users-all' || !this.props.users) {
            const {dispatch} = this.props;
            dispatch(allUsersActions.getAll());
        }

        this.getUserRecords = this.getUserRecords.bind(this);
    }

    getUserRecords(users) {
        if (users.length === 0)
            return (<tr>
                <td colSpan={6} align={'center'}>No records yet</td>
            </tr>);
        else
            return users.map((user) => (
                    <tr className='not_first' key={user.id} onClick={() => history.push('/users/' + user.id)}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                )
            );
    }

    render() {
        const {users} = this.props;
        const {gettingUsers} = this.props;

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
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                                {this.getUserRecords(users)}
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
    const {gettingUsers, users} = state.allUsers;
    return {
        gettingUsers, users
    };
}

const connectedAllUsersPage = connect(mapStateToProps)(AllUsersPage);
export {connectedAllUsersPage as AllUsersPage};