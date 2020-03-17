import React from 'react';
import ProdCommentItem from './ProdCommentItem';

const ProdCommentFeed = props => {
//  console.log('commmeeeeeents', props.comments);
  return props.comments
    ? props.comments.map((comment, i) => (
        <ProdCommentItem key={i} comment={comment} prodId={props.prodId} />
      ))
    : null;
};

export default ProdCommentFeed;
