'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ChartData, MetricType } from '@/types';

interface WeatherChartProps {
  data: ChartData;
  metricType: MetricType;
  isLoading?: boolean;
}

const getMetricConfig = (type: MetricType) => {
  const configs = {
    temperature: {
      color: '#FF6B6B',
      unit: '°C',
      title: 'Temperature',
    },
    rainfall: {
      color: '#4ECDC4',
      unit: 'mm',
      title: 'Rainfall',
    },
    soilTemperature: {
      color: '#45B7D1',
      unit: '°C',
      title: 'Soil Temperature',
    },
    soilMoisture: {
      color: '#96CEB4',
      unit: '%',
      title: 'Soil Moisture',
    }
  };
  return configs[type];
};

const WeatherChart: React.FC<WeatherChartProps> = ({ data, metricType, isLoading }) => {
  const config = getMetricConfig(metricType);
  
  // Transform data for chart
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index],
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        <div className="animate-pulse">Loading chart data...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        {metricType === 'rainfall' ? (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: any) => [`${value}${config.unit}`, config.title]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={config.color}
              fill={`${config.color}20`}
              strokeWidth={2}
            />
          </AreaChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: any) => [`${value}${config.unit}`, config.title]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={config.color}
              strokeWidth={3}
              dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: config.color, strokeWidth: 2 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
