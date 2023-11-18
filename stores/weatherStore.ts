/*
 * Config for the OpenWeather API
 * @see https://openweathermap.org/
 */
const weatherApiKey = "3978da9f7417a95247e8f31df0cf1f27";
// eslint-disable-next-line
const weatherApiBaselUrl = `http://api.openweathermap.org/data/2.5/weather&appid=${weatherApiKey}`;

export const useWeatherStore = defineStore("weather", {
  state: () => {
    return {
      weather: "",
    };
  },

  actions: {
    // TODO: Fetch weather data
    // https://pinia.vuejs.org/core-concepts/actions.html
    // https://nuxt.com/docs/getting-started/data-fetching
    async fetchData() {},
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWeatherStore, import.meta.hot));
}
