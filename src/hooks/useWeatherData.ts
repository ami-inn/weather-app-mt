'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useWeatherStore, fetchWeatherData } from '@/store/weather';

export const useWeatherData = () => {
  const { 
    weatherData, 
    setWeatherData, 
    setIsLoading, 
    setLastUpdated,
    isLoading 
  } = useWeatherStore();

  const { data, isLoading: queryLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
    refetchInterval: 60 * 60 * 1000, // Refetch every hour (3600000 ms)
    staleTime: 30 * 60 * 1000, // Consider data stale after 30 minutes
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

  return {
    weatherData,
    isLoading: queryLoading || isLoading,
    error,
  };
};
