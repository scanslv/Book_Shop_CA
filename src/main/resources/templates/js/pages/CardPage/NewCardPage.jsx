import React from 'react';
import {connect} from 'react-redux';
import {Navigation, Loader} from "../../_components/index";
import {cardActions} from '../../_actions/index'
import {history} from '../../_helpers/index';
import {Combobox} from 'react-widgets'

require('react-widgets/lib/scss/react-widgets.scss');

class NewCardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            id: this.props.match.params.id,
            cardType: 'Visa',
            number: '',
            expiryY: new Date().getFullYear(),
            expiryM: new Date().getMonth() + 1,
            cvv: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: (value ? value : null)});
    }

    save() {
        this.setState({submitted: true});
        const {id, cardType, number, expiryY, expiryM, cvv} = this.state;

        const card = {
            type: cardType,
            number: number,
            expiryY: expiryY,
            expiryM: expiryM,
            cvv: cvv
        };
        if (cardType && cardType.length > 0 &&
            number && number > 0 &&
            expiryY && expiryY > 0 &&
            expiryM && expiryM > 0 &&
            cvv && cvv > 0) {
            this.setState({editing: false});
            this.props.dispatch(cardActions.create(id, card));
        }
    }

    render() {
        const {creatingCard} = this.props;
        const {submitted, cardType, number, expiryY, expiryM, cvv, id} = this.state;
        return (
            <div>
                <Navigation/>
                {creatingCard ? (
                    <Loader/>
                ) : (
                    <div className="col-md-8 col-md-offset-2">

                        <div className={'form-group'}>
                            <label htmlFor="gender">Type</label>
                            <Combobox
                                name="cardType"
                                defaultValue={cardType}
                                value={cardType}
                                data={['American Express', 'Visa', 'Mastercard']}
                                onChange={value => this.setState({cardType: value})}
                            />
                        </div>

                        <div className={'form-group' + (submitted && !number ? ' has-error' : '')}>
                            <label htmlFor="number">Card Number</label>
                            <input type="text" className="form-control" name="number"
                                   value={number}
                                   onChange={this.handleChange}/>
                            {submitted && !number &&
                            <div className="help-block">Card Number is required</div>
                            }
                        </div>

                        <div className={'form-group'}>
                            <label htmlFor="e">Expiry Date</label>
                            <div className={'form-group col-md-12'}>
                                <div className="col-md-6">
                                    <Combobox
                                        name="expiryM"
                                        defaultValue={expiryM}
                                        value={expiryM}
                                        data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
                                        onChange={value => this.setState({expiryM: value})}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Combobox
                                        name="expiryY"
                                        defaultValue={expiryY}
                                        value={expiryY}
                                        data={['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']}
                                        onChange={value => this.setState({expiryY: value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={'form-group' + (submitted && !cvv ? ' has-error' : '')}>
                            <label htmlFor="cvv">CVV Number</label>
                            <input type="text" className="form-control" name="cvv"
                                   value={cvv}
                                   onChange={this.handleChange}/>
                            {submitted && !cvv &&
                            <div className="help-block">CVV Number is required</div>
                            }
                        </div>
                        <hr/>

                        <button className={'btn btn-primary btn-block'}
                                onClick={this.save}>Save
                        </button>

                        <button className={'btn btn-danger btn-block'}
                                onClick={() => {
                                    if (localStorage.getItem('url') === 'basket') {
                                        localStorage.removeItem('url');
                                        history.push('/checkout');
                                    } else
                                        history.push('/users/' + id)
                                }}>Cancel
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

const connectedNewCardPage = connect(mapStateToProps)(NewCardPage);
export {connectedNewCardPage as NewCardPage};