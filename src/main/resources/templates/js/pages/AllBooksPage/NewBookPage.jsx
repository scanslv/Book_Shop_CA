import React from 'react';
import {connect} from 'react-redux';
import {Navigation, Loader} from "../../_components/index";
import {bookActions} from '../../_actions/index'
import {Combobox} from 'react-widgets'
import {bookConstants} from '../../_constants'
import {history} from '../../_helpers/index';

require('react-widgets/lib/scss/react-widgets.scss');

class NewBookPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            image: "",
            title: "",
            author: "",
            category: bookConstants.BOOK_CATEGORIES[0],
            price: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.save = this.save.bind(this);
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

    save() {
        this.setState({submitted: true});
        const {image, title, author, category, price} = this.state;
        const book = {
            image: image,
            title: title,
            author: author,
            category: category,
            price: price
        };
        if (title && title.length > 0 && author && author.length > 0 && category.length > 0 && price && !isNaN(price) && price > 0) {
            this.props.dispatch(bookActions.create(book));
        }
    }

    render() {
        const {creatingBook} = this.props;
        const {submitted, image, title, author, category, price} = this.state;
        return (
            <div>
                <Navigation/>
                {creatingBook ? (
                    <Loader/>
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

                        <input id={'chooser'} className={'hidden'} type="file" name='image' onChange={this.handleChange} />

                        <div className={'text-center'}>
                            <button name="image"
                                    className={'btn btn-warning'}
                                    onClick={() => document.getElementById('chooser').click()}>Change
                            </button>
                            <button className={'btn btn-danger' + (image ? '' : ' hidden')}
                                    onClick={this.deleteImage}>Delete
                            </button>
                        </div>


                        {/*<div className={'form-group'}>*/}
                            {/*<label htmlFor="image">Image</label>*/}
                            {/*<input type="text" className="form-control" name="image"*/}
                                   {/*value={image}*/}
                                   {/*onChange={this.handleChange}/>*/}
                        {/*</div>*/}

                        <div className={'form-group' + (submitted && !title ? ' has-error' : '')}>
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" name="title"
                                   value={title}
                                   onChange={this.handleChange}/>
                            {submitted && !title &&
                            <div className="help-block">Title is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !author ? ' has-error' : '')}>
                            <label htmlFor="author">Author</label>
                            <input type="text" className="form-control" name="author"
                                   value={author}
                                   onChange={this.handleChange}/>
                            {submitted && !author &&
                            <div className="help-block">Author is required</div>
                            }
                        </div>

                        <div className={'form-group'}>
                            <label htmlFor="category">Category</label>
                            <Combobox
                                name="category"
                                defaultValue={category}
                                value={category}
                                data={bookConstants.BOOK_CATEGORIES}
                                onChange={value => this.setState({category: value})}
                            />
                        </div>

                        <div className={'form-group' + (submitted && (!price || isNaN(price) || price < 0) ? ' has-error' : '')}>
                            <label htmlFor="price">Price</label>
                            <input type="text" className="form-control" name="price"
                                   value={price}
                                   onChange={this.handleChange}/>
                            {submitted && !price &&
                            <div className="help-block">Price is required</div>
                            }
                            {submitted && (isNaN(price) || price < 0) &&
                            <div className="help-block">Enter valid price</div>
                            }
                        </div>

                        <hr/>

                        <button className={'btn btn-primary btn-block'}
                                onClick={this.save}>Save
                        </button>

                        <button className={'btn btn-danger btn-block'}
                                onClick={() => history.push('/')}>Cancel
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {creatingBook} = state.book;
    return {
        creatingBook
    };
}

const connectedNewBookPage = connect(mapStateToProps)(NewBookPage);
export {connectedNewBookPage as NewBookPage};