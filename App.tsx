
import React, { useState, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherDisplay } from './components/CurrentWeather';
import { ForecastDisplay } from './components/Forecast';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';
import { fetchWeatherData } from './services/geminiService';
import type { WeatherData } from './types';
import { WeatherIcon } from './components/WeatherIcon';

type TempUnit = 'C' | 'F';

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TempUnit>('C');

  const handleSearch = useCallback(async (location: string) => {
    if (!location) return;
    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wider text-shadow">
            Gosai Weather
          </h1>
          {weatherData && (
             <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 cursor-pointer">
                <button onClick={() => setUnit('C')} className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${unit === 'C' ? 'bg-blue-500' : 'text-white/70'}`}>°C</button>
                <button onClick={() => setUnit('F')} className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${unit === 'F' ? 'bg-blue-500' : 'text-white/70'}`}>°F</button>
            </div>
          )}
        </header>
        
        <main className="w-full">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <div className="mt-8">
            {isLoading && <Loader />}
            {error && <ErrorDisplay message={error} />}
            {!isLoading && !error && !weatherData && (
              <div className="text-center py-16 px-4 bg-white/5 backdrop-blur-md rounded-xl">
                <WeatherIcon condition="start" className="w-24 h-24 mx-auto text-blue-300" />
                <h2 className="text-2xl font-semibold mt-4">Welcome to Gosai Weather</h2>
                <p className="text-white/70 mt-2 max-w-md mx-auto">Enter a city name or zip code above to get the latest weather forecast powered by Gemini.</p>
              </div>
            )}
            {weatherData && (
              <div className="grid grid-cols-1 gap-8">
                <CurrentWeatherDisplay data={weatherData.current} unit={unit} />
                <ForecastDisplay data={weatherData.forecast} unit={unit} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
