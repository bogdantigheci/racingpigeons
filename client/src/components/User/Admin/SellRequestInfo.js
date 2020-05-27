import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSellRequest, reviewSellRequest } from '../../../actions/product';
import _ from 'lodash';
import { withNamespaces } from 'react-i18next';
import UserLayout from '../../../hoc/UserLayout';
import moment from 'moment';

class SellRequestInfo extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSellRequest(id).then((response) => {
      if (!this.props.products.request) {
        this.props.history.push('/page_not_found');
      }
    });
  }

  handleRequest = (id) => {
    id = this.props.match.params.id;
    this.props.reviewSellRequest(id);
  };
  render() {
    const { t } = this.props;
    return (
      <UserLayout>
        {this.props.products && this.props.products.request ? (
          <div className="page-title">
            <h4>
              {t('Sell request from')} {this.props.products.request.breeder}
            </h4>
            <div>
              <img
                className="img-fluid rounded"
                src={_.get(
                  this.props.products.request,
                  'images[0].url',
                  `/images/image_not_available.png`
                )}
                alt="name"
              />
            </div>
            <div>
              <div>
                {t('Requested at')}:{' '}
                {moment(this.props.products.request.createdAt).format(
                  'DD-MM-YYYY'
                )}
              </div>
              <div>
                {t('Breed')}: {this.props.products.request.breed}
              </div>
              <div>
                {t('Ring ID')}: {this.props.products.request.ringId}
              </div>
              <div>
                {t('Price')}: {this.props.products.request.price}
              </div>
              <div>
                {t('Publish')}:{' '}
                {this.props.products.request.publish ? t('YES') : t('NO')}
              </div>
              <div>
                {t('Available')}:{' '}
                {this.props.products.request.available ? t('YES') : t('NO')}
              </div>
              <div>
                {t('Shipping')}:{' '}
                {this.props.products.request.shipping ? t('YES') : t('NO')}
              </div>
              <div>
                {t('Description')}: {this.props.products.request.description}
              </div>
            </div>
            <div>
              {!this.props.products.request.reviewed ? (
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
  getSellRequest: (id) => dispatch(getSellRequest(id)),
  reviewSellRequest: (id) => dispatch(reviewSellRequest(id)),
});
export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(SellRequestInfo)
);
