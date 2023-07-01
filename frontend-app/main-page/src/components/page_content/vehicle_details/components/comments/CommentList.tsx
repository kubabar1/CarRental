import React from 'react';
import { CommentItem } from './comment_item/CommentItem';
import { CommentWithRateResponseDTO } from '@car-rental/shared/model';

interface CommentListProps {
    comments: CommentWithRateResponseDTO[];
}

function renderCommentItem(comment: CommentWithRateResponseDTO): JSX.Element {
    return <CommentItem comment={comment} key={comment.id} />;
}

export function CommentList(props: CommentListProps): JSX.Element {
    const comments = props.comments;
    return <section className="mb-5">{comments && comments.map(renderCommentItem)}</section>;
}
