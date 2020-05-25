import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeders } from '../../actions/product';
import Breeder from './Breeder';
import _ from 'lodash';
import { withNamespaces } from 'react-i18next';

class Breeders extends Component {
  componentDidMount() {
    this.props.getBreeders();
  }

  handlePlacements = (placements) => {
    placements = placements.split(',');
    return placements;
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <h5 className="page-title h1">{t('Breeders')}</h5>
        <Breeder breeders={_.get(this.props.products, 'breeders', [])} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.product });

const mapDispatchToProps = (dispatch) => ({
  getBreeders: () => dispatch(getBreeders()),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(Breeders)
);
