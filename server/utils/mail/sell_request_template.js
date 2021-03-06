const sell_request = () => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    style="
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      font-size: 14px;
      margin: 0;
    "
  >
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Sell Request Email template</title>
  
      <style type="text/css">
        img {
          max-width: 100%;
        }
        body {
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: none;
          width: 100% !important;
          height: 100%;
          line-height: 1.6em;
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
        line-height: 1.4em;
        background-color: #ffffff;
        margin: 0;
      "
      bgcolor="#ffffff"
    >
      <table
        class="body-wrap"
        style="
          font-family: 'Courier New', Courier, monospace;
          box-sizing: border-box;
          font-size: 16px;
          width: 100%;
          background-color: #ffffff;
          margin: 0;
        "
        bgcolor="#ffffff"
      >
        <tr
          style="
            font-family: 'Courier New', Courier, monospace;
            box-sizing: border-box;
            font-size: 14px;
            margin: 0;
          "
        >
          <td
            style="
              font-family: 'Courier New', Courier, monospace;
              box-sizing: border-box;
              font-size: 14px;
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
                padding: 22px;
              "
            >
              <table
                class="main"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                itemprop="action"
                itemscope
                itemtype="http://schema.org/ConfirmAction"
                style="
                  font-family: 'Courier New', Courier, monospace;
                  box-sizing: border-box;
                  font-size: 14px;
                  border-radius: 3px;
                  background-color: #ffffff;
                  margin: 0;
                  border: 1px solid #e9e9e9;
                "
                bgcolor="#ffffff"
              >
                <tr
                  style="
                    font-family: 'Courier New', Courier, monospace;
                    box-sizing: border-box;
                    font-size: 14px;
                    margin: 0;
                  "
                >
                  <td
                    class="content-wrap"
                    style="
                      font-family: 'Courier New', Courier, monospace;
                      box-sizing: border-box;
                      font-size: 14px;
                      vertical-align: top;
                      margin: 0;
                      padding: 20px;
                    "
                    valign="top"
                  >
                    <meta
                      itemprop="name"
                      content="Confirm Email"
                      style="
                        font-family: 'Courier New', Courier, monospace;
                        box-sizing: border-box;
                        font-size: 14px;
                        margin: 0;
                      "
                    />
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
                          Your sell request will be reviewed as soon as possible.
                          Please check
                          <a
                            href="https://racingpigeons.herokuapp.com/user/sell_requests"
                            style="
                              font-family: 'Courier New', Courier, monospace;
  
                              box-sizing: border-box;
                              font-size: 18px;
                              color: blue;
                              text-decoration: underline;
                              margin: 0;
                            "
                            >here</a
                          >
                          to see the status of your sell request.
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
                          If you have any questions please contact an
                          administrator via the application chat or
                          <a
                            href="mailto:racingpigeonsbt@gmail.com"
                            style="
                              font-family: 'Courier New', Courier, monospace;
  
                              box-sizing: border-box;
                              font-size: 18px;
                              color: blue;
                              text-decoration: underline;
                              margin: 0;
                            "
                            >email</a
                          >.
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
                          class="content-block"
                          style="
                            font-family: 'Courier New', Courier, monospace;
                            box-sizing: border-box;
                            font-size: 16px;
                            vertical-align: top;
                            margin: 0;
                            color: blue;
                            padding: 0 0 20px;
                          "
                          valign="top"
                        >
                          &mdash; Racing Pigeons
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
                <table
                  width="100%"
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
                      class="aligncenter content-block"
                      style="
                        font-family: 'Courier New', Courier, monospace;
                        box-sizing: border-box;
                        font-size: 16px;
                        vertical-align: top;
                        color: blue;
                        text-align: center;
                        margin: 0;
                        padding: 0 0 20px;
                      "
                      align="center"
                      valign="top"
                    >
                      Like
                      <a
                        href="https://www.facebook.com/racingpigeonsbt/"
                        style="
                          font-family: 'Courier New', Courier, monospace;
                          box-sizing: border-box;
                          font-size: 16px;
                          color: blue;
                          text-decoration: underline;
                          margin: 0;
                          font-weight: bold;
                        "
                        >Racing Pigeons</a
                      >
                      on Facebook.
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
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
        </tr>
      </table>
    </body>
  </html>
  `;
};

module.exports = { sell_request };
