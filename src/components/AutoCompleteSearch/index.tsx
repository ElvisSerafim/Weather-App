import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React from "react";
import { AutoCompleteSearchProps } from "./AutoCompleteSearch.utils";
import { SearchIcon } from "../../assets/SearchIcon";
import { City } from "@/interfaces/weather.interface";
import useCitySearch from "@/hooks/useCitySearch";

export default function AutoCompleteSearch({
  setSelectedCity,
}: AutoCompleteSearchProps) {
  const searchObjectResponse = useCitySearch();

  return (
    <Autocomplete
      isClearable
      radius="lg"
      label="Search"
      onKeyDown={(e) => e.continuePropagation()}
      onClear={() => searchObjectResponse.setFilterText("")}
      inputProps={{
        classNames: {
          input: [
            "bg-transparent",
            "min-w-full",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        },
      }}
      allowsCustomValue={true}
      inputValue={searchObjectResponse.filterText}
      isLoading={searchObjectResponse.isLoading}
      items={searchObjectResponse.items}
      onInputChange={searchObjectResponse.setFilterText}
      onSelectionChange={(key) =>
        setSelectedCity(
          searchObjectResponse.items.find((item) => item.id == key)
        )
      }
      allowsEmptyCollection={false}
      placeholder="Search for city name..."
      startContent={
        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      }
    >
      {(city: City) => (
        <AutocompleteItem key={city.id}>{city.name}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
