const moment = require('moment-timezone');

const { TIME_ZONE, DATE_FORMAT } = require('../value/time');


function getRawDate() {
  return moment().tz(TIME_ZONE)
}

function formatDate(date, stringDate = DATE_FORMAT) {
  return moment(date).format(stringDate);
}

function getDate() {
  moment.tz.setDefault(TIME_ZONE);
  const now = moment();
  return formatDate(now);
}

module.exports = {
  getRawDate,
  formatDate,
  getDate
}