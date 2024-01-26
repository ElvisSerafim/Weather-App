"use client";
import { useCallback, useEffect, useState } from "react";
import SwitchTemperatureScale from "@/components/SwitchTemperatureScale";
import MainCard from "@/components/MainCard";
import ForecastCard from "@/components/ForecastCard";
import weatherService from "@/services/weather.service";
import {
  City,
  CurrentWeather,
  GetForecastWeather,
  ScaleTemperatureEnum,
} from "@/interfaces/weather.interface";
import AutoCompleteSearch from "@/components/AutoCompleteSearch";
import { getUserLocation } from "@/services/location.service";
import { useToast } from "@/contexts/ToastContext";
import format from "@/utils/format";
import { DAYS_FORECAST } from "@/utils/constants";

export default function App() {
  const { addToast } = useToast();
  const [isSelectedCelsius, setIsSelectedCelsius] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [currentCity, setCurrentCity] = useState<City | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleError = (title: string, message: string) => {
    setIsLoading(false);
    addToast(title, message, "error");
  };

  const getCurrentWeather = useCallback(async () => {
    setIsLoading(true);
    try {
      const forecastRequest: GetForecastWeather = {
        city: currentCity!.name,
        days: DAYS_FORECAST,
      };

      const weatherData = await weatherService.getWeather(forecastRequest);
      if (weatherData) {
        setCurrentWeather(weatherData);
      }
      setIsLoading(false);
    } catch (error) {
      handleError(
        "Error loading weather city!",
        "Check your connection and try again."
      );
    }
  }, [currentCity]);

  const loadUserLocationWeather = useCallback(async () => {
    try {
      setIsLoading(true);
      const weatherData = await getUserLocation();
      setCurrentWeather(weatherData);
      setIsLoading(false);
    } catch (error) {
      handleError(
        "Error on load user location weather!",
        "Check your location permissions."
      );
    }
  }, []);

  useEffect(() => {
    if (currentCity) {
      getCurrentWeather();
    }
  }, [currentCity]);

  useEffect(() => {
    loadUserLocationWeather();
  }, []);

  return (
    <div
      className={`flex flex-col p-6 items-center w-100 min-h-screen ${
        !format.isNightTime(currentWeather?.location.localtime!)
          ? "bg-gradient-to-tr from-pink-500 to-yellow-500"
          : "bg-gradient-to-tr from-blue-800 to-gray-900"
      } text-white shadow-lg`}
    >
      <div className="flex flex-col w-full md:w-5/6 gap-10">
        <div className="flex flex-col items-start justify-center gap-4 w-full">
          <div className="flex flex-row w-full justify-end">
            <SwitchTemperatureScale
              isSelectedCelsius={isSelectedCelsius}
              setIsSelectedCelsius={setIsSelectedCelsius}
            />
          </div>
          <div className="w-full md:w-full">
            <AutoCompleteSearch setSelectedCity={setCurrentCity} />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row p-0 m-0">
          <MainCard
            currentWeather={currentWeather}
            isLoading={isLoading}
            scaleTemperature={
              isSelectedCelsius
                ? ScaleTemperatureEnum.Celsius
                : ScaleTemperatureEnum.Fahrenheit
            }
          />
        </div>
        <div className="w-full">
          <h1 className="text-2xl md:text-4xl font-bold text-left">
            5 Day Forecast
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {currentWeather?.forecast.forecastday.slice(1).map((forecastData) => (
            <ForecastCard
              key={forecastData.date}
              forecast={forecastData}
              isLoading={isLoading}
              scaleTemperature={
                isSelectedCelsius
                  ? ScaleTemperatureEnum.Celsius
                  : ScaleTemperatureEnum.Fahrenheit
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
