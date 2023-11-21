/*
 * Config for the OpenWeather API
 * @see https://openweathermap.org/
 */
const weatherApiKey = "3978da9f7417a95247e8f31df0cf1f27";
// TODO: Add the location to this url
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const weatherApiBaselUrl = `http://api.openweathermap.org/data/2.5/weather?q=&appid=${weatherApiKey}`;

export const useWeather = async () => {
  // https://pinia.vuejs.org/core-concepts/actions.html
  // https://nuxt.com/docs/getting-started/data-fetching
  // TODO: Fetch weather data
};
