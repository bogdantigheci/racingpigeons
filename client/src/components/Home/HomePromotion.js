import React from 'react';
import MyButton from '../utils/button';
import { withNamespaces } from 'react-i18next';

const HomePromotion = (props) => {
  const { t } = props;
  const promotion = {
    img: '/images/racinghomer.jpg',
    lineOne: t('Free transport'),
    lineTwo: t('Untill September 1st 2020'),
    linkTitle: t('Shop now'),
    linkTo: '/shop',
  };

  const renderPromotion = () =>
    promotion ? (
      <div
        className="home_promotion_img"
        style={{
          background: `url(${promotion.img})`,
        }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag second_title">{promotion.lineTwo}</div>
        <div>
          <MyButton
            type="default"
            title={promotion.linkTitle}
            linkTo={promotion.linkTo}
            addStyles={{
              margin: '10px 0 0 0',
            }}
          />
        </div>
      </div>
    ) : null;

  return <div className="home_promotion">{renderPromotion()}</div>;
};

export default withNamespaces()(HomePromotion);
