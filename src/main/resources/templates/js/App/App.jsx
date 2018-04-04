import React from 'react';
import {Switch, Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {AdminRoute, PrivateRoute} from '../_components';
import {HomePage} from '../pages/HomePage';
import {LoginPage} from '../pages/LoginPage';
import {RegisterPage} from '../pages/RegisterPage';
import {LogoutPage} from '../pages/LogoutPage';
import {DefaultPage} from '../pages/DefaultPage';
import {AllUsersPage, ShowUserPage} from '../pages/AllUsersPage';
import {ShowBookPage, NewBookPage} from '../pages/AllBooksPage';

require('../../../static/scss/style.scss');

class App extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div>
                        {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Switch>
                                    <Route exact path="/" component={HomePage}/>
                                    <Route path="/login" component={LoginPage}/>
                                    <PrivateRoute path="/users/:id" component={ShowUserPage}/>
                                    <AdminRoute path="/users-all" component={AllUsersPage}/>
                                    <Route path="/logout" component={LogoutPage}/>
                                    <Route path="/register" component={RegisterPage}/>
                                    <AdminRoute exact path="/books/new" component={NewBookPage}/>
                                    <Route path="/books/:id" component={ShowBookPage}/>
                                    <Route path="/404" component={DefaultPage}/>
                                </Switch>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};