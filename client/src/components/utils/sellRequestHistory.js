import React from 'react';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';

const SellRequestHistory = (props) => {
  const { t } = props;
  const renderBlocks = () =>
    props && props.sellRequests
      ? props.sellRequests.map((request, i) => (
          <tr key={i}>
            <td>
              <Link to={`/product/requests/${request._id}`}>
                {moment(request.createdAt).format('DD-MM-YYYY')}
              </Link>
            </td>
            <td>{request.ringId}</td>
            <td>{request.breed}</td>
            <td>{request.breeder}</td>
            <td>{t(request.reviewed)}</td>
          </tr>
        ))
      : null;

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>{t('Requested at')}</th>
            <th>{t('Ring ID')}</th>
            <th>{t('Breed')}</th>
            <th>{t('Breeder')}</th>
            <th>{t('Reviewed')}</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default withNamespaces()(SellRequestHistory);
