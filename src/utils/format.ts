import moment from "moment";

const format = {
  roundTemperature: (temperature: number) => Math.round(temperature),
  descriptionDate: (dateToFormat: string) =>
    moment(dateToFormat).format("DD MMM, YYYY"),
  dayOfWeek: (dateToFormat: string) => moment(dateToFormat).format("dddd"),
  isNightTime: (localtime: string) => {
    const currentLocationHour = new Date(localtime).getHours();
    return currentLocationHour >= 17 || currentLocationHour < 5;
  },
};

export default format;
