import React from 'react';
import _ from 'lodash';

const Breed = props => {
  return (
    <div>
      {props.breeds
        ? props.breeds.map((breed, i) => (
            <div key={i} className="testimonial" id="customer">
              <div className="testimonial__image-container">
                <img
                  src={_.get(
                    breed,
                    'images[0].url',
                    `/images/image_not_available.png`
                  )}
                  alt={breed.name}
                  className="testimonial__image"
                />
              </div>
              <div className="testimonial__info">
                <h1 className="testimonial__name">{breed.name}</h1>
                <p className="testimonial__text">{breed.description}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Breed;
