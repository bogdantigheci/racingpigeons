import React from 'react';
import { Popup } from 'semantic-ui-react';
import { withNamespaces } from 'react-i18next';

const MapPopup = (props) => {
  const { t } = props;
  return (
    <Popup
      className="popup fade-in"
      trigger={
        <path
          className="map_path"
          id={props.id}
          onMouseOver={props.showResults}
          d={props.path}
        />
      }
      content={
        <div>
          <div>
            {t('Races')} {props.noOfRaces}
          </div>
          <div></div>
        </div>
      }
      basic
    />
  );
};

export default withNamespaces()(MapPopup);
