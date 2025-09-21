
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(location);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full max-w-lg mx-auto">
      <div className="relative flex-grow">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city or zip code..."
            className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 backdrop-blur-sm"
            disabled={isLoading}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="