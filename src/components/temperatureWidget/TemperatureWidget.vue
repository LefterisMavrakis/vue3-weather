<template>
  <div class="temperatureWidgetWrapper card">
    <div class="flex justify-between">
      <div class="temperatureValueWrapper flex column">
        <div class="temperatureValue text-xxl">
          {{ temperatureValue }}
        </div>

        <div class="temperatureLabel text-grey text-sm">
          {{ temperatureLabel }}
        </div>
      </div>

      <div class="temperatureImage">
        <img :src="temperatureImage" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { weatherIcons } from "@/api/services/forecast/constants/weatherIconsMapping";

type Props = {
  temperature: number;
  unit: string;
  weather_code: number;
  is_day: boolean;
};

const props = defineProps<Props>();

const temperatureValue = computed(() => `${props.temperature} ${props.unit}`);

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
}
</style>
