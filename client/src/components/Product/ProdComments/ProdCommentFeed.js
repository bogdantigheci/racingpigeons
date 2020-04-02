import React from 'react';
import { Link } from 'react-router-dom';
import ProdCommentItem from './ProdCommentItem';

const ProdCommentFeed = props => {
  return props.comments && props.comments.length > 0 ? (
    props.comments.map((comment, i) => (
      <ProdCommentItem key={i} comment={comment} prodId={props.prodId} />
    ))
  ) : !props.auth ? (
    <div className="product_no_reviews">
      There are no reviews yet, to add one please
      <Link to="/register_login" style={{ fontSize: '1.2rem' }}>
        {' '}
        Log in
      </Link>
    </div>
  ) : null;
};

export default ProdCommentFeed;
