'use strict';

const axios = require('axios');

let config = require('../config');
let url = 'https://api.sendgrid.com/v3/mail/send';

exports.send = async (to, subject, body) => {
  axios.post(
    url,
    {
      "personalizations": [{
        "to": [{
          "email": to
        }]
      }],
      "from": {
        "email": config.emailFrom
      },
      "subject": subject,
      "content": [{
        "type": "text/plain",
        "value": body
      }]
    },
    {
      headers: {
        Authorization : `Bearer ${config.sandGridKey}`,
        contentType: 'application/json'
      },
    }
  );
};