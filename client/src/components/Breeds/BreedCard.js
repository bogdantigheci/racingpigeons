import React from 'react';
import _ from 'lodash';

const BreedCard = props => {
  return (
    <div className="container">
      <h3 class="pb-3 mb-4 font-italic border-bottom">Breeds</h3>
      {props.breeds
        ? props.breeds.map((breed, i) => (
            <div key={i}>
              <div class="container">
                <div class="row">
                  <div class="col-md-6">
                    <div class="card flex-md-row mb-4 shadow-sm h-md-250">
                      <div class="card-body d-flex flex-column align-items-start">
                        <strong class="d-inline-block mb-2 text-primary">
                          {breed.name}
                        </strong>
                        {/* <h6 class="mb-0">
                          <a class="text-dark" href="#">
                            40 Percent of People Can’t Afford Basics
                          </a>
                        </h6> */}
                        <div class="mb-1 text-muted small">Nov 12</div>
                        <p class="card-text mb-auto">{breed.bio}</p>
                        <a
                          class="btn btn-outline-primary btn-sm"
                          role="button"
                          href="http://www.jquery2dotnet.com/"
                        >
                          Continue reading
                        </a>
                      </div>
                      <img
                        class="card-img-right flex-auto d-none d-lg-block"
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
            </div>
          ))
        : null}
    </div>
  );
};

export default BreedCard;
