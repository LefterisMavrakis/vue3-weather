import { ref, computed } from "vue";
import { defineStore } from "pinia";
import forecastAPI from "@/api/services/forecast";
import { ApiForecastResponse } from "@/api/services/forecast/types";

const useForecastStore = defineStore("forecast", () => {
  const isForecastLoading = ref(true);
  const forecastData = ref<ApiForecastResponse | null>(null);

  const averageDailyTemperature = computed(() => {
    if (!forecastData.value) {
      return 0;
    }

    const dailyTemperaturesSummary =
      forecastData.value.daily.temperature_2m_max.reduce((acc, value) => {
        return acc + value;
      }, 0);

    const dailyTemperaturesAverage =
      dailyTemperaturesSummary /
      forecastData.value.daily.temperature_2m_max.length;

    return Math.round(dailyTemperaturesAverage);
  });

  const averageDailyTemperatureUnit = computed(
    () => forecastData.value?.daily_units.temperature_2m_max
  );

  const currentWeatherCode = computed(
    () => forecastData.value?.current_weather.weathercode
  );

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
    averageDailyTemperature,
    averageDailyTemperatureUnit,
    currentWeatherCode,
  };
});

export default useForecastStore;
