import React from 'react';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';

const PurchaseHistory = (props) => {
  const { t } = props;
  const renderBlocks = () =>
    props.products
      ? props.products.map((product, i) => (
          <tr key={i}>
            <td>{moment(product.dateOfPurchase).format('DD-MM-YYYY')}</td>
            <td>{product.breed}</td>
            <td>$ {product.price}</td>
            <td>{product.porder}</td>
          </tr>
        ))
      : null;

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>{t('Date of purchase')}</th>
            <th>{t('Breed')}</th>
            <th>{t('Price paid')}</th>
            <th>{t('Purchase order')}</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default withNamespaces()(PurchaseHistory);
