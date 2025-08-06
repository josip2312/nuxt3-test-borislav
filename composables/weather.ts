import { ref } from "vue";

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherResponse {
  weather: WeatherCondition[];
  main: WeatherMain;
  name: string;
}

const weatherApiKey = "3978da9f7417a95247e8f31df0cf1f27";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEOCODE_URL = "https://api.openweathermap.org/geo/1.0/direct";
const LOCAL_STORAGE_KEY = "weatherData";
const LOCAL_GEOCODE_KEY = "geocodeCache";

export function useWeather() {
  const weather = ref<WeatherResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const city = ref("Basel");

  // Geocode cache in-memory and localStorage
  let geocodeCache: Record<string, { lat: number; lon: number }> = {};
  if (process.client) {
    const cachedGeo = localStorage.getItem(LOCAL_GEOCODE_KEY);
    if (cachedGeo) {
      try {
        geocodeCache = JSON.parse(cachedGeo);
      } catch (e) {
        // ignore
      }
    }
  }

  // Load from localStorage if available
  if (process.client) {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        weather.value = parsed.weather;
        city.value = parsed.city;
      } catch (e) {
        // ignore
      }
    }
  }

  async function geocodeCity(
    cityName: string
  ): Promise<{ lat: number; lon: number } | null> {
    if (geocodeCache[cityName]) {
      return geocodeCache[cityName];
    }
    const url = `${GEOCODE_URL}?q=${encodeURIComponent(
      cityName
    )}&limit=1&appid=${weatherApiKey}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0 && data[0].lat && data[0].lon) {
      const coords = { lat: data[0].lat, lon: data[0].lon };
      geocodeCache[cityName] = coords;
      if (process.client) {
        localStorage.setItem(LOCAL_GEOCODE_KEY, JSON.stringify(geocodeCache));
      }
      return coords;
    }
    return null;
  }

  async function fetchWeather(newCity?: string) {
    if (newCity) city.value = newCity;
    loading.value = true;
    error.value = null;
    try {
      // Artificial delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1200));
      let url = "";
      // Try geocoding first
      const coords = await geocodeCity(city.value);
      if (coords) {
        url = `${BASE_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${weatherApiKey}&units=metric`;
      } else {
        // fallback to city name
        url = `${BASE_URL}?q=${encodeURIComponent(
          city.value
        )}&appid=${weatherApiKey}&units=metric`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data: WeatherResponse = await res.json();
      weather.value = data;
      // Cache in localStorage
      if (process.client) {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ weather: data, city: city.value })
        );
      }
    } catch (e: any) {
      error.value = e.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  }

  // Fetch on first use if not already loaded
  if (!weather.value) {
    fetchWeather();
  }

  return {
    weather,
    loading,
    error,
    city,
    fetchWeather,
  };
}
