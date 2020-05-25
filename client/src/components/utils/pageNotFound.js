import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { withNamespaces } from 'react-i18next';

const PageNotFound = ({ t }) => {
  return (
    <div className="container">
      <div className="not_found_container">
        <FontAwesomeIcon icon={faExclamationCircle} />
        <div>
          <span>Oops !!</span> {t('page not found')}
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(PageNotFound);
