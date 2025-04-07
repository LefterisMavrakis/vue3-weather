<template>
  <div class="appDashboard">
    <div class="constraintPage">
      <template v-if="isLoading"> Forecast is loading </template>
      <template v-else>
        <div class="widgetsContainer flex column gap-4">
          <TemperatureWidget
            :temperature="averageTemperature"
            :unit="averageTemperatureUnit ?? '°C'"
            :weather_code="weatherCode ?? 0"
            :is_day="isDay === 1"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import useForecastStore from "@/stores/forecast";
import TemperatureWidget from "../temperatureWidget/TemperatureWidget.vue";

const forecastStore = useForecastStore();

const isLoading = computed(() => forecastStore.isForecastLoading);
const averageTemperature = computed(
  () => forecastStore.averageDailyTemperature
);
const averageTemperatureUnit = computed(
  () => forecastStore.averageDailyTemperatureUnit
);

const weatherCode = computed(() => forecastStore.currentWeatherCode);

const isDay = computed(
  () => forecastStore.forecastData?.current_weather.is_day
);

onMounted(() => {
  forecastStore.fetchForecast();
});
</script>

<style scoped>
.appDashboard {
  margin: 20px 0 0;
}
</style>
