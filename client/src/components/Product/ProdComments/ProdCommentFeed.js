import React from 'react';
import { Link } from 'react-router-dom';
import ProdCommentItem from './ProdCommentItem';
import { withNamespaces } from 'react-i18next';

const ProdCommentFeed = (props) => {
  const { t } = props;
  return props.comments && props.comments.length > 0 ? (
    props.comments.map((comment, i) => (
      <ProdCommentItem key={i} comment={comment} prodId={props.prodId} />
    ))
  ) : !props.auth ? (
    <div className="product_no_reviews">
      {t('There are no comments yet, to add one please')}
      <Link to="/register_login" style={{ fontSize: '1.2rem' }}>
        {' '}
        {t('Log in!')}
      </Link>
    </div>
  ) : null;
};

export default withNamespaces()(ProdCommentFeed);
