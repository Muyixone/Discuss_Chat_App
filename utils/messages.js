const dayjs = require('dayjs');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: dayjs().format('h:m, a'),
  };
}

module.exports = formatMessage;
