const purchase = data => {
  const getItems = () => {
    let template = '';
    data.product.forEach(item => {
      template += `
              <div style="font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px ; text-transform: uppercase;">
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
                            <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">

                            Thank you for your order</h1></td>
                    </tr>
                    <tr>
                        <td style="margin: 0 auto;">
                             <h2 style="box-sizing: border-box; color: #000000; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">
                             Your purchase information</h2> 
                                     ${getItems()}
                        </td>
                    </tr>
                    <tr>
                         <td style="background-color: #999592; margin: 0 auto;">
                                 <p style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;font-size:10px">
                                         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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

// purchase(actionData)
// [0]     <!DOCTYPE html>
// [0]     <html style="margin: 0; padding: 0;">
// [0]
// [0]         <head>
// [0]             <title>One | Email template!</title>
// [0]         </head>
// [0]
// [0]             <body style="margin: 0; padding: 0;">
// [0]                 <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
// [0]                     <tr>
// [0]                         <td style="background-color: #999592; margin: 0 auto;">
// [0]                             <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">
// [0]
// [0]                             Thank you for your order</h1></td>
// [0]                     </tr>
// [0]                     <tr>
// [0]                         <td style="margin: 0 auto;">
// [0]                              <h2 style="box-sizing: border-box; color: #000000; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px;
// text-align: center; text-transform: uppercase;">Your purchase information</h2>
// [0]                           undefined
// [0]               <div style="font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px ; text-transform: uppercase;">
// [0]                   <h3>
// [0]                     Breed: Tippler RingID: 1344432
// [0]                   </h3>
// [0]                   <p>Price paid: $ 1</p>
// [0]                   <p>Purchase order: PO-10574-9844f81e</p>
// [0]                </div>
// [0]
// [0]               <div style="font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px ; text-transform: uppercase;">
// [0]                   <h3>
// [0]                     Breed: American Show Racer RingID: 24121334
// [0]                   </h3>
// [0]                   <p>Price paid: $ 1</p>
// [0]                   <p>Purchase order: PO-10574-9844f81e</p>
// [0]                </div>
// [0]
// [0]                         </td>
// [0]                     </tr>
// [0]                     <tr>
// [0]                          <td style="background-color: #999592; margin: 0 auto;">
// [0]                                  <p style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;font-size:10px">
// [0]                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
// nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
// [0]                                  </p></td>
// [0]                     </tr>
// [0]                 </table>
// [0]             </body>
// [0]
// [0]       </html>
