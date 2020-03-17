import React from 'react';
import _ from 'lodash';

const Breeder = props => {
  return (
    <div>
      {props.breeders
        ? props.breeders.map((breeder, i) => (
            <div key={i} className="testimonial" id="customer">
              <div className="testimonial__image-container">
                <img
                  src={_.get(
                    breeder,
                    'images[0].url',
                    `/images/image_not_available.png`
                  )}
                  alt={breeder.name}
                  className="testimonial__image"
                />
              </div>
              <div className="testimonial__info">
                <h1 className="testimonial__name">{breeder.name}</h1>
                <h2 className="testimonial__subtitle">
                  Member of
                  <a href="/">{breeder.club}</a>
                </h2>
                <p className="testimonial__text">{breeder.bio}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Breeder;
