<script setup lang="ts">
import WeatherCard from '~/components/WeatherCard.vue';
import { useWeather } from '~/composables/weather';
import { useRoute, useRouter } from '#app';
import { onMounted, watch } from 'vue';

const { weather, loading, error, city, fetchWeather } = useWeather();
const route = useRoute();
const router = useRouter();

const cities = [
  { name: 'Basel' },
  { name: 'Zurich' },
  { name: 'Geneva' },
];

// On mount, check for city in URL
onMounted(() => {
  const urlCity = route.query.city as string;
  if (urlCity && urlCity !== city.value) {
    fetchWeather(urlCity);
  }
});

// When city changes, update the URL
watch(city, (newCity) => {
  if (route.query.city !== newCity) {
    router.replace({ query: { ...route.query, city: newCity } });
  }
});

function handleCityClick(cName: string) {
  fetchWeather(cName);
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-blue-100 via-white to-blue-200 font-sans">
    <WeatherCard :weather="weather" :loading="loading" :error="error" :city="city" />
    <div class="mt-10 flex gap-4">
      <button
        v-for="c in cities"
        :key="c.name"
        @click="handleCityClick(c.name)"
        :class="[
          'px-4 py-2 rounded font-semibold shadow',
          city === c.name ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600',
          'transition-all duration-200 transform hover:scale-105 hover:bg-blue-500 hover:text-white',
        ]"
      >
        {{ c.name }}
      </button>
    </div>
  </div>
</template>
