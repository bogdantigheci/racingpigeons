import React from 'react';
import _ from 'lodash';

const Breeder = props => {
  return (
    <div>
      <h5 className="section-title h1">Breeders</h5>
      <div className="container d-flex">
        <div className="breeders_display">
          {props.breeders
            ? props.breeders.map((breeder, i) => (
                <div key={i} id="breeder_card_layout">
                  <div className="cardrow">
                    <div className="image-flip">
                      <div className="mainflip">
                        <div className="frontside">
                          <div className="card">
                            <div className="card-body text-center">
                              <p>
                                <img
                                  className=" img-fluid"
                                  src={_.get(
                                    breeder,
                                    'images[0].url',
                                    `/images/image_not_available.png`
                                  )}
                                  alt={breeder.name}
                                />
                              </p>
                              <h4 className="card-title">{breeder.name}</h4>
                              <p className="card-text">{breeder.club}</p>
                            </div>
                          </div>
                        </div>
                        <div className="backside">
                          <div className="card">
                            <div className="card-body text-center mt-4">
                              <h4 className="card-title">{breeder.name}</h4>
                              <p className="card-text breeder_bio">
                                {breeder.bio}
                              </p>
                              <div className="card_footer">
                                <a
                                  className="text-xs-center"
                                  target="_blank"
                                  href="/"
                                >
                                  Read more
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Breeder;
