# 🌤️ Weather Widget

A simple, elegant, and responsive weather widget built with **Vue 3** and **TypeScript**.  
This widget fetches **real-time** and **forecasted weather data** from the <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo API</a> for the area of Thessaloniki, and displays key weather details, forecast info, and a 7-day max temperature line chart. You can view the app live <a href="https://scat-8ab57.web.app/" target="_blank" rel="noopener noreferrer">here</a>.

## 🛠️ Project Setup

### Clone the repo and jump to app folder

```
git clone https://github.com/LefterisMavrakis/vue3-weather.git
```

or with SSH

```
git clone git@github.com:LefterisMavrakis/vue3-weather.git
```

### Install dependencies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Runs unit tests

```
npm run test:unit
```

### Runs end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```

## 📦 Tech Stack

- **Vue 3**
- **TypeScript**
- **ApexCharts** (for chart rendering)
- **Jest** (for unit testing)
- **Open-Meteo API** (data provider)

---

## 🚀 Features

### 📅 Time preset selection

The widget offers three quick-access **preset buttons** including a **date picker** for flexible weather data viewing:

- **Now**: Displays real-time weather conditions using the `current_weather` object from the Open-Meteo API.  
  In cases where certain fields are missing from the `current_weather` response (e.g., `pressure_msl`), the widget uses the current time from `current_weather.time` to search within the `minutely_15` dataset and extract the missing values.
- **Today**: Aggregates and displays today’s forecast using the `daily` data, applying:
  - **Temperature** → average (temperature_2m_mean)
  - **Feels like temperature** → average (apparent_temperature_mean)
  - **Wind speed** → maximum (wind_speed_10m_max)
  - **Wind gust** → maximum (wind_gusts_10m_max)
  - **Wind direction** → dominant (wind_direction_10m_dominant)
  - **Humidity** → maximum (relative_humidity_2m_max)
  - **Surface pressure** → maximum (pressure_msl_max)
- **Custom Date Selection**: Via a **date input**, users can pick a future date (up to 15 days ahead). Upon selection:
  - Data is re-fetched from the API.
  - The same daily aggregations as above are applied to the selected date.

If the API returns `null` for any data (common for far-future or past dates), fallback labels like `Not available` are shown for better UX.

---

### 📈 Max Temperature Line Chart

- Displays **today** + **next 6 days** of **maximum temperatures**.
- **Unaffected** by the selected date in the main view.
- Built using **ApexCharts**.
- Y-axis: Temperature values  
  X-axis: Dates

---

## 🧪 Testing

- **Jest** is used for unit testing of components and logic.

---
