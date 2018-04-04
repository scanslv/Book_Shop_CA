import React from 'react';
import {connect} from 'react-redux';
import {Navigation, Loader} from "../../_components/index";
import {bookActions} from '../../_actions/index'
import {DateTimePicker, SelectList, Combobox} from 'react-widgets'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import {bookConstants} from '../../_constants'

require('react-widgets/lib/scss/react-widgets.scss');

class ShowBookPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            editing: false,
            id: this.props.match.params.id,
            image: "",
            title: "",
            author: "",
            category: "",
            price: ""
        };

        Moment.locale('en-GB');
        momentLocalizer();

        const id = this.state.id;
        const {dispatch} = this.props;
        dispatch(bookActions.getBook(id));

        this.handleChange = this.handleChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this._delete = this._delete.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        if (name === 'image')
            this.setState({[name]: (value ? '/main/resources/static/images/' + e.target.files[0].name : null)});
        else
            this.setState({[name]: (value ? value : null)});
    }

    deleteImage(e) {
        this.setState({['image']: null});
        document.getElementById('chooser').value = '';
    }

// this will be called when it receive props
    componentWillReceiveProps(nextProps) {
        // you can also check props with current version
        // and set conditions to update state or not
        if (nextProps.book) {
            this.setState({image: nextProps.book.image});
            this.setState({title: nextProps.book.title});
            this.setState({author: nextProps.book.author});
            this.setState({category: nextProps.book.category});
            this.setState({price: nextProps.book.price});
        }
    }

    edit() {
        if (this.state.editing) {
            this.setState({editing: false});
            this.setState({image: this.props.book.image});
            this.setState({title: this.props.book.title});
            this.setState({author: this.props.book.author});
            this.setState({category: this.props.book.category});
            this.setState({price: this.props.book.price});
        }
        else
            this.setState({editing: true});
    }

    save() {
        this.setState({submitted: true});
        const {id, image, title, author, category, price} = this.state;
        const book = {
            id: id,
            image: image,
            title: title,
            author: author,
            category: category,
            price: price
        };

        if (title && title.length > 0 && author && author.length > 0 && category.length > 0 && price && !isNaN(price) && price > 0) {
            this.props.dispatch(bookActions.update(book));
            this.setState({editing: false});
        }
    }

    _delete() {
        this.setState({submitted: true});
        const {id} = this.state;
        this.props.dispatch(bookActions._delete(id));
        this.setState({editing: false});
    }

    render() {
        const {book, gettingBook, creatingBook, updatingBook, deletingBook, loggedUser} = this.props;
        const {submitted, editing, image, title, author, category, price} = this.state;
        return (
            <div>
                <Navigation/>
                {gettingBook || creatingBook || updatingBook || deletingBook ? (
                    <Loader/>
                ) : (
                    !book ? (
                        <div>Nothing to show</div>
                    ) : (
                        <div className="col-md-8 col-md-offset-2">

                            <label htmlFor="profile_image">Cover</label>
                            <div className={'text-center'}>
                                {image ?
                                    <a href={image} target="_blank">
                                        <img className={'image'} src={image}/>
                                    </a> :
                                    <a href={'/main/resources/static/images/default.jpeg'} target="_blank">
                                        <img className={'image'} src={'/main/resources/static/images/default.jpeg'}/>
                                    </a>
                                }
                            </div>

                            <input id={'chooser'} className={'hidden'} type="file" name='image'
                                   onChange={this.handleChange}/>

                            <div className={'text-center'}>
                                <button name="image"
                                        className={'btn btn-warning' + ((editing) ? '' : ' hidden')}
                                        onClick={() => document.getElementById('chooser').click()}>Change
                                </button>
                                <button className={'btn btn-danger' + ((editing && image) ? '' : ' hidden')}
                                        onClick={this.deleteImage}>Delete
                                </button>
                            </div>

                            {loggedUser.role === 'ROLE_ADMIN' &&
                            <div className={'form-group'}>
                                <label htmlFor="id">ID</label>
                                <input type="text" className="form-control" value={book.id} disabled/>
                            </div>
                            }

                            <div className={'form-group' + (submitted && !title ? ' has-error' : '')}>
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" name="title"
                                       value={editing ? title : book.title}
                                       onChange={this.handleChange} disabled={!editing}/>
                                {submitted && !title &&
                                <div className="help-block">Title is required</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && !author ? ' has-error' : '')}>
                                <label htmlFor="author">Author</label>
                                <input type="text" className="form-control" name="author"
                                       value={editing ? author : book.author}
                                       onChange={this.handleChange} disabled={!editing}/>
                                {submitted && !author &&
                                <div className="help-block">Author is required</div>
                                }
                            </div>

                            <div className={'form-group'}>
                                <label htmlFor="category">Category</label>
                                <Combobox
                                    name="category"
                                    disabled={!editing}
                                    defaultValue={editing ? category : book.category}
                                    value={editing ? category : book.category}
                                    data={bookConstants.BOOK_CATEGORIES}
                                    onChange={value => this.setState({category: value})}
                                />
                            </div>

                            <div
                                className={'form-group' + (submitted && (!price || isNaN(price) || price < 0) ? ' has-error' : '')}>
                                <label htmlFor="price">Price</label>
                                <input type="text" className="form-control" name="price"
                                       value={editing ? price : (book.price).toFixed(2) + ' EUR'}
                                       onChange={this.handleChange} disabled={!editing}/>
                                {submitted && !price &&
                                <div className="help-block">Price is required</div>
                                }
                                {submitted && (isNaN(price) || price < 0) &&
                                <div className="help-block">Enter valid price</div>
                                }
                            </div>

                            <hr/>
                            {loggedUser.role === 'ROLE_ADMIN' && (
                                <div>
                                    <button className="btn btn-primary btn-block"
                                            onClick={this.edit}>{editing ? 'Cancel' : 'Edit'}</button>

                                    <button className={'btn btn-primary btn-block' + (editing ? '' : ' hidden')}
                                            onClick={this.save}>Save
                                    </button>

                                    <button className={'btn btn-danger btn-block' + (!editing ? '' : ' hidden')}
                                            onClick={this._delete}>Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {book, gettingBook, creatingBook, updatingBook, deletingBook} = state.book;
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    return {
        book, gettingBook, creatingBook, updatingBook, deletingBook, loggedUser
    };
}

const connectedShowBookPage = connect(mapStateToProps)(ShowBookPage);
export {connectedShowBookPage as ShowBookPage};