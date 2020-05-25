import React from 'react';
import CardBlockShop from '../utils/cardBlockShop';
import { withNamespaces } from 'react-i18next';

const LoadmoreCards = (props) => {
  const { t } = props;
  return (
    <div>
      <div>
        <CardBlockShop grid={props.grid} list={props.products} />
      </div>
      {props.size > 0 && props.size >= props.limit ? (
        <div className="load_more_container">
          <span onClick={() => props.loadMore()}>{t('Load More')}</span>
        </div>
      ) : null}
    </div>
  );
};

export default withNamespaces()(LoadmoreCards);
