import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {DateTimePicker, SelectList, Combobox} from 'react-widgets'
import {Navigation, Loader} from "../../_components/index";
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'

import {userActions} from '../../_actions/index';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        Moment.locale('en-GB');
        momentLocalizer();

        this.state = {
            name: '',
            surname: '',
            email: '',
            phone: '',
            gender: 'Male',
            dob: Moment(new Date(), 'MM/DD/YYYY', true).format('MM/DD/YYYY'),
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: (value ? value : null)});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {name, surname, email, phone, gender, dob, password} = this.state;
        const user = {
            name: name,
            surname: surname,
            phone: phone,
            gender: gender,
            dob: dob,
            email: email,
            password: password,
            role: 'ANY'
        };
        const {dispatch} = this.props;
        if (user.name && user.surname && user.email && user.phone && user.gender && user.dob && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const {registering, invalidEmail, loggedIn} = this.props;
        const {submitted, name, surname, email, phone, gender, dob, password} = this.state;
        return (
            loggedIn ? (
                <Redirect to='/'/>
            ) : (
                registering ? (
                    <Loader/>
                ) : (
                    <div className="col-md-6 col-md-offset-3">
                        <h2>Register</h2>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                                <label htmlFor="name">First Name</label>
                                <input type="text" className="form-control" name="name" value={name}
                                       onChange={this.handleChange}/>
                                {submitted && !name &&
                                <div className="help-block">First Name is required</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && !surname ? ' has-error' : '')}>
                                <label htmlFor="surname">Last Name</label>
                                <input type="text" className="form-control" name="surname" value={surname}
                                       onChange={this.handleChange}/>
                                {submitted && !surname &&
                                <div className="help-block">Last Name is required</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && (!email || invalidEmail) ? ' has-error' : '')}>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" name="email" value={email}
                                       onChange={this.handleChange}/>
                                {submitted && !email &&
                                <div className="help-block">Email is required</div>
                                }
                                {(submitted && invalidEmail) &&
                                <div className="help-block">Check email</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && !phone ? ' has-error' : '')}>
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="form-control" name="phone" value={phone}
                                       onChange={this.handleChange}/>
                                {submitted && !phone &&
                                <div className="help-block">Phone is required</div>
                                }
                            </div>

                            <div className={'form-group'}>
                                <label htmlFor="gender">Gender</label>
                                <Combobox
                                    name="gender"
                                    defaultValue={gender}
                                    value={gender}
                                    data={['Male', 'Female']}
                                    onChange={value => this.setState({gender: value})}
                                />
                            </div>

                            <div className={'form-group'}>
                                <label htmlFor="dob">DOB</label>
                                <DateTimePicker
                                    value={Moment(dob, 'MM/DD/YYYY', true).toDate()}
                                    onChange={value => this.setState({dob: Moment(value).format('MM/DD/YYYY')})}
                                    time={false}
                                />
                            </div>

                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={password}
                                       onChange={this.handleChange}/>
                                {submitted && !password &&
                                <div className="help-block">Password is required</div>
                                }
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary">Register</button>
                                {registering &&
                                <img
                                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                                }
                                <Link to="/login" className="btn btn-link">Cancel</Link>
                            </div>
                        </form>
                    </div>
                )
            )
        );
    }
}

function mapStateToProps(state) {
    const {registering, invalidEmail, loggedIn} = state.authentication;
    return {
        registering,
        invalidEmail,
        loggedIn
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export {connectedRegisterPage as RegisterPage};