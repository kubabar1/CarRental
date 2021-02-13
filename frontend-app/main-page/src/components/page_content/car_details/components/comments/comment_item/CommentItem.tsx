import React from 'react';
import CommentResponseDTO from '../../../../../../model/CommentResponseDTO';
import { userImagesMainPage } from '../../../../../../constants/PathsServer';
import StarRatingComponent from 'react-star-rating-component';
import { endpoints } from '../../../../../../constants/PathsAPI';
import date from 'date-and-time';
import './CommentItem.scss';

interface CommentItemProperties {
    comment: CommentResponseDTO;
}

interface CarItemState {
    stars: number | null;
}

export class CommentItem extends React.Component<CommentItemProperties, CarItemState> {
    constructor(props: CommentItemProperties) {
        super(props);
        this.state = {
            stars: null,
        };
    }

    componentDidMount(): void {
        fetch(endpoints.starsCountEndpoint(this.props.comment.vehicleId))
            .then((response: Response) => {
                response.json().then((starsCount: { stars: number }) => {
                    this.setState({ stars: starsCount.stars });
                });
            })
            .finally(() => {
                this.setState({
                    stars: 3.45, // TODO: REMOVE
                });
            });
    }

    render(): JSX.Element {
        const userLogin = this.props.comment.userLogin;
        const creationDate = this.props.comment.creationDate;
        const stars = this.state.stars;
        const commentContent = this.props.comment.commentContent;
        const userImagePath: string = userImagesMainPage('user.png');

        return (
            <article className="media border p-3 my-4 text-left comment-item">
                <img src={userImagePath} className="mr-3 mt-3 rounded-circle user-image" alt={'User image'} />
                <div className="media-body">
                    <h4>
                        {userLogin + ' '}
                        <small>
                            <i> Posted on {date.format(creationDate, 'YYYY-MM-DD HH:mm:ss')}</i>
                        </small>
                    </h4>
                    <div className="car-rank mb-2">
                        {stars && <StarRatingComponent name="rate2" editing={false} starCount={5} value={stars} />}
                    </div>
                    <p>{commentContent && commentContent}</p>
                </div>
            </article>
        );
    }
}
