import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPayment, reviewPayment } from '../../../actions/product';
import { withNamespaces } from 'react-i18next';
import UserLayout from '../../../hoc/UserLayout';

class SellRequestInfo extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPayment(id).then((response) => {
      if (!this.props.products.payment) {
        this.props.history.push('/page_not_found');
      }
    });
  }

  handleRequest = (id) => {
    id = this.props.match.params.id;
    this.props.reviewPayment(id);
  };
  render() {
    const { t } = this.props;
    return (
      <UserLayout>
        {this.props.products &&
        this.props.products.payment &&
        this.props.products.payment ? (
          <div className="page-title">
            <h4>
              {t('Order number')}:{' '}
              {this.props.products.payment.product[0].porder}
            </h4>
            <div>
              {t('Buyer')}: {this.props.products.payment.user[0].name}{' '}
              {this.props.products.payment.user[0].name}
            </div>
            <div>
              {t('Email')}: {this.props.products.payment.user[0].email}
            </div>
            <div>
              {t('Address')}:{' '}
              {this.props.products.payment.data[0].address.line1},{' '}
              {this.props.products.payment.data[0].address.city},{' '}
              {this.props.products.payment.data[0].address.state},{' '}
              {this.props.products.payment.data[0].address.postal_code},{' '}
              {this.props.products.payment.data[0].address.country_code}
            </div>
            <div>
              {t('Pigeons')}:{' '}
              {this.props.products.payment.product.map((pigeon, i) => (
                <div className="paid_pigeons">
                  {t('Breed')}: {pigeon.breed}, {t('Ring ID')}: {pigeon.ringId},{' '}
                  {t('Price')}: {pigeon.price}, {t('Payment ID')}:{' '}
                  {pigeon.paymentId}{' '}
                </div>
              ))}
            </div>
            <div>
              {!this.props.products.payment.reviewed ? (
                <button
                  className="review_button"
                  onClick={() => this.handleRequest()}
                >
                  {t('Review')}
                </button>
              ) : (
                <div className="revised">
                  {t('This sell request has already been reviewed!')}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.product });
const mapDispatchToProps = (dispatch) => ({
  getPayment: (id) => dispatch(getPayment(id)),
  reviewPayment: (id) => dispatch(reviewPayment(id)),
});
export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(SellRequestInfo)
);
