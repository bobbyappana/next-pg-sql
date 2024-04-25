const moment = require("moment");

export const dateFormate = (date) => {
  const formattedDate = moment.utc(date).format("dddd, MMMM-YYYY");

  return formattedDate;
};
