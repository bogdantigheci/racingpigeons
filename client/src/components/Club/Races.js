import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const Races = (props) => {
  return (
    <div className="container d-flex flex-wrap">
      {props.races &&
        props.races.map((race, i) => (
          <div key={i} className="mr-5 mx-auto mb-5 club_race_card">
            <Link to={`/product/races/${race._id}`}>
              <img
                className="club_race_card_image"
                src={_.get(
                  race,
                  'images[0].url',
                  `/images/image_not_available.png`
                )}
                alt="race"
              />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Races;
