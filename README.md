# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

### Welcome

The manager of the company thinks that the website homepage is boring.
Because he likes golfing in his free time, the designer has suggested
connecting the frontend to a weather API and pull the current weather
from an API and to display current general weather condition and
temperature on the website (the company is located in Basel,
Switzerland).

A colleague from the IT department has already kindly prepared the API
configuration in the store module of the web application. However, he
did not have time to finish the work before holiday. You are now asked
to complete the colleague's task. In particular, the store action needs
to be finished and called, data committed to the application state and
bind the state to the UI. As for displaying the current weather
conditions in the UI, the designer has not given any particular
instructions (you are free to design it). However, he thought that it
would be nice to have an icon to depict the current weather condition.

The company's Software Architect has given three key advices: he wants
to keep the application modular and thus work with components. He also
insists on using proper state management with Vuex. As for styling the
application, we should use tailwindCSS as much as possible so that we
can update the corporate design system anytime.

Some links to get you started with the API (OpenWeatherMap):

- [Fetching by city](https://openweathermap.org/api/geocoding-api){:target="\_blank"}

- [Weather condition icons](https://openweathermap.org/weather-conditions){:target="\_blank"}

### Bonus tasks

1. Handle the error and loading state of the API call. While loading, show a spinner. In case of an error, display an error message.

2. Store the weather data into local storage to reduce initial page load time. Retrieve data from local storage upon opening the web application and asynchronously overwrite it with the latest data from the API.
