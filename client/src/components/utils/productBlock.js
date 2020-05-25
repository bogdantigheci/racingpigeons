import React from 'react';
import { withNamespaces } from 'react-i18next';

const ProductBlock = ({ products, removeItem, t }) => {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_available.png';
    }
  };

  const renderItems = () =>
    products.cartDetail
      ? products.cartDetail.map((product) => (
          <div className="user_product_block" key={product._id}>
            <div className="item">
              <img
                className="image"
                src={`${renderCartImage(product.images)}`}
                alt="product"
              />
            </div>
            <div className="item">
              <h4>{t('Pigeon details')}</h4>
              <div>
                {t('Breed')}: {product.breed.name}
                <div>
                  {t('Breeder')}: {product.breeder.name}
                </div>
              </div>
            </div>
            <div className="item">
              <h4>{t('Quantity')}</h4>
              <div>{product.quantity}</div>
            </div>
            <div className="item">
              <h4>{t('Price')}</h4>
              <div>€ {product.price}</div>
            </div>
            <div className="item btn">
              <div
                className="cart_remove_btn"
                onClick={() => removeItem(product._id)}
              >
                X
              </div>
            </div>
          </div>
        ))
      : null;

  return <div>{renderItems()}</div>;
};

export default withNamespaces()(ProductBlock);
