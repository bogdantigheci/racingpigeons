import React from 'react';
import ProdCommentItem from './ProdCommentItem';

const ProdCommentFeed = props => {
  return props.comments
    ? props.comments.map((comment, i) => (
        <ProdCommentItem key={i} comment={comment} prodId={props.prodId} />
      ))
    : null;
};

export default ProdCommentFeed;
