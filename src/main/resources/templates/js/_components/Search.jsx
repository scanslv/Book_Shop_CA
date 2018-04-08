import React from 'react'
import {connect} from 'react-redux';
import {searchActions, bookActions} from "../_actions";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: (value ? value : null)});
        const {dispatch} = this.props;
        const query = value;
        if (query)
            dispatch(searchActions.search(query));
        else
            dispatch(bookActions.getAll());
    }

    clear(e) {
        document.getElementById('search').value = '';
        this.setState({search:''});
        const {dispatch} = this.props;
        dispatch(bookActions.getAll());
    }

    render() {
        const {search} = this.state;
        return (
            <div className={'search'}>
                <input id={'search'} type={'text'} name={'search'} value={search} onChange={this.handleChange}
                       placeholder={'Search....'}/>
                {search &&
                <button id={'searchButton'} name={'search'} value={''} type="button" className="btn btn-default"
                        onClick={this.clear}>
                    <span className="glyphicon glyphicon-remove-circle"/>
                </button>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user, loggedIn} = state.authentication;
    return {
        user,
        loggedIn
    };
}

const connectedSearch = connect(mapStateToProps)(Search);
export {connectedSearch as Search};