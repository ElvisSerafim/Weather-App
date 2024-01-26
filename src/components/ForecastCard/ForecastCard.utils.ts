import {
  Forecastday,
  ScaleTemperatureEnum,
} from "@/interfaces/weather.interface";

export interface ForecastCardProps {
  forecast: Forecastday;
  scaleTemperature: ScaleTemperatureEnum;
  isLoading: boolean;
}
