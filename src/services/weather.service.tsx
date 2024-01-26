import {
  City,
  CurrentWeather,
  GetForecastWeather,
} from "@/interfaces/weather.interface";
import ApiService from "./api.abstract";

class WeatherService extends ApiService {
  constructor() {
    super(process.env.NEXT_PUBLIC_WEATHER_API_URL!);
  }

  async getCitiesBySearch(searchedCity?: string) {
    return this.get<City[]>(
      `/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${searchedCity}`
    );
  }

  async getWeather(getForecastWeather: GetForecastWeather) {
    return this.get<CurrentWeather>(
      `/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${getForecastWeather.city}&days=${getForecastWeather.days}`
    );
  }
}

const weatherService = new WeatherService();

export default weatherService;
