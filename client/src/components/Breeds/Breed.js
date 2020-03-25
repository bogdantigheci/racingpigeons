import React from 'react';
import _ from 'lodash';

const Breed = props => {
  return (
    <div className="container d-flex flex-wrap">
      {props.breeds
        ? props.breeds.map((breed, i) => (
            <div key={i} className="card promoting-card breeds_display">
              <div className="card-body d-flex flex-row">
                <div className="mx-auto">
                  <h4 className="card-title font-weight-bold mb-2 breed_card_title">
                    {breed.name}
                  </h4>
                </div>
              </div>

              <div className="view overlay">
                <img
                  className="card-img-top rounded-0 breed_image"
                  src={_.get(
                    breed,
                    'images[0].url',
                    `/images/image_not_available.png`
                  )}
                  alt={breed.name}
                />
              </div>

              <div className="card-body">
                <div className="collapse-content">
                  <p className="card-text collapse" id={`id${i}`}>
                    {breed.description}
                  </p>
                  <a
                    className="btn btn-flat red-text p-1 my-1 mr-0 mml-1 collapsed breed_read_more"
                    data-toggle="collapse"
                    href={`#id${i}`}
                    aria-expanded="false"
                    aria-controls={`id${i}`}
                  >
                    Description
                  </a>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Breed;
