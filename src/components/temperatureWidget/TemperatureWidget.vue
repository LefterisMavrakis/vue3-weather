<template>
  <div class="temperatureWidgetWrapper card">
    <div class="flex justify-between">
      <div class="temperatureValueWrapper flex column gap-1 justify-start">
        <div v-if="!isLoading" class="temperatureValue text-xxl">
          {{ temperatureValue }}
        </div>
        <div v-else class="skeleton" style="height: 55px; width: 100px"></div>

        <div v-if="!isLoading" class="temperatureLabel text-grey text-sm">
          {{ temperatureLabel }}
        </div>
        <div v-else class="skeleton" style="height: 20px; width: 70px"></div>
      </div>

      <div v-if="!isLoading" class="temperatureImage">
        <img :src="temperatureImage" alt="" />
      </div>
      <div v-else class="skeleton" style="height: 100px; width: 100px"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, inject } from "vue";
import { weatherIcons } from "@/api/services/forecast/constants/weatherIconsMapping";

type Props = {
  temperature: string;
  weather_code: number;
  is_day: boolean;
};

const props = defineProps<Props>();

const isLoading = inject("loading");

const temperatureValue = computed(() => `${props.temperature}`);

const temperatureLabel = computed(() => {
  if (props.is_day) {
    return (
      weatherIcons[props.weather_code]?.day.description ??
      weatherIcons["0"].day.description
    );
  }

  return (
    weatherIcons[props.weather_code]?.night.description ??
    weatherIcons["0"].day.description
  );
});

const temperatureImage = computed(() => {
  if (props.is_day) {
    return (
      weatherIcons[props.weather_code]?.day.image ?? weatherIcons["0"].day.image
    );
  }

  return (
    weatherIcons[props.weather_code]?.night.image ??
    weatherIcons["0"].night.image
  );
});
</script>
<style scoped>
.temperatureWidgetWrapper {
  padding: 20px;
  border-bottom: 5px solid var(--muted-bg);
}
</style>
