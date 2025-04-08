<template>
  <div class="weeklyForecastLineChart card flex column gap-3 justify-start">
    <div class="text-sm text-strong">Weekly Variation</div>
    <template v-if="isLoading">
      <div class="chart-skeleton">Chart Loading...</div>
    </template>
    <template v-else>
      <div class="chartContainer full-width">
        <VueApexCharts
          width="100%"
          type="line"
          :options="chartOptions"
          :series="chartSeries"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import forecastAPI from "@/api/services/forecast";
import {
  ApiForecastAvailableRequestParams,
  ApiForecastResponse,
} from "@/api/services/forecast/types";
import { formatToDayMonth } from "@/utils/utils";

type Props = {
  forecast_days?: ApiForecastAvailableRequestParams["forecast_days"];
};

const props = defineProps<Props>();

const isLoading = ref(true);
const openMeteoData = ref<ApiForecastResponse | null>(null);

const chartOptions = computed(() => {
  if (!openMeteoData.value) return [];
  return {
    chart: {
      id: "weekly-temp-chart",
    },
    xaxis: {
      categories: openMeteoData.value.daily.time.map((time) =>
        formatToDayMonth(time)
      ),
    },
  };
});

const chartSeries = computed(() => {
  return [
    {
      name: "Temperature",
      data: openMeteoData.value?.daily.temperature_2m_max.map((temp) => temp),
    },
  ];
});

const fetchWeeklyForecast = async () => {
  try {
    const result = await forecastAPI.getForecast({
      forecast_days: props.forecast_days ?? 7,
    });

    openMeteoData.value = result;
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchWeeklyForecast();
});
</script>
