import React from 'react';
import CommentResponseDTO from '../../../../../model/CommentResponseDTO';
import { CommentItem } from './comment_item/CommentItem';

interface CommentListProps {
    comments: CommentResponseDTO[];
}

function renderCommentItem(comment: CommentResponseDTO): JSX.Element {
    return <CommentItem comment={comment} />;
}

export function CommentList(props: CommentListProps): JSX.Element {
    const comments = props.comments;
    return <section className="mb-5">{comments && comments.map(renderCommentItem)}</section>;
}
