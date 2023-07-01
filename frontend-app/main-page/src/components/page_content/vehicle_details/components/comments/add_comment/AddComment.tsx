import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './AddComment.scss';
import { RatingService } from '@car-rental/shared/service';
import {
    CommentWithRateAddDTO,
    CommentWithRateResponseDTO,
    AuthenticatedUserDTO,
    ResponseData,
} from '@car-rental/shared/model';

interface AddCommentProperties {
    setComments: (comments: CommentWithRateResponseDTO[]) => void;
    comments: CommentWithRateResponseDTO[];
    vehicleId: string;
    authenticatedUser: AuthenticatedUserDTO | undefined;
}

export function AddComment({ vehicleId, comments, setComments }: AddCommentProperties): JSX.Element {
    const [starsCount, setStarsCount] = useState<number>(0);
    const [commentContent, setCommentContent] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const MAX_COMMENT_LENGTH = 10000;
    const STARS_COUNT = 5;

    const onStarClick = (nextValue: number): void => {
        setStarsCount(nextValue);
    };

    const setComment = (commentContent: string): void => {
        setCommentContent(commentContent);
    };

    const handleAddComment = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const isOk = validateEmail();
        //todo add  && currentUser != undefined
        console.log(errorMessage.length);
        if (isOk) {
            const userId = '2';
            RatingService.addComment(new CommentWithRateAddDTO(starsCount, commentContent, vehicleId, userId)).then(
                (newComment: ResponseData<CommentWithRateResponseDTO>) => {
                    setComments([newComment.responseBody, ...comments]);
                    setCommentContent('');
                    setStarsCount(0);
                }
            );
        }
    };

    const validateEmail = (): boolean => {
        let isOk = false;
        if (commentContent.length == 0) {
            setErrorMessage('Empty comment content');
        } else if (commentContent.length > MAX_COMMENT_LENGTH) {
            setErrorMessage('Comment too long');
        } else if (starsCount == 0) {
            setErrorMessage('Stars count not set');
        } else if (starsCount > STARS_COUNT) {
            setErrorMessage('Incorrect starts count');
            // } else if (currentUser == undefined) {
            //     setErrorMessage('Unauthenticated user');
        } else {
            setErrorMessage('');
            isOk = true;
        }
        return isOk;
    };

    return (
        <div id="add-comment-container" className="card text-left">
            <div className="card-header">Leave a comment</div>
            <div className="card-body">
                <form onSubmit={handleAddComment}>
                    <div className="car-rank mb-3 ml-q">
                        <StarRatingComponent
                            name="rate1"
                            starCount={STARS_COUNT}
                            value={starsCount}
                            onStarClick={onStarClick}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            id="commentContent"
                            name="commentContent"
                            className="form-control"
                            rows={5}
                            value={commentContent}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value)}
                            placeholder="Comment"
                            required
                            maxLength={MAX_COMMENT_LENGTH}
                        />
                    </div>
                    {errorMessage.length > 0 && (
                        <div className="alert alert-danger" role="alert" key="alert_comment">
                            {errorMessage}
                        </div>
                    )}
                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary leave-comment-button"
                        name="leave-comment-button"
                    />
                </form>
            </div>
        </div>
    );
}
