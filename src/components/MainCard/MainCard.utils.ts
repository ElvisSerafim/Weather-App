import {
  CurrentWeather,
  ScaleTemperatureEnum,
} from "@/interfaces/weather.interface";

export interface MainCardProps {
  currentWeather?: CurrentWeather;
  scaleTemperature: ScaleTemperatureEnum;
  isLoading: boolean;
}
