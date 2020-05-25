import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreeds } from '../../actions/product';
import Breed from './Breed';
import _ from 'lodash';
import { withNamespaces } from 'react-i18next';

class Breeds extends Component {
  componentDidMount() {
    this.props.getBreeds();
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <h5 className="page-title h1">{t('Breeds')}</h5>
        <Breed breeds={_.get(this.props.products, 'breeds', [])} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.product });

const mapDispatchToProps = (dispatch) => ({
  getBreeds: () => dispatch(getBreeds()),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(Breeds)
);
