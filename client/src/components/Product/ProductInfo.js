import React from 'react';
import MyButton from '../utils/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import ProdComments from './ProdComments/ProdComments';

const ProductInfo = props => {
  //console.log('Prodinfo coomments', props.comments);
  const showProdTags = detail => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free Shipping</div>
            <div>And Return</div>
          </div>
        </div>
      ) : null}
      {detail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="tag_text">
            <div>Available</div>
            <div>In Shop</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="tag_text">
            <div>Not Available</div>
            <div>Preorder Only</div>
          </div>
        </div>
      )}
    </div>
  );

  const showProdActions = detail => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
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

  const showProdSpecifications = detail => (
    <div className="product_specifications">
      <h2>Specifics</h2>
      <div>
        <div className="item">
          <strong>Breed:</strong> {detail.breed.name}
        </div>
        <div className="item">
          <strong>Breeder:</strong> {detail.breeder.name}
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
      {/* <ProdComments comments={props.comments} prodId={props.detail._id} /> */}
    </div>
  );
};

export default ProductInfo;
