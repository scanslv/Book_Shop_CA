import React from 'react';
import {connect} from 'react-redux';
import {Navigation, Loader, MonthBox} from "../../_components/index";
import {allUsersActions, cardActions} from "../../_actions";
import {Combobox} from 'react-widgets'

require('react-widgets/lib/scss/react-widgets.scss');

class CardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            editing: false,
            id: this.props.match.params.id,
            cardType: 'Visa',
            number: '',
            expiryY: new Date().getFullYear(),
            expiryM: new Date().getMonth() + 1,
            cvv: '',
        };

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

// this will be called when it receive props
    componentWillReceiveProps(nextProps) {
        // you can also check props with current version
        // and set conditions to update state or not
        if (nextProps.user && nextProps.user.card) {
            this.setState({cardType: nextProps.user.card.type});
            this.setState({number: nextProps.user.card.number});
            this.setState({expiryY: nextProps.user.card.expiryY});
            this.setState({expiryM: nextProps.user.card.expiryM});
            this.setState({cvv: nextProps.user.card.cvv});
        }
    }

    edit() {
        if (this.state.editing) {
            this.setState({editing: false});
            this.setState({submitted: false});
            this.setState({cardType: this.props.user.card.type});
            this.setState({number: this.props.user.card.number});
            this.setState({expiryY: this.props.user.card.expiryY});
            this.setState({expiryM: this.props.user.card.expiryM});
            this.setState({cvv: this.props.user.card.cvv});
        }
        else
            this.setState({editing: true});
    }

    save() {
        this.setState({submitted: true});
        const {id, cardType, number, expiryY, expiryM, cvv} = this.state;

        const card = {
            id: this.props.user.card.id,
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
            this.props.dispatch(cardActions.update(id, card));
        }
    }

    _delete() {
        this.setState({submitted: true});
        const {id} = this.state;
        this.props.dispatch(cardActions._delete(id));
        this.setState({editing: false});
    }

    render() {
        const {user, gettingUser, loggedUser} = this.props;
        const {submitted, editing, cardType, number, expiryY, expiryM, cvv} = this.state;

        return (
            <div>
                <Navigation/>
                {gettingUser ? (
                    <Loader/>
                ) : (
                    !user || !user.card ? (
                        <div>Nothing to show</div>
                    ) : (
                        <div className="col-md-8 col-md-offset-2">
                            {loggedUser.role === 'ROLE_ADMIN' &&
                            <div className={'form-group'}>
                                <label htmlFor="id">ID</label>
                                <input type="text" className="form-control" value={user.card.id} disabled/>
                            </div>
                            }

                            <div className={'form-group'}>
                                <label htmlFor="gender">Type</label>
                                <Combobox
                                    name="cardType"
                                    disabled={!editing}
                                    defaultValue={editing ? cardType : user.card.type}
                                    value={editing ? cardType : user.card.type}
                                    data={['American Express', 'Visa', 'Mastercard']}
                                    onChange={value => this.setState({cardType: value})}
                                />
                            </div>

                            <div className={'form-group' + (submitted && !number ? ' has-error' : '')}>
                                <label htmlFor="number">Card Number</label>
                                <input type="text" className="form-control" name="number"
                                       value={editing ? number : user.card.number}
                                       onChange={this.handleChange}
                                       disabled={!editing}/>
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
                                            disabled={!editing}
                                            defaultValue={editing ? expiryM : user.card.expiryM}
                                            value={editing ? expiryM : user.card.expiryM}
                                            data={['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                                            onChange={value => this.setState({expiryM: value})}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Combobox
                                            name="expiryY"
                                            disabled={!editing}
                                            defaultValue={editing ? expiryY : user.card.expiryY}
                                            value={editing ? expiryY : user.card.expiryY}
                                            data={['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025' ]}
                                            onChange={value => this.setState({expiryY: value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={'form-group' + (submitted && !cvv ? ' has-error' : '')}>
                                <label htmlFor="cvv">CVV Number</label>
                                <input type="text" className="form-control" name="cvv"
                                       value={editing ? cvv : user.card.cvv}
                                       onChange={this.handleChange}
                                       disabled={!editing}/>
                                {submitted && !cvv &&
                                <div className="help-block">CVV Number is required</div>
                                }
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

const connectedCardPage = connect(mapStateToProps)(CardPage);
export {connectedCardPage as CardPage};