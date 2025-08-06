<template>
  <div class="flex justify-center items-center min-h-[250px]">
    <div class="w-full max-w-sm bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-white/40">
      <template v-if="loading">
        <svg class="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <div class="text-gray-500 text-lg font-medium">Loading weather...</div>
      </template>
      <template v-else-if="error">
        <div class="text-red-500 font-semibold text-lg">{{ error }}</div>
      </template>
      <template v-else-if="weather">
        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5" fill="currentColor"/></svg>
            <span class="text-xl font-bold tracking-wide text-gray-800">{{ city }}</span>
          </div>
          <div class="mb-2">
            <img
              v-if="weather.weather && weather.weather[0]"
              :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
              :alt="weather.weather[0].description"
              class="w-20 h-20"
            />
          </div>
          <div class="text-4xl font-extrabold text-gray-900 mb-1">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="capitalize text-gray-700 text-lg tracking-wide">{{ weather.weather[0].description }}</div>
        </div>
      </template>
      <template v-else>
        <div class="text-gray-400">No weather data.</div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherResponse } from '~/composables/weather';
import { defineProps } from 'vue';

defineProps<{
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  city: string;
}>();
</script>