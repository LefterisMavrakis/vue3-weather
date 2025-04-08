<template>
  <div class="appDashboard">
    <div class="constraintPage">
      <template v-if="isLoading"> Forecast is loading </template>
      <template v-else>
        <div class="widgetsContainer flex column gap-4">
          <TimeSelect v-model="selectedTimePreset" />

          <TemperatureWidget
            :temperature="averageTemperature"
            :unit="averageTemperatureUnit ?? '°C'"
            :weather_code="weatherCode ?? 0"
            :is_day="isDay === 1"
          />

          <WeatherConditionsWidget
            :feels_like_temp="feelsLikeTemperature"
            :wind_speed="windSpeed"
            :wind_gust="windGust"
            :wind_direction="windDirection"
            :humidity="humidity"
            :pressure="pressure"
          />

          <WeeklyForecastLineChart />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import useForecastStore from "@/stores/forecast";
import TemperatureWidget from "../temperatureWidget/TemperatureWidget.vue";
import WeatherConditionsWidget from "../weatherConditionsWidget/WeatherConditionsWidget.vue";
import WeeklyForecastLineChart from "../weeklyForecastLineChart/WeeklyForecastLineChart.vue";
import TimeSelect from "../timeSelect/TimeSelect.vue";

const forecastStore = useForecastStore();

const isLoading = computed(() => forecastStore.isForecastLoading);
const averageTemperature = computed(() => {
  if (selectedTimePreset.value === "now") {
    return forecastStore.currentTemperature;
  }
  return forecastStore.averageDailyTemperature;
});
const averageTemperatureUnit = computed(
  () => forecastStore.averageDailyTemperatureUnit
);

const weatherCode = computed(() => {
  if (selectedTimePreset.value === "now") {
    return forecastStore.currentWeatherCode;
  }

  return forecastStore.averageDailyWeatherCode;
});

const feelsLikeTemperature = computed(() => {
  if (selectedTimePreset.value === "now") {
    return forecastStore.currentFeelsLikeTemperature;
  }

  return forecastStore.averageDailyFeelLikeTemperature;
});

const windSpeed = computed(() => {
  if (selectedTimePreset.value === "now") {
    return forecastStore.currentWindSpeed;
  }

  return forecastStore.maximumDailyWindSpeed;
});

const windDirection = computed(() => {
  if (selectedTimePreset.value === "now") {
    return forecastStore.currentWindDirection;
  }

  return forecastStore.dominantWindDirection;
});

const windGust = computed(() => {
  if (selectedTimePreset.value === "now") {
    return forecastStore.currentWindGust;
  }

  return forecastStore.maximumDailyWindGust;
});

const humidity = computed(() => {
  if (selectedTimePreset.value === "now") {
    return forecastStore.currentHumidity;
  }

  return forecastStore.maximumDailyHumidity;
});

const pressure = computed(() => {
  if (selectedTimePreset.value === "now") {
    return forecastStore.currentPressure;
  }

  return forecastStore.maximumDailyPressure;
});

const isDay = computed(
  () => forecastStore.forecastData?.current_weather.is_day
);

const selectedTimePreset = ref("now");

onMounted(() => {
  forecastStore.fetchForecast({
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
  });
});

watch(selectedTimePreset, (newValue) => {
  const isDatePreset = newValue !== "today" && newValue !== "now";

  forecastStore.fetchForecast({
    start_date: isDatePreset
      ? newValue
      : new Date().toISOString().split("T")[0],
    end_date: isDatePreset ? newValue : new Date().toISOString().split("T")[0],
  });
});
</script>

<style scoped>
.appDashboard {
  margin: 20px 0;
}
</style>
