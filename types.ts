
export interface CurrentWeather {
  locationName: string;
  temperatureC: number;
  temperatureF: number;
  condition: string;
  windKph: number;
  humidity: number;
  isDay: number;
}

export interface ForecastDay {
  date: string;
  dayOfWeek: string;
  maxTempC: number;
  maxTempF: number;
  minTempC: number;
  minTempF: number;
  condition: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
}
