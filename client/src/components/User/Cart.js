import React, { Component } from 'react';
import UserLayout from '../../hoc/UserLayout';
import ProductBlock from '../utils/productBlock';

import { connect } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import Paypal from '../utils/payPal';

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;

    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        this.props.getCartItems(cartItems, user.userData.cart).then(() => {
          if (this.props.user.cartDetail.length > 0) {
            this.calculateTotal(this.props.user.cartDetail);
          }
        });
      }
    }
  }

  calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    this.setState({
      total,
      showTotal: true
    });
  };

  removeFromCart = id => {
    this.props.removeCartItem(id).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items</div>
    </div>
  );

  transactionError = data => {
    console.log('Paypal error');
  };
  transactionCancel = data => {
    console.log('Transaction cancelled');
  };
  transactionSuccess = data => {
    this.props
      .onSuccessBuy({
        cartDetail: this.props.user.cartDetail,
        paymentData: data
      })
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true
          });
        }
      });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My cart</h1>
          <div className="user_cart">
            <ProductBlock
              products={this.props.user}
              type="cart"
              removeItem={id => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <div>
                <div className="user_cart_sum">
                  <div>Total amount: $ {this.state.total}</div>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              <div className="cart_success">
                <FontAwesomeIcon icon={faSmile} />
                <div>THANK YOU</div>
                <div>YOUR ORDER IS NOW COMPLETE</div>
              </div>
            ) : (
              this.showNoItemMessage()
            )}
          </div>

          <div
            className={
              !this.state.showTotal
                ? ' paypal_button_container payhidden'
                : 'paypal_button_container'
            }
          >
            <Paypal
              toPay={this.state.total}
              transactionError={data => this.transactionError(data)}
              transactionCancel={data => this.transactionCancel(data)}
              onSuccess={data => this.transactionSuccess(data)}
            />
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCartItems: (cartItems, userCart) =>
      dispatch(getCartItems(cartItems, userCart)),
    removeCartItem: id => dispatch(removeCartItem(id)),
    onSuccessBuy: data => dispatch(onSuccessBuy(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCart);
