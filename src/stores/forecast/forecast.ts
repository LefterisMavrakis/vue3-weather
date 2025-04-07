import { ref } from "vue";
import { defineStore } from "pinia";
import forecastAPI from "@/api/services/forecast";
import { ApiForecastResponse } from "@/api/services/forecast/types";

const useForecastStore = defineStore("forecast", () => {
  const isForecastLoading = ref(true);
  const forecastData = ref<ApiForecastResponse | null>(null);

  const fetchForecast = async () => {
    try {
      const result = await forecastAPI.getForecast();

      forecastData.value = result;
    } catch (err) {
      console.log(err);
    } finally {
      isForecastLoading.value = false;
    }
  };

  return {
    isForecastLoading,
    forecastData,
    fetchForecast,
  };
});

export default useForecastStore;
