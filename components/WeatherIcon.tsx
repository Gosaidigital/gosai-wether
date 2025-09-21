
import React from 'react';

const getIconPath = (condition: string) => {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) {
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />;
    }
    if (lowerCaseCondition.includes('cloud')) {
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15.595a8.966 8.966 0 013.303-6.505 8.966 8.966 0 0114.394 0 8.966 8.966 0 013.303 6.505A5.48 5.48 0 0118.5 21H5.5a5.48 5.48 0 01-2.197-5.405z" />;
    }
    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle') || lowerCaseCondition.includes('shower')) {
        return <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75c-3.48-1.5-6.5-4.48-6.5-8.25C5.5 5.26 8.26 3 11.5 3c2.28 0 4.23.98 5.5 2.5.58.68.82 1.51.82 2.5v.5a.5.5 0 0 1-1 0v-.5c0-.82-.2-1.5-.68-2.06C14.71 4.54 13.23 4 11.5 4 8.81 4 6.5 5.81 6.5 7.5c0 3.11 2.52 5.6 5.5 7.08V18a.5.5 0 0 1-1 0v-2.17l-.15-.07a.5.5 0 0 1 .3 0l.15.07V18a.5.5 0 0 1-1 0v-2.17a5.53 5.53 0 0 1-4.5-5.33c0-1.69 2.19-3 5.5-3s5.5 1.31 5.5 3c0 2.2-1.39 4.2-3.5 5.33V18a.5.5 0 0 1-1 0v-2.25z" />;
    }
    if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('sleet') || lowerCaseCondition.includes('ice')) {
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m-4-8h8m-8-4h8m-4 8l-4 4m8-8l4-4m-4-4l-4-4m8 8l4 4" />;
    }
     if (lowerCaseCondition.includes('storm') || lowerCaseCondition.includes('thunder')) {
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 10H6l5-9v6h5l-5 9v-6z" />;
    }
    if (lowerCaseCondition.includes('start')) {
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h1m8-9v1m8.828 8.828l-.707.707M12 21a9 9 0 110-18 9 9 0 010 18z" />;
    }
    // Default/fallback icon for mist, fog, etc.
    return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5" />;
}

interface WeatherIconProps {
  condition: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      {getIconPath(condition)}
    </svg>
  );
};
