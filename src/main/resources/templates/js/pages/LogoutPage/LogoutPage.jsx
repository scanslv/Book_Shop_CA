import React from 'react';
import {connect} from 'react-redux';
import {history} from '../../_helpers/index';

import {userActions} from '../../_actions/index';

class LogoutPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(userActions.logout());
        history.push('/');
    }

    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return {
    };
}

const connectedLogoutPage = connect(mapStateToProps)(LogoutPage);
export {connectedLogoutPage as LogoutPage};