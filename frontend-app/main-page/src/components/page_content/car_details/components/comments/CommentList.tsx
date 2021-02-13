import React from 'react';
import CommentResponseDTO from '../../../../../model/CommentResponseDTO';
import { CommentItem } from './comment_item/CommentItem';

interface CommentListProps {
    comments: CommentResponseDTO[];
}

function renderCommentItem(comment: CommentResponseDTO) {
    return <CommentItem comment={comment} />;
}

export function CommentList(props: CommentListProps) {
    const comments = props.comments;
    return <section className="mb-5">{comments && comments.map(renderCommentItem)}</section>;
}
