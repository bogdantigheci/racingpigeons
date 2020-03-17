import React from 'react';
import moment from 'moment';

const PurchaseHistory = props => {
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
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Purchase order</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default PurchaseHistory;
