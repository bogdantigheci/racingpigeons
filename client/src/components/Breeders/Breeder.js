import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

const Breeder = (props) => {
  const { t } = props;

  return (
    <div>
      <div className="container d-flex">
        <div className="breeders_display flex-wrap">
          {props.breeders
            ? props.breeders.map((breeder, i) => (
                <div key={i} id="breeder_card_layout" className="ml-0">
                  <div className="cardrow">
                    <div className="image-flip">
                      <div className="mainflip">
                        <div className="frontside">
                          <div className="card">
                            <div className="card-body text-center">
                              <img
                                className=" img-fluid"
                                src={_.get(
                                  breeder,
                                  'images[0].url',
                                  `/images/image_not_available.png`
                                )}
                                alt={breeder.name}
                              />

                              <h4 className="card-title">{breeder.name}</h4>
                              <p className="card-text breeder_club_name">
                                {breeder.club}
                              </p>
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
                                <Link
                                  to={`/product/breeders/${breeder._id}`}
                                  className="text-xs-center"
                                >
                                  {t('Read more')}
                                </Link>
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

export default withNamespaces()(Breeder);
