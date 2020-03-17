import React from 'react';
import CommentItem from './CommentItem';

const CommentFeed = props => {
  return props.comments
    ? props.comments.map(comment => (
        <CommentItem
          key={comment._id}
          comment={comment}
          postId={props.postId}
        />
      ))
    : null;
};

export default CommentFeed;
