import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRace } from '../../actions/product';
import _ from 'lodash';
import { withNamespaces } from 'react-i18next';

class RaceInfo extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRace(id).then((response) => {
      if (!this.props.products.race) {
        this.props.history.push('/page_not_found');
      }
    });
  }
  render() {
    const { t } = this.props;
    return (
      <div>
        <div>
          <div className="page-title">
            <h1>{_.get(this.props.products.race, 'name', '')}</h1>
          </div>
        </div>
        {this.props.products && this.props.products.race ? (
          <div className="container d-flex flex-wrap">
            <div className="d-flex flex-wrap breeder_info_container">
              <div className="breeder_info_image_container">
                <img
                  className="img-fluid rounded float-left breeder_info_image"
                  src={_.get(
                    this.props.products.race,
                    'images[0].url',
                    `/images/image_not_available.png`
                  )}
                  alt="name"
                />
              </div>
              <div
                className={
                  window.innerWidth > 768
                    ? 'race_placements'
                    : 'container race_placements'
                }
              >
                <h5 className="placements-title">{t('Contestants')}</h5>
                <div className="container placements_detail">
                  {_.get(this.props.products.race, 'contestants', '').map(
                    (contestants, i) => (
                      <div key={i}>{contestants}</div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="container">
              <h5 className="bio_title">{t('Race details')}</h5>
              <div className="bio container">
                {_.get(this.props.products.race, 'details', '')}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.product });
const mapDispatchToProps = (dispatch) => ({
  getRace: (id) => dispatch(getRace(id)),
});
export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(RaceInfo)
);
