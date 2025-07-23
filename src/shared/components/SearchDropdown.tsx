'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LucideSearch, MapPin, Loader2, X } from "lucide-react";
import { useLocationSearch } from '@/hooks/useWeatherData';

interface SearchDropdownProps {
  onLocationSelect?: (location: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    searchResults, 
    isSearching, 
    searchForLocations, 
    selectLocation, 
    clearSearchResults 
  } = useLocationSearch();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        clearSearchResults();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clearSearchResults]);

  // Debounced search with better state management
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim() && searchTerm.length >= 2) {
        searchForLocations(searchTerm);
        setIsOpen(true);
      } else {
        clearSearchResults();
        setIsOpen(false);
      }
    }, 500); // Increased debounce time

    return () => clearTimeout(timeoutId);
  }, [searchTerm]); 

  const handleLocationSelect = (location: string) => {
    selectLocation(location);
    setSearchTerm("");
    setIsOpen(false);
    clearSearchResults();
    onLocationSelect?.(location);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    

    if (value.length < 2) {
      clearSearchResults();
      setIsOpen(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsOpen(false);
    clearSearchResults();
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleLocationSelect(searchResults[0]);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => {
            if (searchResults.length > 0) setIsOpen(true);
          }}
          placeholder="Search location..."
          className="pl-4 pr-20 py-2.5 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-sm transition-all"
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          ) : (
            <button
              type="submit"
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <LucideSearch className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {isSearching && (
            <div className="px-4 py-3 text-center text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              Searching locations...
            </div>
          )}
          
          {!isSearching && searchResults.length === 0 && searchTerm && (
            <div className="px-4 py-3 text-center text-gray-500">
              No locations found for "{searchTerm}"
            </div>
          )}
          
          {!isSearching && searchResults.length > 0 && (
            <>
              {searchResults.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">{location}</span>
                </button>
              ))}
              
              <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100">
                {searchResults.length} location{searchResults.length !== 1 ? 's' : ''} found
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
