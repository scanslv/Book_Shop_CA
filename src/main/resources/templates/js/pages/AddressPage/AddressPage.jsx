import React from 'react';
import {connect} from 'react-redux';
import {Navigation, Loader} from "../../_components/index";
import {allUsersActions, addressActions} from "../../_actions";
import {CountryDropdown} from 'react-country-region-selector';
import {history} from "../../_helpers";

require('react-widgets/lib/scss/react-widgets.scss');

class AddressPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            editing: false,
            id: this.props.match.params.id,
            line1: '',
            line2: '',
            city: '',
            postCode: '',
            country: 'Ireland',
        };

        const id = this.state.id;
        const {dispatch} = this.props;
        dispatch(allUsersActions.getUser(id));

        this.handleChange = this.handleChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this._delete = this._delete.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: (value ? value : null)});
    }

    handleCountryChange(e) {
        this.setState({['country']: (e ? e : null)});
    }

// this will be called when it receive props
    componentWillReceiveProps(nextProps) {
        // you can also check props with current version
        // and set conditions to update state or not
        if (nextProps.user && nextProps.user.address) {
            this.setState({line1: nextProps.user.address.line1});
            this.setState({line2: nextProps.user.address.line2});
            this.setState({city: nextProps.user.address.city});
            this.setState({postCode: nextProps.user.address.postCode});
            this.setState({country: nextProps.user.address.country});
        }
    }

    edit() {
        if (this.state.editing) {
            this.setState({editing: false});
            this.setState({submitted: false});
            this.setState({line1: this.props.user.address.line1});
            this.setState({line2: this.props.user.address.line2});
            this.setState({city: this.props.user.address.city});
            this.setState({postCode: this.props.user.address.postCode});
            this.setState({country: this.props.user.address.country});
            if (localStorage.getItem('url') === 'basket') {
                localStorage.removeItem('url');
                history.push('/checkout');
            }
        }
        else
            this.setState({editing: true});
    }

    save() {
        this.setState({submitted: true});
        const {id, line1, line2, city, postCode, country} = this.state;

        const address = {
            id: this.props.user.address.id,
            line1: line1,
            line2: line2,
            city: city,
            postCode: postCode,
            country: country
        };
        if (line1 && line1.length > 0 &&
            line2 && line2.length > 0 &&
            city && city.length > 0 &&
            postCode && postCode.length > 0 &&
            country && country.length > 0) {
            this.setState({editing: false});
            this.props.dispatch(addressActions.update(id, address));
            if (localStorage.getItem('url') === 'basket') {
                localStorage.removeItem('url');
                history.push('/checkout');
            }
        }
    }

    _delete() {
        this.setState({submitted: true});
        const {id} = this.state;
        this.props.dispatch(addressActions._delete(id));
        this.setState({editing: false});
    }

    render() {
        const {user, gettingUser, loggedUser} = this.props;
        const {submitted, editing, line1, line2, city, postCode, country} = this.state;

        return (
            <div>
                <Navigation/>
                {gettingUser ? (
                    <Loader/>
                ) : (
                    !user || !user.address ? (
                        <div>Nothing to show</div>
                    ) : (
                        <div className="col-md-8 col-md-offset-2">
                            {loggedUser.role === 'ROLE_ADMIN' &&
                            <div className={'form-group'}>
                                <label htmlFor="id">ID</label>
                                <input type="text" className="form-control" value={user.address.id} disabled/>
                            </div>
                            }

                            <div className={'form-group' + (submitted && !line1 ? ' has-error' : '')}>
                                <label htmlFor="line1">Address line 1</label>
                                <input type="text" className="form-control" name="line1"
                                       value={editing ? line1 : user.address.line1}
                                       onChange={this.handleChange}
                                       disabled={!editing}/>
                                {submitted && !line1 &&
                                <div className="help-block">Address is required</div>
                                }
                            </div>

                            <div className={'form-group'}>
                                <label htmlFor="line2">Address line 2</label>
                                <input type="text" className="form-control" name="line2"
                                       value={editing ? line2 : user.address.line2}
                                       onChange={this.handleChange}
                                       disabled={!editing}/>
                            </div>

                            <div className={'form-group' + (submitted && !city ? ' has-error' : '')}>
                                <label htmlFor="line1">City</label>
                                <input type="text" className="form-control" name="city"
                                       value={editing ? city : user.address.city}
                                       onChange={this.handleChange}
                                       disabled={!editing}/>
                                {submitted && !city &&
                                <div className="help-block">City is required</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && !postCode ? ' has-error' : '')}>
                                <label htmlFor="line1">Post Code</label>
                                <input type="text" className="form-control" name="postCode"
                                       value={editing ? postCode : user.address.postCode}
                                       onChange={this.handleChange}
                                       disabled={!editing}/>
                                {submitted && !postCode &&
                                <div className="help-block">Post Code is required</div>
                                }
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="country">Country</label>
                                <div className={'form-group'}>
                                    <CountryDropdown
                                        disabled={!editing}
                                        classes={'country' + (editing ? '' : ', disabled')}
                                        name={'country'}
                                        value={country}
                                        defaultOptionLabel={'Ireland'}
                                        onChange={this.handleCountryChange}/>
                                </div>
                            </div>

                            <hr/>

                            <button className="btn btn-primary btn-block"
                                    onClick={this.edit}>{editing ? 'Cancel' : 'Edit'}</button>

                            <button className={'btn btn-primary btn-block' + (editing ? '' : ' hidden')}
                                    onClick={this.save}>Save
                            </button>

                            <button className={'btn btn-danger btn-block' + (!editing ? '' : ' hidden')}
                                    onClick={this._delete}>Delete
                            </button>
                        </div>
                    )
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {gettingUser, user} = state.allUsers;
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    return {
        gettingUser, user, loggedUser
    };
}

const connectedAddressPage = connect(mapStateToProps)(AddressPage);
export {connectedAddressPage as AddressPage};