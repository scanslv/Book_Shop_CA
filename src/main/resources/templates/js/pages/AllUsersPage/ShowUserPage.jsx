import React from 'react';
import {connect} from 'react-redux';
import {Navigation, Loader, Comments} from "../../_components/index";
import {allUsersActions, userActions} from '../../_actions/index'
import {DateTimePicker, Combobox} from 'react-widgets'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import {history} from "../../_helpers/history";

require('react-widgets/lib/scss/react-widgets.scss');

class ShowUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            editing: false,
            id: this.props.match.params.id,
            name: "",
            surname: "",
            phone: "",
            gender: "",
            dob: ""
        };

        Moment.locale('en-GB');
        momentLocalizer();

        const id = this.state.id;
        const {dispatch} = this.props;
        dispatch(allUsersActions.getUser(id));

        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this._delete = this._delete.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: (value ? value : null)});
    }

    componentDidUpdate(prevProps, prevState) {
        const id = this.props.match.params.id;
        const id2 = prevProps.match.params.id;
        if (id !== id2) {
            const {dispatch} = this.props;
            dispatch(allUsersActions.getUser(id));
        }
    }

// this will be called when it receive props
    componentWillReceiveProps(nextProps) {
        // you can also check props with current version
        // and set conditions to update state or not
        if (nextProps.user) {
            this.setState({name: nextProps.user.name});
            this.setState({surname: nextProps.user.surname});
            this.setState({phone: nextProps.user.phone});
            this.setState({gender: nextProps.user.gender});
            this.setState({dob: nextProps.user.dob});
        }
    }

    edit() {
        if (this.state.editing) {
            this.setState({editing: false});
            this.setState({name: this.props.user.name});
            this.setState({surname: this.props.user.surname});
            this.setState({phone: this.props.user.phone});
            this.setState({gender: this.props.user.gender});
            this.setState({dob: this.props.user.dob});
        }
        else
            this.setState({editing: true});
    }

    save() {
        this.setState({submitted: true});
        const {id, name, surname, phone, gender, dob} = this.state;
        const user = {
            id: id,
            name: name,
            surname: surname,
            phone: phone,
            gender: gender,
            dob: dob,
            role: this.props.user.role

        };
        if (id.length > 0 && name && name.length > 0 && surname && surname.length > 0 && phone && phone.length > 0 && gender.length > 0 && dob.length > 0) {
            this.props.dispatch(allUsersActions.update(user));
            this.setState({editing: false});
        }
    }

    _delete() {
        this.setState({submitted: true});
        const {id} = this.state;
        this.props.dispatch(allUsersActions._delete(id));
        this.setState({editing: false});
    }

    render() {
        const {user, gettingUser, loggedUser, deleting} = this.props;
        const {submitted, editing, name, surname, phone, gender, dob} = this.state;
        return (
            <div>
                <Navigation/>
                {gettingUser || deleting ? (
                    <Loader/>
                ) : (
                    !user ? (
                        <div>Nothing to show</div>
                    ) : (
                        <div className="col-md-8 col-md-offset-2">
                            {loggedUser.role === 'ROLE_ADMIN' &&
                            <div className={'form-group'}>
                                <label htmlFor="id">ID</label>
                                <input type="text" className="form-control" value={user.id} disabled/>
                            </div>
                            }
                            <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name"
                                       value={editing ? name : user.name}
                                       onChange={this.handleChange} disabled={!editing}/>
                                {submitted && !name &&
                                <div className="help-block">Name is required</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && !surname ? ' has-error' : '')}>
                                <label htmlFor="surname">Surname</label>
                                <input type="text" className="form-control" name="surname"
                                       value={editing ? surname : user.surname}
                                       onChange={this.handleChange} disabled={!editing}/>
                                {submitted && !surname &&
                                <div className="help-block">Surname is required</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && !phone ? ' has-error' : '')}>
                                <label htmlFor="surname">Phone</label>
                                <input type="text" className="form-control" name="phone"
                                       value={editing ? phone : user.phone}
                                       onChange={this.handleChange} disabled={!editing}/>
                                {submitted && !phone &&
                                <div className="help-block">Phone is required</div>
                                }
                            </div>

                            <div className={'form-group'}>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" value={user.email} disabled/>
                            </div>

                            <div className={'form-group'}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" value={user.password} disabled/>
                            </div>

                            <div className={'form-group'}>
                                <label htmlFor="gender">Gender</label>
                                <Combobox
                                    name="gender"
                                    disabled={!editing}
                                    defaultValue={editing ? gender : user.gender}
                                    value={editing ? gender : user.gender}
                                    data={['Male', 'Female']}
                                    onChange={value => this.setState({gender: value})}
                                />
                            </div>

                            <div className={'form-group'}>
                                <label htmlFor="dob">DOB</label>
                                <DateTimePicker
                                    disabled={!editing}
                                    defaultValue={editing ? Moment(dob, 'MM/DD/YYYY', true).toDate() : Moment(user.dob, 'MM/DD/YYYY', true).toDate()}
                                    value={editing ? Moment(dob, 'MM/DD/YYYY', true).toDate() : Moment(user.dob, 'MM/DD/YYYY', true).toDate()}
                                    onChange={value => this.setState({dob: Moment(value).format('MM/DD/YYYY')})}
                                    time={false}
                                />
                            </div>

                            {loggedUser.role === 'ROLE_ADMIN' &&
                            <div className={'form-group'}>
                                <label htmlFor="role">Role</label>
                                <input type="text" className="form-control" value={user.role} disabled/>
                            </div>
                            }

                            <div className={'form-group'}>
                                <label htmlFor="reg_date">Registration date</label>
                                <input type="reg_date" className="form-control"
                                       value={Moment(user.reg_date).format('lll')} disabled/>
                            </div>

                            <div className={'form-group'}>
                                <label htmlFor="mod_date">Last modification date</label>
                                <input type="reg_date" className="form-control"
                                       value={Moment(user.mod_date).format('lll')} disabled/>
                            </div>

                            <hr/>

                            <div className="form-group col-md-12 text-center">
                                <div className="col-md-4">
                                    {user.address ?
                                        <button className="btn btn-primary btn-block" disabled={editing}
                                                onClick={() => history.push(user.id + '/address')}>View/Edit
                                            Address</button>
                                        :
                                        <button className="btn btn-primary btn-block" disabled={editing}
                                                onClick={() => history.push(user.id + '/newaddress')}>Add
                                            Address</button>
                                    }
                                </div>

                                <div className="col-md-4">
                                    <button className="btn btn-primary btn-block" disabled={editing}
                                            onClick={() => history.push(user.id + '/history')}>View Purchase History
                                    </button>
                                </div>

                                <div className="col-md-4">
                                    {user.card ?
                                        <button className="btn btn-primary btn-block" disabled={editing}
                                                onClick={() => history.push(user.id + '/card')}>View/Edit Payment
                                            Card</button>
                                        :
                                        <button className="btn btn-primary btn-block" disabled={editing}
                                                onClick={() => history.push(user.id + '/newcard')}>Add Payment
                                            Card</button>
                                    }
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block"
                                    onClick={this.edit}>{editing ? 'Cancel' : 'Edit'}</button>

                            <button className={'btn btn-primary btn-block' + (editing ? '' : ' hidden')}
                                    onClick={this.save}>Save
                            </button>

                            <button className={'btn btn-danger btn-block' + (!editing ? '' : ' hidden')}
                                    onClick={this._delete}>Delete
                            </button>

                            <Comments comments={user.comments}/>
                        </div>
                    )
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {gettingUser, user} = state.allUsers;
    const {deleting} = state.user;
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    return {
        gettingUser, user, loggedUser
    };
}

const connectedShowUserPage = connect(mapStateToProps)(ShowUserPage);
export {connectedShowUserPage as ShowUserPage};