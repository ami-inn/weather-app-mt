interface CardProps {
    icon: React.ElementType;
    label: string;
    percentage: number;
}

export interface WeatherData {
  location: string;
  date: string;
  currentTemp: number;
  currentRainfall: number;
  temperature: ChartData;
  rainfall: ChartData;
  soilTemperature: ChartData;
  soilMoisture: ChartData;
}

export interface ChartData {
  labels: string[];
  values: number[];
}

export type MetricType = 'temperature' | 'rainfall' | 'soilTemperature' | 'soilMoisture';

export interface WeatherCard {
  icon: any;
  label: string;
  percentage: number;
}