import { create } from 'zustand';
import { WeatherData, MetricType } from '@/types';

interface WeatherStore {
  weatherData: WeatherData | null;
  selectedMetric: MetricType;
  lastUpdated: Date | null;
  isLoading: boolean;
  currentLocation: string;
  searchResults: string[];
  isSearching: boolean;
  setWeatherData: (data: WeatherData) => void;
  setSelectedMetric: (metric: MetricType) => void;
  setIsLoading: (loading: boolean) => void;
  setLastUpdated: (date: Date) => void;
  setCurrentLocation: (location: string) => void;
  setSearchResults: (results: string[]) => void;
  setIsSearching: (searching: boolean) => void;
}

// Mock data generator for development
const generateMockData = (location: string = "Telluride, CO, USA"): WeatherData => {
  const generateRandomValues = (baseValue: number, variance: number, minValue: number = 0) => {
    return Array.from({ length: 7 }, (_, i) => {
      const randomValue = baseValue + (Math.random() - 0.5) * variance;
      const value = Math.max(minValue, randomValue);
      return Math.round(value * 100) / 100;
    });
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  // Different base values for different locations
  const locationData = getLocationBaseData(location);

  return {
    location,
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    currentTemp: Math.round((locationData.baseTemp + (Math.random() - 0.5) * 8) * 10) / 10,
    currentRainfall: Math.round((locationData.baseRainfall + Math.random() * 3) * 10) / 10,
    temperature: {
      labels: last7Days,
      values: generateRandomValues(locationData.baseTemp, 12, -40)
    },
    rainfall: {
      labels: last7Days,
      values: generateRandomValues(locationData.baseRainfall, 6, 0)
    },
    soilTemperature: {
      labels: last7Days,
      values: generateRandomValues(locationData.baseTemp - 2, 8, -50)
    },
    soilMoisture: {
      labels: last7Days,
      values: generateRandomValues(locationData.baseMoisture, 20, 0)
    }
  };
};

// Helper function to get base data for different locations
const getLocationBaseData = (location: string) => {
  const locationLower = location.toLowerCase();
  
  if (locationLower.includes('miami') || locationLower.includes('florida')) {
    return { baseTemp: 28, baseRainfall: 12, baseMoisture: 65 };
  } else if (locationLower.includes('alaska') || locationLower.includes('fairbanks')) {
    return { baseTemp: -15, baseRainfall: 2, baseMoisture: 35 };
  } else if (locationLower.includes('seattle') || locationLower.includes('washington')) {
    return { baseTemp: 12, baseRainfall: 15, baseMoisture: 70 };
  } else if (locationLower.includes('phoenix') || locationLower.includes('arizona')) {
    return { baseTemp: 35, baseRainfall: 1, baseMoisture: 25 };
  } else if (locationLower.includes('new york') || locationLower.includes('nyc')) {
    return { baseTemp: 18, baseRainfall: 8, baseMoisture: 55 };
  } else if (locationLower.includes('london') || locationLower.includes('uk')) {
    return { baseTemp: 11, baseRainfall: 10, baseMoisture: 75 };
  } else if (locationLower.includes('tokyo') || locationLower.includes('japan')) {
    return { baseTemp: 22, baseRainfall: 9, baseMoisture: 60 };
  } else {
    // Default values for Telluride or unknown locations
    return { baseTemp: 15, baseRainfall: 5, baseMoisture: 45 };
  }
};

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  selectedMetric: 'temperature',
  lastUpdated: null,
  isLoading: false,
  currentLocation: "Telluride, CO, USA",
  searchResults: [],
  isSearching: false,
  setWeatherData: (data) => set({ weatherData: data }),
  setSelectedMetric: (metric) => set({ selectedMetric: metric }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setLastUpdated: (date) => set({ lastUpdated: date }),
  setCurrentLocation: (location) => set({ currentLocation: location }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (searching) => set({ isSearching: searching }),
}));

