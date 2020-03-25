import React from 'react';
import _ from 'lodash';

const Breed = props => {
  return (
    <div className="container d-flex flex-wrap">
      {props.breeds
        ? props.breeds.map((breed, i) => (
            <div key={i}>
              <div className="row">
                <div className="col-md-6" style={{ width: '30rem' }}>
                  <div className="card flex-md-row mb-4 shadow-sm h-md-250">
                    <div className="card-body d-flex flex-column align-items-start ">
                      <strong className="d-inline-block mb-2 text-primary">
                        {breed.name}
                      </strong>
                      <p className="card-text mb-auto overflow-hidden breed_card_description">
                        {breed.description}
                      </p>
                      <a
                        className="btn btn-outline-primary btn-sm"
                        role="button"
                        href="/"
                      >
                        Continue reading
                      </a>
                    </div>
                    <img
                      className="card-img-right flex-auto d-none d-lg-block"
                      src={_.get(
                        breed,
                        'images[0].url',
                        `/images/image_not_available.png`
                      )}
                      alt={breed.name}
                      style={{ width: '200px', height: '250px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Breed;
