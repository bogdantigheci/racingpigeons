const purchase = (data) => {
  const getItems = () => {
    let template = '';
    data.product.forEach((item) => {
      template += `
      <div>
      <div>Breed: ${item.breed}</div>
      <div>RingId: ${item.ringId}</div>
      <div>Purchase order: ${item.porder}</div>
      <hr></hr>
          </div>    
`;
    });

    return template;
  };

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    style="
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      font-size: 16px;
      margin: 0;
    "
  >
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Purchase Email Template</title>
  
      <style type="text/css">
        img {
          max-width: 100%;
        }
        body {
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: none;
          width: 100% !important;
          height: 100%;
          line-height: 2em;
        }
        body {
          background-color: #f6f6f6;
        }
        @media only screen and (max-width: 640px) {
          body {
            padding: 0 !important;
          }
          h1 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
          h2 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
          h3 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
          h4 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
          h1 {
            font-size: 22px !important;
          }
          h2 {
            font-size: 18px !important;
          }
          h3 {
            font-size: 16px !important;
          }
          .container {
            padding: 0 !important;
            width: 100% !important;
          }
          .content {
            padding: 0 !important;
          }
          .content-wrap {
            padding: 10px !important;
          }
          .invoice {
            width: 100% !important;
          }
        }
      </style>
    </head>
  
    <body
      itemscope
      itemtype="http://schema.org/EmailMessage"
      style="
        font-family: 'Courier New', Courier, monospace;
        box-sizing: border-box;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: none;
        width: 100% !important;
        height: 100%;
        line-height: 1.6em;
        background-color: #f6f6f6;
        margin: 0;
      "
      bgcolor="#f6f6f6"
    >
      <table
        class="body-wrap"
        style="
          font-family: 'Courier New', Courier, monospace;
          box-sizing: border-box;
          font-size: 16px;
          width: 100%;
          background-color: #f6f6f6;
          margin: 0;
        "
        bgcolor="#f6f6f6"
      >
        <tr
          style="
            font-family: 'Courier New', Courier, monospace;
            box-sizing: border-box;
            font-size: 16px;
            margin: 0;
          "
        >
          <td
            style="
              font-family: 'Courier New', Courier, monospace;
              box-sizing: border-box;
              font-size: 16px;
              vertical-align: top;
              margin: 0;
            "
            valign="top"
          ></td>
          <td
            class="container"
            width="600"
            style="
              font-family: 'Courier New', Courier, monospace;
              box-sizing: border-box;
              font-size: 16px;
              display: block !important;
              max-width: 600px !important;
              clear: both !important;
              margin: 0 auto;
            "
          >
            <div
              class="content"
              style="
                font-family: 'Courier New', Courier, monospace;
                box-sizing: border-box;
                font-size: 16px;
                max-width: 600px;
                display: block;
                margin: 0 auto;
                padding: 20px;
              "
            >
              <table
                class="main"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  font-family: 'Courier New', Courier, monospace;
                  box-sizing: border-box;
                  font-size: 16px;
                  border-radius: 3px;
                  background-color: #fff;
                  margin: 0;
                  border: 1px solid #e9e9e9;
                "
                bgcolor="#fff"
              >
                <tr
                  style="
                    font-family: 'Courier New', Courier, monospace;
                    box-sizing: border-box;
                    font-size: 16px;
                    margin: 0;
                  "
                >
                  <td
                    class="content-wrap aligncenter"
                    style="
                      font-family: 'Courier New', Courier, monospace;
                      box-sizing: border-box;
                      font-size: 16px;
                      vertical-align: top;
                      text-align: center;
                      margin: 0;
                      padding: 20px;
                    "
                    align="center"
                    valign="top"
                  >
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: 'Courier New', Courier, monospace;
                        box-sizing: border-box;
                        font-size: 16px;
                        margin: 0;
                      "
                    >
                      <tr
                        style="
                          font-family: 'Courier New', Courier, monospace;
                          box-sizing: border-box;
                          font-size: 16px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block"
                          style="
                            font-family: 'Courier New', Courier, monospace;
                            box-sizing: border-box;
                            font-size: 16px;
                            vertical-align: top;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          <h2
                            class="aligncenter"
                            style="
                              font-family: 'Courier New', Courier, monospace;
                              box-sizing: border-box;
                              font-size: 24px;
                              color: #000;
                              line-height: 1.2em;
                              font-weight: 400;
                              text-align: center;
                              margin: 40px 0 0;
                            "
                            align="center"
                          >
                            Your order summary
                          </h2>
                        </td>
                      </tr>
                      <tr
                        style="
                          font-family: 'Courier New', Courier, monospace;
                          box-sizing: border-box;
                          font-size: 16px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block aligncenter"
                          style="
                            font-family: 'Courier New', Courier, monospace;
                            box-sizing: border-box;
                            font-size: 16px;
                            vertical-align: top;
                            text-align: center;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          align="center"
                          valign="top"
                        >
                          <table
                            class="invoice"
                            style="
                              font-family: 'Courier New', Courier, monospace;
                              box-sizing: border-box;
                              font-size: 16px;
                              text-align: left;
                              width: 80%;
                              margin: 40px auto;
                            "
                          >
                            <tr
                              style="
                                font-family: 'Courier New', Courier, monospace;
                                box-sizing: border-box;
                                font-size: 16px;
                                margin: 0;
                              "
                            >
                              <td
                                style="
                                  font-family: 'Courier New', Courier, monospace;
                                  box-sizing: border-box;
                                  font-size: 16px;
                                  vertical-align: top;
                                  margin: 0;
                                  padding: 5px 0;
                                "
                                valign="top"
                              >
                                <table
                                  class="invoice-items"
                                  cellpadding="0"
                                  cellspacing="0"
                                  style="
                                    font-family: 'Courier New', Courier, monospace;
                                    box-sizing: border-box;
                                    font-size: 16px;
                                    width: 100%;
                                    margin: 0;
                                  "
                                >
                                  <tr
                                    style="
                                      font-family: 'Courier New', Courier,
                                        monospace;
                                      box-sizing: border-box;
                                      font-size: 16px;
                                      margin: 0;
                                    "
                                  >
                                    <td
                                      style="
                                        font-family: 'Courier New', Courier,
                                          monospace;
                                        box-sizing: border-box;
                                        font-size: 16px;
                                        vertical-align: top;
                                        border-top-width: 1px;
                                        border-top-color: #eee;
                                        border-top-style: solid;
                                        margin: 0;
                                        padding: 5px 0;
                                        border-bottom-color: #333;
                                        border-bottom-width: 2px;
                                        border-bottom-style: solid;
                                      "
                                      valign="top"
                                    >
                                    ${getItems()}                               
                                      </td>
                                    </tr>
                                
                                 
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr
                        style="
                          font-family: 'Courier New', Courier, monospace;
                          box-sizing: border-box;
                          font-size: 16px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block aligncenter"
                          style="
                            font-family: 'Courier New', Courier, monospace;
                            box-sizing: border-box;
                            font-size: 16px;
                            vertical-align: top;
                            text-align: center;
                            margin: 0;
                            padding: 0 0 20px;
                          "
                          align="center"
                          valign="top"
                        >
                          <p>If you have any issues please contact us via the application chat or <a
                            href="mailto:racingpigeonsbt@gmail.com"
                            style="
                              font-family: 'Courier New', Courier, monospace;
                              box-sizing: border-box;
                              font-size: 16px;
                              color: blue;
                              text-decoration: underline;
                              margin: 0;
                            "
                            >email</a
                          >.</p>
                        </td>
                      </tr>
                      <tr
                        style="
                          font-family: 'Courier New', Courier, monospace;
                          box-sizing: border-box;
                          font-size: 16px;
                          margin: 0;
                        "
                      >
                        <td
                          class="content-block aligncenter"
                          style="
                          font-family: 'Courier New', Courier, monospace;
                            box-sizing: border-box;
                            font-size: 32px;
                            vertical-align: top;
                            text-align: center;
                            margin: 0;
                            color: blue;
                            padding: 0 0 20px;
                            font-weight: bold;
                          "
                          align="center"
                          valign="top"
                        >
                          Racing Pigeons
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <div
                class="footer"
                style="
                  font-family: 'Courier New', Courier, monospace;
                  box-sizing: border-box;
                  font-size: 16px;
                  width: 100%;
                  clear: both;
                  color: #999;
                  margin: 0;
                  padding: 20px;
                "
              >
              
    </body>
  </html>
  `;
};

module.exports = { purchase };
