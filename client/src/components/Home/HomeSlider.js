import React from 'react';
import Slider from 'react-slick';
import MyButton from '../utils/button';
import { withNamespaces } from 'react-i18next';

const HomeSlider = (props) => {
  const { t } = props;
  const slides = [
    {
      img: '/images/121316.jpg',
      lineOne: t('Racing Homer'),
      lineTwo: t('Best Racing Pigeon'),
      linkTitle: t('Shop now'),
      linkTo: '/shop',
    },
    {
      img: '/images/121358.jpg',
      lineOne: t('Tippler'),
      lineTwo: t('An amazing racing pigeon'),
      linkTitle: t('Shop now'),
      linkTo: '/shop',
    },
  ];

  const settings = {
    dots: false,
    ininite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  const generateSlides = () =>
    slides
      ? slides.map((item, i) => (
          <div key={i}>
            <div
              className="current_promotion_img"
              style={{
                background: `url(${item.img})`,
                height: `${window.innerHeight}px`,
              }}
            >
              <div className="current_promotion_action">
                <div className="tag title">{item.lineOne}</div>
                <div className="tag second_title">{item.lineTwo}</div>
                <div>
                  <MyButton
                    type="default"
                    title={item.linkTitle}
                    linkTo={item.linkTo}
                    addStyles={{
                      margin: '10px 0 0 0',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      : null;

  return (
    <div className="current_promotion">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default withNamespaces()(HomeSlider);
