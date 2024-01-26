"use client";
import { useContext, useEffect, useState } from "react";
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

export default function App() {
  const { addToast } = useToast();
  const DAYS_FORECAST = 6;
  const [isSelectedCelsius, setIsSelectedCelsius] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [currentCity, setCurrentCity] = useState<City | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCurrentWeather = async () => {
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
      setIsLoading(false);
      addToast(
        "Error loading weather city!",
        "Check your connection and try again.",
        "error"
      );
    }
  };

  const isNightTime = () => {
    if (currentWeather) {
      const currentLocationHour = new Date(
        currentWeather.location.localtime
      ).getHours();

      return currentLocationHour >= 17 || currentLocationHour < 5;
    }
  };

  const loadUserLocationWeather = async () => {
    try {
      setIsLoading(true);
      const weatherData = await getUserLocation();
      setCurrentWeather(weatherData);
      setIsLoading(false);
    } catch (error) {
      addToast(
        "Error on load user location weather!",
        "Check your location permissions.",
        "error"
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentCity) {
      getCurrentWeather();
      isNightTime();
    }
  }, [currentCity]);

  useEffect(() => {
    loadUserLocationWeather();
    isNightTime();
  }, []);

  return (
    <div
      className={`flex flex-col p-6 items-center w-100 min-h-screen ${
        !isNightTime()
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
