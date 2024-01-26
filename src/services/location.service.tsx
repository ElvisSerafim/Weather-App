import {
  CurrentWeather,
  GetForecastWeather,
} from "@/interfaces/weather.interface";
import weatherService from "./weather.service";

const successCallback = async (position: GeolocationPosition) => {
  const forecastRequest: GetForecastWeather = {
    city: position.coords.latitude + "," + position.coords.longitude,
    days: 6,
  };

  const weatherData = await weatherService.getWeather(forecastRequest);
  return weatherData;
};

export const getUserLocation = (): Promise<CurrentWeather | undefined> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        try {
          const result = await successCallback(position);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      },
      (error: GeolocationPositionError) => {
        reject(error);
      }
    );
  });
};
