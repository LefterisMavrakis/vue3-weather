export type ApiForecastResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: CurrentWeatherUnits;
  current_weather: CurrentWeather;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
};

export type CurrentWeather = {
  time: string;
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;
};

export type CurrentWeatherUnits = {
  time: string;
  interval: string;
  temperature: string;
  windspeed: string;
  winddirection: string;
  is_day: string;
  weathercode: string;
};

export type Daily = {
  time: string[];
  temperature_2m_max: number[];
  apparent_temperature_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  wind_direction_10m_dominant: number[];
  relative_humidity_2m_max: number[];
  pressure_msl_max: number[];
};

export type DailyUnits = {
  time: string;
  temperature_2m_max: string;
  apparent_temperature_max: string;
  wind_speed_10m_max: string;
  wind_gusts_10m_max: string;
  wind_direction_10m_dominant: string;
  relative_humidity_2m_max: string;
  pressure_msl_max: string;
};

export type Hourly = {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  relative_humidity_2m: number[];
  pressure_msl: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
  wind_direction_10m: number[];
};

export type HourlyUnits = {
  time: string;
  temperature_2m: string;
  apparent_temperature: string;
  relative_humidity_2m: string;
  pressure_msl: string;
  wind_speed_10m: string;
  wind_gusts_10m: string;
  wind_direction_10m: string;
};
