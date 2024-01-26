import React from "react";
import { Switch } from "@nextui-org/react";
import { SwitchTemperatureScaleProps } from "./SwitchTemperatureScale.utils";

export default function SwitchTemperatureScale({
  isSelectedCelsius,
  setIsSelectedCelsius,
}: SwitchTemperatureScaleProps) {
  return (
    <Switch
      size="lg"
      color="danger"
      isSelected={isSelectedCelsius}
      onValueChange={(isSelectedValue) => setIsSelectedCelsius(isSelectedValue)}
      startContent={<h1>C°</h1>}
      endContent={<h1>F°</h1>}
    ></Switch>
  );
}
