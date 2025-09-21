
import React from 'react';
import type { CurrentWeather } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherDisplayProps {
  data: CurrentWeather;
  unit: 'C' | 'F';
}

const InfoPill: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex flex-col items-center justify-center bg-white/10 rounded-full px-4 py-2">
        <span className="text-xs text-white/70">{label}</span>
        <span className="text-lg font-bold">{value}</span>
    </div>
);


export const CurrentWeatherDisplay: React.FC<CurrentWeatherDisplayProps> = ({ data, unit }) => {
  const temperature = unit === 'C' ? data.temperatureC : data.temperatureF;
  
  return (
    <section aria-labelledby="current-weather-heading" className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg">
      <h2 id="current-weather-heading" className="sr-only">Current Weather</h2>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <WeatherIcon condition={data.condition} className="w-20 h-20 text-yellow-300" />
          <div>
            <p className="text-lg text-white/80">{data.locationName}</p>
            <p className="text-5xl font-bold">{Math.round(temperature)}°{unit}</p>
            <p className="text-lg capitalize text-white/90">{data.condition}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <InfoPill label="Wind" value={`${data.windKph} kph`} />
            <InfoPill label="Humidity" value={`${data.humidity}%`} />
        </div>
      </div>
    </section>
  );
};
