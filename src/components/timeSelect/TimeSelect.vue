<template>
  <div class="timePresetSelect card flex gap-3">
    <button
      class="nowBtn"
      :class="{ activeOption: activeOption === 'now' }"
      @click="setActive('now')"
      aria-label="Select now as time preset"
    >
      Now
    </button>

    <button
      class="todayBtn"
      :class="{ activeOption: activeOption === 'today' }"
      @click="setActive('today')"
      aria-label="Select today as time preset"
    >
      Today
    </button>

    <input
      class="dateInput"
      :class="{ activeOption: activeOption === 'date' }"
      type="date"
      :max="formattedMaxDate"
      v-model="selectedDate"
      @change="handleDateChange"
      placeholder="Select Date"
      aria-label="Select date"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";

type Props = {
  modelValue: "now" | "today" | string;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: "now" | "today" | string): void;
}>();

const activeOption = ref<"now" | "today" | "date" | string | null>(
  props.modelValue
);
const selectedDate = ref("");

const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 15);
const formattedMaxDate = maxDate.toISOString().split("T")[0];

const setActive = (option: "now" | "today") => {
  activeOption.value = option;
  emit("update:modelValue", option);
};

const handleDateChange = () => {
  if (selectedDate.value) {
    activeOption.value = "date";
    emit("update:modelValue", selectedDate.value);
  }
};
</script>

<style scoped lang="scss">
.timePresetSelect {
  padding-top: 10px;
  padding-bottom: 0;
}
button {
  padding: 0.5rem 1rem;
  background-color: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #e7f3dd;

  &.activeOption {
    background-color: #e7f3dd;
  }
}

input[type="date"] {
  padding: 0.5rem;
}

button,
input {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius-1);
  background-color: #eee;
}

.activeOption {
  border: 1px solid rgb(14, 190, 14);
  background-color: #e7f3dd;
  color: #2e6002;
}
</style>
