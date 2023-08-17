import React from 'react';
import userImage from '../../../../../..//images/user_images/user.png';
import StarRatingComponent from 'react-star-rating-component';
import date from 'date-and-time';
import './CommentItem.scss';
import { CommentWithRateResponseDTO } from '@car-rental/shared/model';
import { TranslationService } from '@car-rental/shared/service';

interface CommentItemProperties {
    comment: CommentWithRateResponseDTO;
}

export function CommentItem({ comment }: CommentItemProperties): JSX.Element {
    return (
        <article className="media border p-3 my-4 text-left comment-item">
            <img src={userImage} className="mr-3 mt-3 rounded-circle user-image" alt={'User image'} />
            <div className="media-body">
                <h4>
                    <small>
                        <i>
                            {TranslationService.translate('postedOn')}{' '}
                            {date.format(new Date(comment.creationDate), 'YYYY-MM-DD HH:mm:ss')}
                        </i>
                    </small>
                </h4>
                <div className="car-rank mb-2">
                    {<StarRatingComponent name="rate2" editing={false} starCount={5} value={comment.rate} />}
                </div>
                <p>{comment.content}</p>
            </div>
        </article>
    );
}
