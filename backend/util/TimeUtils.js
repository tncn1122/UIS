const moment = require('moment-timezone');
const { TIME_ZONE, DATE_FORMAT } = require('../value/time');


function getRawDate() {
  return moment().tz(TIME_ZONE)
}

function formatDate(date, stringDate = DATE_FORMAT) {
  return moment(date).format(stringDate);
}


module.exports = {
  getRawDate,
  formatDate
}