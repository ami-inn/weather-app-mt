'use client';

import { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useWeatherStore, fetchWeatherData, searchLocations } from '@/store/weather';

export const useWeatherData = () => {
  const { 
    weatherData, 
    setWeatherData, 
    setIsLoading, 
    setLastUpdated,
    isLoading,
    currentLocation
  } = useWeatherStore();

  const { data, isLoading: queryLoading, error, refetch } = useQuery({
    queryKey: ['weather', currentLocation],
    queryFn: () => fetchWeatherData(currentLocation),
    refetchInterval: 60 * 60 * 1000, 
    staleTime: 30 * 60 * 1000, 
    retry: 3,
  });

  useEffect(() => {
    setIsLoading(queryLoading);
  }, [queryLoading, setIsLoading]);

  useEffect(() => {
    if (data) {
      setWeatherData(data);
      setLastUpdated(new Date());
    }
  }, [data, setWeatherData, setLastUpdated]);

  const refreshWeatherData = () => {
    refetch();
  };

  return {
    weatherData,
    isLoading: queryLoading || isLoading,
    error,
    refreshWeatherData,
  };
};

export const useLocationSearch = () => {
  const { 
    searchResults, 
    setSearchResults, 
    isSearching, 
    setIsSearching,
    setCurrentLocation 
  } = useWeatherStore();

  const searchForLocations = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchLocations(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Location search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [setSearchResults, setIsSearching]);

  const selectLocation = useCallback((location: string) => {
    setCurrentLocation(location);
    setSearchResults([]);
  }, [setCurrentLocation, setSearchResults]);

  const clearSearchResults = useCallback(() => {
    setSearchResults([]);
  }, [setSearchResults]);

  return {
    searchResults,
    isSearching,
    searchForLocations,
    selectLocation,
    clearSearchResults,
  };
};
