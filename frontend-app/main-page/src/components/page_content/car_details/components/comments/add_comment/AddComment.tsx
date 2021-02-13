import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './AddComment.scss';

interface AddCommentProperties {
    loadComments: (carId: number) => void;
}

interface AddCommentState {
    starsCount: number;
    commentContent: string;
    commentError: boolean;
    errorMessage: string;
}

export class AddComment extends React.Component<AddCommentProperties, AddCommentState> {
    constructor(props: AddCommentProperties) {
        super(props);

        this.state = {
            starsCount: 0,
            commentContent: '',
            commentError: false,
            errorMessage: '',
        };
    }

    onStarClick = (nextValue: number, prevValue: number, name: string) => {
        this.setState({ starsCount: nextValue });
    };

    setComment = (commentContent: string) => {
        this.setState({ commentContent: commentContent });
    };

    handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    // createCommentItem = () => {
    //     const item = {};
    //
    //     item['vehicleId'] = this.props.carid;
    //     item['commentContent'] = this.state.commentContent;
    //     item['login'] = this.props.login;
    //     item['creationDate'] = this.getTimestamp();
    //     item['rating'] = this.state.starsNumber;
    //
    //     return item;
    // };
    //
    // createStarItem = () => {
    //     const item = {};
    //
    //     item['vehicleId'] = this.props.carid;
    //     item['stars'] = this.state.starsNumber;
    //
    //     return item;
    // };
    //
    // handleAddComment = (event) => {
    //     const commentContent = this.state.commentContent;
    //     const starsNumber = this.state.starsNumber;
    //     event.preventDefault();
    //
    //     if (commentContent == '') {
    //         this.setState({ commentError: true });
    //     } else {
    //         this.setState({ commentError: false });
    //     }
    //
    //     if (starsNumber <= 0) {
    //         this.setState({ starsError: true });
    //     } else {
    //         this.setState({ starsError: false });
    //     }
    //
    //     if (commentContent != '' && starsNumber > 0) {
    //         const commentItem = this.createCommentItem();
    //
    //         const starsItem = this.createStarItem();
    //
    //         const url1 = 'http://localhost:8080/CarRental/comments/' + this.props.carid;
    //         fetch(url1, {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(commentItem),
    //         })
    //             .then((response) => {
    //                 this.setState({ commentContent: '' });
    //                 this.props.loadCommentsForPage(0);
    //             })
    //             .catch((error) => {});
    //
    //         const url2 = 'http://localhost:8080/CarRental/stars/' + this.props.carid;
    //         fetch(url2, {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(starsItem),
    //         })
    //             .then((response) => {
    //                 this.setState({ starsNumber: 0 });
    //             })
    //             .catch((error) => {});
    //
    //         this.props.loadCommentsForPage(0);
    //     }
    //
    //     this.props.loadCommentsForPage(0);
    //
    //     event.preventDefault();
    // };
    //
    // handleInputChange = (event) => {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //
    //     this.setState({
    //         [name]: value,
    //     });
    // };

    render() {
        const { starsCount, commentError, errorMessage } = this.state;

        return (
            <div id="add-comment-container" className="card text-left">
                <div className="card-header">Leave a comment</div>
                <div className="card-body">
                    <form onSubmit={this.handleAddComment}>
                        <div className="car-rank mb-3 ml-q">
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={starsCount}
                                onStarClick={this.onStarClick}
                            />
                        </div>
                        {commentError && (
                            <div className="alert alert-danger" role="alert" key="alert_stars">
                                {errorMessage}
                            </div>
                        )}
                        <div className="form-group">
                            <textarea
                                id="commentContent"
                                name="commentContent"
                                className="form-control"
                                rows={5}
                                value={this.state.commentContent}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    this.setComment(event.target.value)
                                }
                                placeholder="Comment"
                                required
                            />
                        </div>
                        {commentError && (
                            <div className="alert alert-danger" role="alert" key="alert_comment">
                                {errorMessage}
                            </div>
                        )}
                        <input type="submit" value="Submit" className="btn btn-primary" name="leave-comment-button" />
                    </form>
                </div>
            </div>
        );
    }
}
