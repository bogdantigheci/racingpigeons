const mailer = require('nodemailer');
require('dotenv').config();
const { welcome } = require('./welcome_template');
const { purchase } = require('./purchase_template');
const { reset_password } = require('./reset_password_template');
const { sell_request } = require('./sell_request_template');

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;
  switch (template) {
    case 'welcome':
      data = {
        from: 'Racing Pigeons <racingpigeonsbt@gmail.com>',
        to,
        subject: `Welcome to Racing Pigeons ${name}`,
        html: welcome(),
      };
      break;
    case 'purchase':
      data = {
        from: 'Racing Pigeons <racingpigeonsbt@gmail.com>',
        to,
        subject: `Thank you for your purchase ${name}`,
        html: purchase(actionData),
      };
      break;
    case 'reset_password':
      data = {
        from: 'Racing Pigeons <racingpigeonsbt@gmail.com>',
        to,
        subject: `Hey, ${name} use the link below to reset your password`,
        html: reset_password(actionData),
      };
      break;
    case 'sell_request':
      data = {
        from: 'Racing Pigeons <racingpigeonsbt@gmail.com>',
        to,
        subject: `Thank you for your sell request ${name}`,
        html: sell_request(),
      };
      break;

    default:
      return data;
  }

  return data;
};

const sendEmail = (to, name, token, template, actionData = null) => {
  smtpTransport = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'racingpigeonsbt@gmail.com',
      pass: process.env.EMAIL_PASS,
    },
  });

  const mail = getEmailData(to, name, null, template, actionData);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      cb();
    }
    smtpTransport.close();
  });
};
module.exports = { sendEmail };
