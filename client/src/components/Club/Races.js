import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const Races = (props) => {
  return (
    <div className="container d-flex flex-wrap">
      {props.races &&
        props.races.map((race, i) => (
          <div
            key={i}
            className="mr-3 ml-2 mb-5 club_race_card club_race_card_mobile"
          >
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
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '5px',
                  marginBottom: '5px',
                }}
              >
                {race.county}
              </p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Races;
