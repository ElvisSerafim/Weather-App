import moment from "moment";

const format = {
  roundTemperature: (temperature: number) => Math.round(temperature),
  descriptionDate: (dateToFormat: string) =>
    moment(dateToFormat).format("DD MMM, YYYY"),
  dayOfWeek: (dateToFormat: string) => moment(dateToFormat).format("dddd"),
};

export default format;
