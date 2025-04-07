<template>
  <div>
    <span>i'm the dash board</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useForecastStore from "@/stores/forecast";

const { fetchForecast, forecastData, isForecastLoading } = useForecastStore();

onMounted(() => {
  fetchForecast();
});
</script>
