import React from 'react';
import Card from './card';
import { withNamespaces } from 'react-i18next';

const CardBlockShop = (props) => {
  const { t } = props;
  const renderCards = () =>
    props.list
      ? props.list.map((card) => (
          <Card key={card._id} {...card} grid={props.grid} />
        ))
      : null;

  return (
    <div className="card_block_shop">
      <div>
        <div>
          {props.list ? (
            props.list.length === 0 ? (
              <div className="no_result">{t('Sorry, no results')}</div>
            ) : null
          ) : null}
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(CardBlockShop);
