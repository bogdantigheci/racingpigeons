import React from 'react';
import ProdCommentItem from './ProdCommentItem';

const ProdCommentFeed = props => {
  return props.comments && props.comments.length > 0 ? (
    props.comments.map((comment, i) => (
      <ProdCommentItem key={i} comment={comment} prodId={props.prodId} />
    ))
  ) : (
    <div className="product_no_reviews">
      There are no reviews yet, log in to add one!
    </div>
  );
};

export default ProdCommentFeed;
