const sell_request = () => {
  return `<!DOCTYPE html>
      <html style="margin: 0; padding: 0;">
      
          <head>
              <title>Sell Request Email template!</title>
          </head>
      
              <body style="margin: 0; padding: 0;">
                  <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
                      <tr>
                          <td style="background-color: #999592; margin: 0 auto;">
                              <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Thank you for your sell request!</h1></td>
                      </tr>
                      <tr>
                          <td style="margin: 0 auto;">
                            <div> WE WILL REVIEW YOUR SELL REQUEST. WE'LL GET BACK TO YOU AS SOON AS WE MAKE A DECISION</div>                         
                          </td>
                      </tr>
                      <tr>
                          <td style="background-color: #999592; margin: 0 auto;">
                              <p style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;font-size:10px">
                                     You will recieve an email once we've made a decision. Have a nice day!
                              </p></td>
                      </tr>
                  </table>
              </body>
      
        </html>`;
};

module.exports = { sell_request };
