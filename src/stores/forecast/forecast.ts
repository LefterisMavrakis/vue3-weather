import { ref, computed } from "vue";
import { defineStore } from "pinia";
import forecastAPI from "@/api/services/forecast";
import { ApiForecastResponse } from "@/api/services/forecast/types";
import { getAverageNumber, getMostFrequentNumber } from "@/utils/utils";

const useForecastStore = defineStore("forecast", () => {
  const isForecastLoading = ref(true);
  const forecastData = ref<ApiForecastResponse | null>(null);

  const averageDailyTemperature = computed(() => {
    if (!forecastData.value) {
      return 0;
    }

    return Math.round(
      getAverageNumber(forecastData.value.daily.temperature_2m_max)
    );
  });

  const averageDailyFeelLikeTemperature = computed(() => {
    if (!forecastData.value) return "0";

    return `${Math.round(
      getAverageNumber(forecastData.value.daily.apparent_temperature_max)
    )} ${forecastData.value?.daily_units.apparent_temperature_max}`;
  });

  const averageDailyTemperatureUnit = computed(
    () => forecastData.value?.daily_units.temperature_2m_max
  );

  const currentWeatherCode = computed(
    () => forecastData.value?.current_weather.weathercode
  );

  const maximumDailyWindSpeed = computed(() => {
    if (!forecastData.value) return "0";

    return `${Math.max(...forecastData.value.daily.wind_speed_10m_max)} ${
      forecastData.value.daily_units.wind_speed_10m_max
    }`;
  });

  const maximumDailyWindGust = computed(() => {
    if (!forecastData.value) return "0";

    return `${Math.max(...forecastData.value.daily.wind_gusts_10m_max)} ${
      forecastData.value.daily_units.wind_gusts_10m_max
    }`;
  });

  const dominantWindDirection = computed(() => {
    if (!forecastData.value) return "0";

    return `${getMostFrequentNumber(
      forecastData.value.daily.wind_direction_10m_dominant
    )} ${forecastData.value.daily_units.wind_direction_10m_dominant}`;
  });

  const maximumDailyHumidity = computed(() => {
    if (!forecastData.value) return "0";

    return `${Math.max(...forecastData.value.daily.relative_humidity_2m_max)} ${
      forecastData.value.daily_units.relative_humidity_2m_max
    }`;
  });

  const maximumDailyPressure = computed(() => {
    if (!forecastData.value) return "0";

    return `${Math.max(...forecastData.value.daily.pressure_msl_max)} ${
      forecastData.value.daily_units.pressure_msl_max
    }`;
  });

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
    averageDailyFeelLikeTemperature,
    maximumDailyWindSpeed,
    maximumDailyWindGust,
    dominantWindDirection,
    maximumDailyHumidity,
    maximumDailyPressure,
  };
});

export default useForecastStore;
