import React from "react";
import { Card, CardBody, Image, Divider, Skeleton } from "@nextui-org/react";
import { ForecastCardProps } from "./ForecastCard.utils";
import moment from "moment";
import { ScaleTemperatureEnum } from "@/interfaces/weather.interface";
import format from "@/utils/format";

export default function ForecastCard({
  forecast,
  scaleTemperature,
  isLoading,
}: ForecastCardProps) {
  return (
    <Card className="w-full bg-transparent">
      <CardBody className="flex flex-col justify-center items-center">
        <div className="flex flex-row p-1 w-full justify-between items-center">
          <div className="flex flex-col">
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              <h1 className="text-2xl  md:text-lg text-white">
                {format.dayOfWeek(forecast.date)}
              </h1>
              <p className="text-white">
                {format.descriptionDate(forecast.date)}
              </p>
            </Skeleton>
          </div>

          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <Image
              src={`https:${forecast.day.condition.icon}`}
              width={80}
              height={80}
              alt="forecast-weather-icon"
            />
          </Skeleton>
        </div>
        <Skeleton isLoaded={!isLoading} className="rounded-lg">
          <div className="flex flex-row justify-center pt-4 pb-4 items-end">
            <p className="text-2xl  md:text-lg  lg:text-2xl text-white">
              {scaleTemperature === ScaleTemperatureEnum.Celsius
                ? format.roundTemperature(forecast.day.maxtemp_c)
                : format.roundTemperature(forecast.day.maxtemp_f)}
              °
            </p>
            <p className=" text-white">max</p>
            <Divider
              orientation="vertical"
              className="ml-4 mr-4 md:ml-2 md:mr-2 lg:ml-4 lg:mr-4  bg-white"
            />
            <p className="text-2xl md:text-lg lg:text-2xl text-white">
              {scaleTemperature === ScaleTemperatureEnum.Celsius
                ? format.roundTemperature(forecast.day.mintemp_c)
                : format.roundTemperature(forecast.day.mintemp_f)}
              °
            </p>
            <p className=" text-white">min</p>
          </div>
        </Skeleton>
      </CardBody>
    </Card>
  );
}
