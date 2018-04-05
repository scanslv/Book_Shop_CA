import React from 'react'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'

export class Comments extends React.Component {
    render() {
        const {comments} = this.props;
        return (
            <div>
                <hr/>
                <label htmlFor="price">Comments</label>
                {displayComments(comments)}
                <hr/>
            </div>
        // displayComments(comments)
    )
    }
}

function displayComments(comments) {
    Moment.locale('en-GB');
    momentLocalizer();

    if (comments.length === 0) {
        return <div>No comments yet.</div>
    } else {
        return comments.map((comment) => (
                <div>
                    <div className={'text-right commentDate'}>
                        {Moment(comment.create_date).format('lll')}
                    </div>
                    <div className={'commentText'}>
                        {comment.content}
                    </div>
                </div>
            )
        );
    }
}