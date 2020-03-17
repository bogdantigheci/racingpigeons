const mailer = require('nodemailer');
require('dotenv').config();
const { welcome } = require('./welcome_template');
const { purchase } = require('./purchase_template');
const { resetPass } = require('./resetpass_template');

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', actionData);
  switch (template) {
    case 'welcome':
      data = {
        from: 'Racing Pigeons <racingpigeonsbt@gmail.com>',
        to,
        subject: `Welcome to Racing Pigeons ${name}`,
        html: welcome()
      };
      break;
    case 'purchase':
      data = {
        from: 'Racing Pigeons <racingpigeonsbt@gmail.com>',
        to,
        subject: `Thank you for your purchase ${name}`,
        html: purchase(actionData)
      };
      break;
    case 'reset_password':
      data = {
        from: 'Racing Pigeons <racingpigeonsbt@gmail.com>',
        to,
        subject: `Hey, ${name} use the link below to reset your password`,
        html: resetPass(actionData)
      };

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
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getEmailData(to, name, null, template, actionData);

  smtpTransport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      cb();
    }
    smtpTransport.close();
  });
};
module.exports = { sendEmail };
