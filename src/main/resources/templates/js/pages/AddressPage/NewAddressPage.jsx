import React from 'react';
import {connect} from 'react-redux';
import {Navigation, Loader} from "../../_components/index";
import {addressActions} from '../../_actions/index'
import {history} from '../../_helpers/index';
import {CountryDropdown} from 'react-country-region-selector';

require('react-widgets/lib/scss/react-widgets.scss');

class NewAddressPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            id: this.props.match.params.id,
            line1: '',
            line2: '',
            city: '',
            postCode: '',
            country: 'Ireland',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.save = this.save.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: (value ? value : null)});
    }

    handleCountryChange(e) {
        this.setState({['country']: (e ? e : null)});
    }

    save() {
        this.setState({submitted: true});
        const {id, line1, line2, city, postCode, country} = this.state;
        const address = {
            line1: line1,
            line2: line2,
            city: city,
            postCode: postCode,
            country: country
        };
        if (line1 && line1.length > 0 &&
            city && city.length > 0 &&
            postCode && postCode.length > 0 &&
            country && country.length > 0) {
            this.props.dispatch(addressActions.create(id, address));
        }
    }

    render() {
        // const {creatingAddress} = this.props;
        const creatingAddress = false;
        const {submitted, line1, line2, city, postCode, country, id} = this.state;
        return (
            <div>
                <Navigation/>
                {creatingAddress ? (
                    <Loader/>
                ) : (
                    <div className="col-md-8 col-md-offset-2">

                        <div className={'form-group' + (submitted && !line1 ? ' has-error' : '')}>
                            <label htmlFor="line1">Address line 1</label>
                            <input type="text" className="form-control" name="line1"
                                   value={line1}
                                   onChange={this.handleChange}/>
                            {submitted && !line1 &&
                            <div className="help-block">Address is required</div>
                            }
                        </div>

                        <div className={'form-group'}>
                            <label htmlFor="line2">Address line 2</label>
                            <input type="text" className="form-control" name="line2"
                                   value={line2}
                                   onChange={this.handleChange}/>
                        </div>

                        <div className={'form-group' + (submitted && !city ? ' has-error' : '')}>
                            <label htmlFor="line1">City</label>
                            <input type="text" className="form-control" name="city"
                                   value={city}
                                   onChange={this.handleChange}/>
                            {submitted && !city &&
                            <div className="help-block">City is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !postCode ? ' has-error' : '')}>
                            <label htmlFor="line1">Post Code</label>
                            <input type="text" className="form-control" name="postCode"
                                   value={postCode}
                                   onChange={this.handleChange}/>
                            {submitted && !postCode &&
                            <div className="help-block">Post Code is required</div>
                            }
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="country">Country</label>
                            <div className={'form-group'}>
                                <CountryDropdown
                                    classes={'country'}
                                    name={'country'}
                                    value={country}
                                    defaultOptionLabel={'Ireland'}
                                    onChange={this.handleCountryChange}/>
                            </div>
                        </div>
                        <hr/>

                        <button className={'btn btn-primary btn-block'}
                                onClick={this.save}>Save
                        </button>

                        <button className={'btn btn-danger btn-block'}
                                onClick={() => history.push('/users/' + id)}>Cancel
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {creatingAddress} = state.address;
    return {
        creatingAddress
    };
}

const connectedNewAddressPage = connect(mapStateToProps)(NewAddressPage);
export {connectedNewAddressPage as NewAddressPage};