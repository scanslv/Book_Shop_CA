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
import {DefaultPage, DonePage} from '../pages/DefaultPage';
import {AllUsersPage, ShowUserPage} from '../pages/AllUsersPage';
import {ShowBookPage, NewBookPage} from '../pages/AllBooksPage';
import {ShowBasketPage} from '../pages/BasketPage';
import {NewAddressPage, AddressPage} from '../pages/AddressPage';
import {NewCardPage, CardPage} from '../pages/CardPage';
import {CheckoutPage} from "../pages/CheckoutPage";
import {HistoryPage} from "../pages/HistoryPage";

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
                                    <PrivateRoute exact path="/users/:id/newaddress" component={NewAddressPage}/>
                                    <PrivateRoute exact path="/users/:id/address" component={AddressPage}/>
                                    <PrivateRoute exact path="/users/:id/newcard" component={NewCardPage}/>
                                    <PrivateRoute exact path="/users/:id/card" component={CardPage}/>
                                    <PrivateRoute exact path="/users/:id/history" component={HistoryPage}/>
                                    <PrivateRoute path="/users/:id" component={ShowUserPage}/>
                                    <AdminRoute path="/users-all" component={AllUsersPage}/>
                                    <Route path="/logout" component={LogoutPage}/>
                                    <Route path="/register" component={RegisterPage}/>
                                    <AdminRoute exact path="/books/new" component={NewBookPage}/>
                                    <Route path="/books/:id" component={ShowBookPage}/>
                                    <Route path="/basket" component={ShowBasketPage}/>
                                    <PrivateRoute path="/checkout" component={CheckoutPage}/>
                                    <Route path="/404" component={DefaultPage}/>
                                    <PrivateRoute path="/done" component={DonePage}/>
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