// Mock data fetch function (can be replaced with real API call)
export const fetchWeatherData = async (location?: string): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const targetLocation = location || "Telluride, CO, USA";
  
  /* 
  // Real API implementation would look like this:
  
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const locationParam = targetLocation;
  
  try {
    // Current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationParam}&appid=${API_KEY}&units=metric`
    );
    const currentData = await currentResponse.json();
    
    // Historical data (would need different API endpoint)
    const historicalResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&dt=${Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60}&appid=${API_KEY}&units=metric`
    );
    const historicalData = await historicalResponse.json();
    
    // Process and return real data
    return processApiData(currentData, historicalData);
  } catch (error) {
    console.error('Weather API error:', error);
    // Fallback to mock data
    return generateMockData(targetLocation);
  }
  */
  
  // Return mock data for now
  try {
    const data = generateMockData(targetLocation);
    
    // Validate data before returning
    if (!data.temperature?.labels || !data.temperature?.values || 
        data.temperature.labels.length !== data.temperature.values.length) {
      throw new Error('Invalid temperature data generated');
    }
    
    if (!data.rainfall?.labels || !data.rainfall?.values || 
        data.rainfall.labels.length !== data.rainfall.values.length) {
      throw new Error('Invalid rainfall data generated');
    }
    
    if (!data.soilTemperature?.labels || !data.soilTemperature?.values || 
        data.soilTemperature.labels.length !== data.soilTemperature.values.length) {
      throw new Error('Invalid soil temperature data generated');
    }
    
    if (!data.soilMoisture?.labels || !data.soilMoisture?.values || 
        data.soilMoisture.labels.length !== data.soilMoisture.values.length) {
      throw new Error('Invalid soil moisture data generated');
    }
    
    return data;
  } catch (error) {
    console.error('Data generation error:', error);
    // Return fallback data with guaranteed structure
    return {
      location: targetLocation,
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      currentTemp: 15,
      currentRainfall: 5,
      temperature: {
        labels: ['Jan 17', 'Jan 18', 'Jan 19', 'Jan 20', 'Jan 21', 'Jan 22', 'Jan 23'],
        values: [12, 15, 18, 16, 14, 17, 19]
      },
      rainfall: {
        labels: ['Jan 17', 'Jan 18', 'Jan 19', 'Jan 20', 'Jan 21', 'Jan 22', 'Jan 23'],
        values: [2, 5, 3, 7, 4, 6, 2]
      },
      soilTemperature: {
        labels: ['Jan 17', 'Jan 18', 'Jan 19', 'Jan 20', 'Jan 21', 'Jan 22', 'Jan 23'],
        values: [10, 13, 16, 14, 12, 15, 17]
      },
      soilMoisture: {
        labels: ['Jan 17', 'Jan 18', 'Jan 19', 'Jan 20', 'Jan 21', 'Jan 22', 'Jan 23'],
        values: [45, 50, 48, 55, 52, 47, 49]
      }
    };
  }
};

// Location search function
export const searchLocations = async (query: string): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (!query || query.length < 2) {
    return [];
  }
  
  /* 
  // Real API implementation would look like this:
  
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    const data = await response.json();
    
    return data.map((location: any) => 
      `${location.name}, ${location.state ? location.state + ', ' : ''}${location.country}`
    );
  } catch (error) {
    console.error('Location search error:', error);
    return getMockLocations(query);
  }
  */
  
  // Return mock suggestions for now
  return getMockLocations(query);
};

// Mock location suggestions
const getMockLocations = (query: string): string[] => {
  const allLocations = [
    "New York, NY, USA",
    "Los Angeles, CA, USA", 
    "Chicago, IL, USA",
    "Miami, FL, USA",
    "Phoenix, AZ, USA",
    "Seattle, WA, USA",
    "Boston, MA, USA",
    "Denver, CO, USA",
    "Las Vegas, NV, USA",
    "San Francisco, CA, USA",
    "London, UK",
    "Paris, France",
    "Tokyo, Japan",
    "Sydney, Australia",
    "Toronto, Canada",
    "Berlin, Germany",
    "Rome, Italy",
    "Barcelona, Spain",
    "Amsterdam, Netherlands",
    "Dubai, UAE",
    "Singapore",
    "Hong Kong",
    "Mumbai, India",
    "São Paulo, Brazil",
    "Mexico City, Mexico",
    "Telluride, CO, USA"
  ];
  
  if (!query || query.length < 2) return [];
  
  return allLocations
    .filter(location => 
      location.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);
};