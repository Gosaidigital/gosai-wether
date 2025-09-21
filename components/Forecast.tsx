
import React from 'react';
import type { ForecastDay } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface ForecastDisplayProps {
  data: ForecastDay[];
  unit: 'C' | 'F';
}

const ForecastItem: React.FC<{ day: ForecastDay; unit: 'C' | 'F' }> = ({ day, unit }) => {
  const maxTemp = unit === 'C' ? day.maxTempC : day.maxTempF;
  const minTemp = unit === 'C' ? day.minTempC : day.minTempF;

  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-lg flex-1 text-center">
      <p className="font-semibold text-sm sm:text-base">{day.dayOfWeek}</p>
      <WeatherIcon condition={day.condition} className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />
      <div className="flex gap-2 text-sm sm:text-base">
        <span className="font-bold">{Math.round(maxTemp)}°</span>
        <span className="text-white/60">{Math.round(minTemp)}°</span>
      </div>
    </div>
  );
}

export const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ data, unit }) => {
  return (
    <section aria-labelledby="forecast-heading" className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg">
      <h2 id="forecast-heading" className="text-lg font-semibold mb-4">5-Day Forecast</h2>
      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        {data.map((day) => (
          <ForecastItem key={day.date} day={day} unit={unit} />
        ))}
      </div>
    </section>
  );
};
