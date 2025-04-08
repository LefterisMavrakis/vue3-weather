<template>
  <div class="weatherConditionsWrapper card flex gap-3">
    <div
      class="weatherInfo nested-card flex column gap-2 justify-start horizontal-center"
      v-for="(section, index) in sections"
      :key="index"
    >
      <div class="value text-md">
        {{ section.value }}
      </div>
      <div class="label text-sm">{{ section.label }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";

type Props = {
  feels_like_temp: string;
  wind_speed: string;
  wind_gust: string;
  wind_direction: string;
  humidity: string;
  pressure: string;
};

const props = defineProps<Props>();

const sections = computed(() => {
  return [
    {
      value: props.feels_like_temp,
      label: "Feels like",
    },
    {
      value: props.wind_speed,
      label: "Wind",
    },
    {
      value: props.wind_gust,
      label: "Wind Gust",
    },
    {
      value: props.wind_direction,
      label: "Wind Deg",
    },
    {
      value: props.humidity,
      label: "Humidity",
    },
    {
      value: props.pressure,
      label: "Pressure",
    },
  ];
});
</script>
<style scoped>
.weatherInfo {
  flex: 1 1 calc((100% - 24px) / 3);
  min-height: 150px;
}

@media (max-width: 600px) {
  .weatherInfo {
    flex: 1 1 calc((100% - 24px) / 2);
    min-height: 150px;
  }
}

@media (max-width: 400px) {
  .weatherInfo {
    flex: 1 1 calc((100% - 24px));
    min-height: 150px;
  }
}
</style>
