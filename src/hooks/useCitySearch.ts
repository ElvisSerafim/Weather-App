import { City } from "@/interfaces/weather.interface";
import { AsyncListLoadOptions, useAsyncList } from "@react-stately/data";
import weatherService from "@/services/weather.service";

function useCitySearch() {
  return useAsyncList<City, string>({
    load: async ({
      filterText,
    }: AsyncListLoadOptions<City, string>): Promise<{ items: City[] }> => {
      if (!filterText || filterText.length === 0) {
        return { items: [] };
      }

      const data = await weatherService.getCitiesBySearch(filterText);
      return {
        items: data,
      };
    },
  });
}

export default useCitySearch;
