import { ref, computed } from "vue";
import { defineStore } from "pinia";
import forecastAPI from "@/api/services/forecast";
import {
  ApiForecastAvailableRequestParams,
  ApiForecastResponse,
} from "@/api/services/forecast/types";

const useForecastStore = defineStore("forecast", () => {
  const isForecastLoading = ref(true);
  const forecastData = ref<ApiForecastResponse | null>(null);

  const currentTemperature = computed(() => {
    if (!forecastData.value) {
      return "0";
    }

    return `${forecastData.value.current_weather.temperature} ${forecastData.value.current_weather_units.temperature}`;
  });

  const currentWeatherCode = computed(
    () => forecastData.value?.current_weather.weathercode
  );

  const currentWindSpeed = computed(() => {
    if (!forecastData.value) return "0";

    return `${forecastData.value.current_weather.windspeed} ${forecastData.value.current_weather_units.windspeed}`;
  });

  const currentWindDirection = computed(() => {
    if (!forecastData.value) return "0";

    return `${forecastData.value.current_weather.winddirection} ${forecastData.value.current_weather_units.winddirection}`;
  });

  const currentFeelsLikeTemperature = computed(() => {
    if (!forecastData.value) {
      return "0";
    }
    const currentTime = forecastData.value.current_weather.time;
    const index = forecastData.value.minutely_15.time.indexOf(currentTime);
    const apparentTemp =
      forecastData.value.minutely_15.apparent_temperature[index];

    const apparentTempUnit =
      forecastData.value.minutely_15_units.apparent_temperature;

    return `${apparentTemp} ${apparentTempUnit}`;
  });

  const currentWindGust = computed(() => {
    if (!forecastData.value) {
      return "0";
    }
    const currentTime = forecastData.value.current_weather.time;
    const index = forecastData.value.minutely_15.time.indexOf(currentTime);
    const windGust = forecastData.value.minutely_15.wind_gusts_10m[index];

    const windGustUnit = forecastData.value.minutely_15_units.wind_gusts_10m;

    return `${windGust} ${windGustUnit}`;
  });

  const currentHumidity = computed(() => {
    if (!forecastData.value) {
      return "0";
    }
    const currentTime = forecastData.value.current_weather.time;
    const index = forecastData.value.minutely_15.time.indexOf(currentTime);
    const humidity = forecastData.value.minutely_15.relative_humidity_2m[index];

    const humidityUnits =
      forecastData.value.minutely_15_units.relative_humidity_2m;

    return `${humidity} ${humidityUnits}`;
  });

  const currentPressure = computed(() => {
    if (!forecastData.value) {
      return "0";
    }
    const currentTime = forecastData.value.current_weather.time;
    const index = forecastData.value.minutely_15.time.indexOf(currentTime);
    const pressure = forecastData.value.minutely_15.pressure_msl[index];

    const pressureUnits = forecastData.value.minutely_15_units.pressure_msl;

    return `${pressure} ${pressureUnits}`;
  });

  const averageDailyTemperature = computed(() => {
    if (!forecastData.value) {
      return "0";
    }

    const meanTemp = forecastData.value.daily.temperature_2m_mean?.[0];

    if (!meanTemp) {
      return "Not available";
    }

    return `${meanTemp.toFixed(1)} ${
      forecastData.value.daily_units.temperature_2m_mean
    }`;
  });

  const averageDailyWeatherCode = computed(() => {
    if (!forecastData.value) {
      return 0;
    }

    return forecastData.value.daily.weather_code?.[0];
  });

  const averageDailyFeelLikeTemperature = computed(() => {
    if (!forecastData.value) return "0";

    const meanFeelLikeTemp =
      forecastData.value.daily.apparent_temperature_mean?.[0];

    if (!meanFeelLikeTemp) {
      return "Not available";
    }

    return `${meanFeelLikeTemp.toFixed(1)} ${
      forecastData.value?.daily_units.apparent_temperature_mean
    }`;
  });

  const averageDailyTemperatureUnit = computed(
    () => forecastData.value?.daily_units.temperature_2m_max
  );

  const maximumDailyWindSpeed = computed(() => {
    if (!forecastData.value) return "0";

    const windspeed = forecastData.value.daily.wind_speed_10m_max[0];

    if (!windspeed) {
      return "Not available";
    }

    const windspeedUnit = forecastData.value.daily_units.wind_speed_10m_max;

    return `${windspeed} ${windspeedUnit}`;
  });

  const maximumDailyWindGust = computed(() => {
    if (!forecastData.value) return "0";

    const windGust = forecastData.value.daily.wind_gusts_10m_max[0];

    if (!windGust) {
      return "Not available";
    }

    const windGustUnit = forecastData.value.daily_units.wind_gusts_10m_max;

    return `${windGust} ${windGustUnit}`;
  });

  const dominantWindDirection = computed(() => {
    if (!forecastData.value) return "0";

    const windDirection =
      forecastData.value.daily.wind_direction_10m_dominant[0];

    if (!windDirection) {
      return "Not available";
    }

    const windDirectionUnit =
      forecastData.value.daily_units.wind_direction_10m_dominant;

    return `${windDirection} ${windDirectionUnit}`;
  });

  const maximumDailyHumidity = computed(() => {
    if (!forecastData.value) return "0";

    const humidity = forecastData.value.daily.relative_humidity_2m_max[0];

    if (!humidity) {
      return "Not available";
    }

    const humidityUnit =
      forecastData.value.daily_units.relative_humidity_2m_max;

    return `${humidity} ${humidityUnit}`;
  });

  const maximumDailyPressure = computed(() => {
    if (!forecastData.value) return "0";

    const pressure = forecastData.value.daily.pressure_msl_max[0];

    if (!pressure) {
      return "Not available";
    }

    const pressureUnit = forecastData.value.daily_units.pressure_msl_max;

    return `${pressure} ${pressureUnit}`;
  });

  const fetchForecast = async (params?: ApiForecastAvailableRequestParams) => {
    try {
      isForecastLoading.value = true;
      const result = await forecastAPI.getForecast(params);

      forecastData.value = result;
    } catch (err) {
      console.info(err);
    } finally {
      isForecastLoading.value = false;
    }
  };

  return {
    isForecastLoading,
    forecastData,
    fetchForecast,
    currentTemperature,
    currentWeatherCode,
    currentFeelsLikeTemperature,
    currentWindSpeed,
    currentWindDirection,
    currentWindGust,
    currentHumidity,
    currentPressure,
    averageDailyTemperature,
    averageDailyTemperatureUnit,
    averageDailyFeelLikeTemperature,
    averageDailyWeatherCode,
    maximumDailyWindSpeed,
    maximumDailyWindGust,
    dominantWindDirection,
    maximumDailyHumidity,
    maximumDailyPressure,
  };
});

export default useForecastStore;
