import React from 'react';
import { connect } from 'react-redux';
import { selectBreeds } from '../../selectors/product';
import Breed from './Breed';
import { withNamespaces } from 'react-i18next';

const Breeds = ({ breeds, t }) => {
  return (
    <div>
      <h5 className="page-title h1">{t('Breeds')}</h5>
      <Breed breeds={breeds} />
    </div>
  );
};

const mapStateToProps = (state) => ({ breeds: selectBreeds(state) });

export default withNamespaces()(connect(mapStateToProps)(Breeds));
