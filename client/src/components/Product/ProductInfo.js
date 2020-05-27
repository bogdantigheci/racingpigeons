import React from 'react';
import MyButton from '../utils/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { withNamespaces } from 'react-i18next';

const ProductInfo = (props) => {
  const { t } = props;
  const showProdTags = (detail) => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>{t('Free Shipping')}</div>
            <div>{t('And Return')}</div>
          </div>
        </div>
      ) : null}
      {detail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="tag_text">
            <div>{t('Available')}</div>
            <div>{t('In Shop')}</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="tag_text">
            <div>{t('Not Available')}</div>
            <div>{t('Preorder Only')}</div>
          </div>
        </div>
      )}
    </div>
  );

  const showProdActions = (detail) => (
    <div className="product_actions">
      <div className="price">€ {detail.price}</div>
      <div className="price">
        {(detail.price * props.rateRON).toFixed(2)} Lei
      </div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => {
            props.addToCart(detail._id);
          }}
        />
      </div>
    </div>
  );

  const showProdSpecifications = (detail) => (
    <div className="product_specifications">
      <h2>{t('Specifics')}</h2>
      <div>
        <div className="item">
          <strong>{t('Breed')}:</strong> {detail.breed.name}
        </div>
        <div className="item">
          <strong>{t('Breeder')}:</strong> {detail.breeder.name}
        </div>
      </div>
    </div>
  );

  const detail = props.detail;

  return (
    <div>
      <h1>
        {detail.breed.name} {detail.name}
        <p>{detail.description}</p>
        {showProdTags(detail)}
        {showProdActions(detail)}
        {showProdSpecifications(detail)}
      </h1>
    </div>
  );
};

export default withNamespaces()(ProductInfo);
