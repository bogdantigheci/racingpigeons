import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getSellRequest,
  approveSellRequest,
  declineSellRequest,
} from '../../../actions/product';
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

  handleApproveRequest = (id) => {
    id = this.props.match.params.id;
    this.props.approveSellRequest(id);
  };
  handleDeclineRequest = (id) => {
    id = this.props.match.params.id;
    this.props.declineSellRequest(id);
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
            {this.props.user.userData.isAdmin ? (
              <div>
                {this.props.products.request.reviewed === 'In review' ? (
                  <div>
                    <button
                      className="review_button mr-3 p-2"
                      onClick={() => this.handleApproveRequest()}
                    >
                      {t('Approve')}
                    </button>
                    <button
                      className="review_button p-2"
                      onClick={() => this.handleDeclineRequest()}
                    >
                      {t('Decline')}
                    </button>
                  </div>
                ) : (
                  <div className="revised">
                    {t('This sell request has been')}{' '}
                    {t(this.props.products.request.reviewed)}!
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  products: state.product,
});
const mapDispatchToProps = (dispatch) => ({
  getSellRequest: (id) => dispatch(getSellRequest(id)),
  approveSellRequest: (id) => dispatch(approveSellRequest(id)),
  declineSellRequest: (id) => dispatch(declineSellRequest(id)),
});
export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(SellRequestInfo)
);
