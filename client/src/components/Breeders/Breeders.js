import React from 'react';
import { connect } from 'react-redux';
import { selectBreeders } from '../../selectors/product';
import Breeder from './Breeder';
import { withNamespaces } from 'react-i18next';

const Breeders = ({ breeders, t }) => {
  return (
    <div>
      <h5 className="page-title h1">{t('Breeders')}</h5>
      <Breeder breeders={breeders} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  breeders: selectBreeders(state),
});

export default withNamespaces()(connect(mapStateToProps)(Breeders));
