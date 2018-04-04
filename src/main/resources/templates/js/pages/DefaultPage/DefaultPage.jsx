import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {Navigation} from "../../_components/index";

class DefaultPage extends React.Component {

    render() {
        return (
            <div>
                <Navigation/>
                <div className="text-center">
                    <h1>404</h1>
                    <h4>Ooops, something went wrong!</h4>
                    The page you are looking for can't be found. Go home by <Link to={'/'}>clicking here!</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedDefaultPage = connect(mapStateToProps)(DefaultPage);
export {connectedDefaultPage as DefaultPage};