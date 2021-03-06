import React, { Component } from 'react';
import PayPalExpressBtn from 'react-paypal-express-checkout';

class PayPal extends Component {
  render() {
    const onSuccess = (payment) => {
      this.props.onSuccess(payment);
    };

    const onCancel = (data) => {
      alert('Payment was canceled!');
    };

    const onError = (error) => {
      alert(error);
    };

    let env = 'sandbox';
    let currency = 'EUR';
    let total = this.props.toPay;

    const client = {
      sandbox:
        'Ac8Is2EQYMIaEVda9UO6y123nbZIP-cfkhvr7qKXCX7vGc8Ze0xu4nxs0rKeGnccfIveamzj03FVomiW',
      production: '',
    };

    return (
      <div>
        <PayPalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout',
          }}
        />
      </div>
    );
  }
}

export default PayPal;
