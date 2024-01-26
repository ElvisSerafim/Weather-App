import React from "react";
import { WeatherInformationProps } from "./WeatherInformation.utils";
import { SymbolMap } from "@/interfaces/weather.interface";

export default function WeatherInformation({
  data,
  title,
}: WeatherInformationProps) {
  const getSimbolByInformationType = () => {
    const symbolMap: SymbolMap = {
      Temperature: "°",
      Humidity: "%",
      "Wind Speed": "km/h",
    };

    return title && data !== "No Data"
      ? symbolMap[title as keyof SymbolMap]
      : "";
  };

  return (
    <div className="gap-9">
      <h1 className="text-2xl font-bold md:text-2xl lg:text-3xl">
        {data}
        {getSimbolByInformationType()}
      </h1>
      <p className="font-semibold">{title}</p>
    </div>
  );
}
