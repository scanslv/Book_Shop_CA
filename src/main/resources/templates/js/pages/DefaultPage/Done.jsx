import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {Navigation} from "../../_components/index";

class DonePage extends React.Component {

    render() {
        return (
            <div>
                <Navigation/>
                <div className="text-center">
                    <h1>Thank you</h1>
                    <h4>Books purchased successfully!</h4>
                    Go home by <Link to={'/'}>clicking here!</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedDonePage = connect(mapStateToProps)(DonePage);
export {connectedDonePage as DonePage};