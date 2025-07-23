import { create } from 'zustand';
import { WeatherData, MetricType } from '@/types';

interface WeatherStore {
  weatherData: WeatherData | null;
  selectedMetric: MetricType;
  lastUpdated: Date | null;
  isLoading: boolean;
  setWeatherData: (data: WeatherData) => void;
  setSelectedMetric: (metric: MetricType) => void;
  setIsLoading: (loading: boolean) => void;
  setLastUpdated: (date: Date) => void;
}

// Mock data generator for development
const generateMockData = (): WeatherData => {
  const generateRandomValues = (baseValue: number, variance: number) => 
    Array.from({ length: 7 }, (_, i) => 
      Math.round((baseValue + (Math.random() - 0.5) * variance) * 100) / 100
    );

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  return {
    location: "Telluride, CO, USA",
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    currentTemp: Math.round((Math.random() * 30 + 5) * 10) / 10,
    currentRainfall: Math.round(Math.random() * 20 * 10) / 10,
    temperature: {
      labels: last7Days,
      values: generateRandomValues(15, 20)
    },
    rainfall: {
      labels: last7Days,
      values: generateRandomValues(5, 10)
    },
    soilTemperature: {
      labels: last7Days,
      values: generateRandomValues(12, 15)
    },
    soilMoisture: {
      labels: last7Days,
      values: generateRandomValues(45, 30)
    }
  };
};

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  selectedMetric: 'temperature',
  lastUpdated: null,
  isLoading: false,
  setWeatherData: (data) => set({ weatherData: data }),
  setSelectedMetric: (metric) => set({ selectedMetric: metric }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setLastUpdated: (date) => set({ lastUpdated: date }),
}));

// Mock data fetch function (can be replaced with real API call)
export const fetchWeatherData = async (): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  /* 
  // Real API implementation would look like this:
  
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Telluride,CO,US&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  
  // Process and return real data
  return processApiData(data);
  */
  
  // Return mock data for now
  return generateMockData();
};