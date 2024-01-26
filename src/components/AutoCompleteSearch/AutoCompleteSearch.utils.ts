import { City } from "@/interfaces/weather.interface";
import { AsyncListData } from "@react-stately/data";

export interface AutoCompleteSearchProps {
  setSelectedCity: (_selectedCity?: City | undefined) => void;
}
