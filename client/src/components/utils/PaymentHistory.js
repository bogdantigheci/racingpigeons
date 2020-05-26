import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';

const SellRequestHistory = (props) => {
  const { t } = props;
  const renderBlocks = () =>
    props && props.payments
      ? props.payments.map((payment, i) => (
          <tr key={i}>
            <td>
              <Link to={`/product/payments/${payment._id}`}>{payment._id}</Link>
            </td>
            <td>{payment.reviewed ? t('YES') : t('NO')}</td>
          </tr>
        ))
      : null;

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>{t('Order ID')}</th>
            <th>{t('Reviewed')}</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default withNamespaces()(SellRequestHistory);
