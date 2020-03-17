import React, { Component } from 'react';
import MyButton from './button';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/user';
import _ from 'lodash';

class Card extends Component {
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_available.png';
    }
  }

  addToCartHandler = id => {
    const isInCart = _.find(
      _.map(this.props.user.userData.cart, item => item.id === id)
    );
    if (!isInCart) {
      this.props.addToCart(id);
    }
  };

  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`
          }}
        ></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.breed.name}</div>
            <div className="name">{props.name}</div>
            <div className="name">${props.price}</div>
          </div>

          {props.grid ? (
            <div className="description">
              <p>{props.description}</p>
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrapp">
              <MyButton
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product_detail/${props._id}`}
                addStyles={{
                  margin: '10px 0 0 0'
                }}
              />
            </div>
            <div className="button_wrapp">
              <MyButton
                type="bag_link"
                runAction={() => {
                  props.user.userData.isAuth
                    ? this.addToCartHandler(props._id)
                    : console.log('you need to log in');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: _id => dispatch(addToCart(_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
