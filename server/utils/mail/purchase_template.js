const purchase = (data) => {
  const getItems = () => {
    let template = '';
    data.product.forEach((item) => {
      template += `
              <div style="font-family: monospace, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px ; text-transform: uppercase;">
                  <h3>
                    Breed: ${item.breed} RingID: ${item.ringId}
                  </h3>
                  <p>Price paid: $ ${item.price}</p>
                  <p>Purchase order: ${item.porder}</p>
               </div>
              `;
    });

    return template;
  };

  return `
    <!DOCTYPE html>
    <html style="margin: 0; padding: 0;">
    
        <head>
            <title>One | Email template!</title>
        </head>
    
            <body style="margin: 0; padding: 0;">
                <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
                    <tr>
                        <td style="background-color: #999592; margin: 0 auto;">
                            <h1 style="box-sizing: border-box; color: white; font-family: monospace, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">

                            Thank you for your order</h1></td>
                    </tr>
                    <tr>
                        <td style="margin: 0 auto;">
                             <h2 style="box-sizing: border-box; color: #000000; font-family: monospace, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">
                             Your purchase information</h2> 
                                     ${getItems()}
                        </td>
                    </tr>
                    <tr>
                         <td style="background-color: #999592; margin: 0 auto;">
                                 <p style="box-sizing: border-box; color: white; font-family: monospace, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;font-size:10px">
                                 Thank you for your order! If you have any questions feel free to
                                 contact us! We hope to see you back soon!
                                 </p></td>
                    </tr>
                </table>
            </body>
    
      </html>
    `;
};

module.exports = { purchase };

/////////////////TRANSACTION DATA FORMAT FROM SERVER
// {
//     [0]   user: {
//     [0]     id: 5e5639816ff3c318408facc3,
//     [0]     name: 'Bogdan',
//     [0]     lastname: 'Tigheci',
//     [0]     email: 'bogdantigheci@yahoo.com'
//     [0]   },
//     [0]   data: {
//     [0]     paid: true,
//     [0]     cancelled: false,
//     [0]     payerID: 'W62NLCEUHJG5N',
//     [0]     paymentID: 'PAYID-LZLEIXI1DK4099924994042X',
//     [0]     paymentToken: 'EC-8YC83159GT409572D',
//     [0]     returnUrl: 'https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LZLEIXI1DK4099924994042X&token=EC-8YC83159GT409572D&PayerID=W62NLCEUHJG5N',
//     [0]     address: {
//     [0]       recipient_name: 'TIGHECI BOGDAN',
//     [0]       line1: '1 Main St',
//     [0]       city: 'San Jose',
//     [0]       state: 'CA',
//     [0]       postal_code: '95131',
//     [0]       country_code: 'US'
//     [0]     },
//     [0]     email: 'bogdantigheci@yahoo.com',
//     [0]     porder: 'PO-54733-9844f81e'
//     [0]   },
//     [0]   product: [
//     [0]     {
//     [0]       porder: 'PO-54733-9844f81e',
//     [0]       dateOfPurchase: 1582711914734,
//     [0]       name: undefined,
//     [0]       breed: 'Tippler',
//     [0]       id: '5e4e87ddcc3e0c2a8082f3dc',
//     [0]       price: 1,
//     [0]       quantity: 1,
//     [0]       paymentId: 'PAYID-LZLEIXI1DK4099924994042X'
//     [0]     }
//     [0]   ]
//     [0] }
