import React from "react";
import { Card, CardBody, Image, Skeleton } from "@nextui-org/react";
import WeatherInformation from "../WeatherInformation";
import { MainCardProps } from "./MainCard.utils";
import { ScaleTemperatureEnum } from "@/interfaces/weather.interface";
import format from "@/utils/format";
import tempImageBroken from "../../../public/temp_image_broken.png";

export default function MainCard({
  currentWeather,
  scaleTemperature,
  isLoading,
}: MainCardProps) {
  const getFieldDataString = (fieldValue: number) => {
    return fieldValue.toString();
  };

  const getFieldDataValue = (fieldValue?: string) => {
    return currentWeather ? fieldValue : "No Data";
  };

  return (
    <Card className="w-full xl:w-3/5  bg-transparent">
      <CardBody className="flex p-8 flex-col justify-center items-center">
        <div className="w-full">
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <p className=" text-white text-center md:text-left font-semibold">
              {format.descriptionDate(currentWeather?.current.last_updated!)}
            </p>
          </Skeleton>
        </div>
        <div className="flex w-full flex-col justify-center items-center md:flex-row md:items-center md:justify-between pt-4 text-white">
          <div className="flex flex-col gap-4 justify-center items-center">
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              <Image
                src={
                  currentWeather
                    ? `https:${
                        currentWeather?.current.condition.icon as string
                      }`
                    : tempImageBroken.src
                }
                width={100}
                height={100}
                alt="current-weather-icon"
              />
            </Skeleton>
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              <h3 className="p-0 font-semibold">
                {getFieldDataValue(currentWeather?.current.condition.text)}
              </h3>
            </Skeleton>
          </div>
          <div className="gap-10 flex flex-row md:gap-20 pt-10 md:pt-0">
            <div className="flex flex-col gap-10">
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <WeatherInformation
                  data={getFieldDataValue(currentWeather?.location.name)}
                  title={getFieldDataValue(currentWeather?.location.country)}
                />
              </Skeleton>
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <WeatherInformation
                  data={
                    currentWeather
                      ? scaleTemperature === ScaleTemperatureEnum.Celsius
                        ? getFieldDataString(
                            format.roundTemperature(
                              currentWeather?.current.temp_c!
                            )
                          )
                        : getFieldDataString(
                            format.roundTemperature(
                              currentWeather?.current.temp_f!
                            )
                          )
                      : "No Data"
                  }
                  title={"Temperature"}
                />
              </Skeleton>
            </div>
            <div className="flex flex-col gap-10">
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <WeatherInformation
                  data={
                    currentWeather
                      ? getFieldDataString(currentWeather?.current.humidity!)
                      : "No Data"
                  }
                  title={"Humidity"}
                />
              </Skeleton>
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <WeatherInformation
                  data={
                    currentWeather
                      ? getFieldDataString(currentWeather?.current.wind_kph!)
                      : "No Data"
                  }
                  title={"Wind Speed"}
                />
              </Skeleton>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
