'use client';

import React, { useState, useEffect } from 'react';
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
import SimpleChart from './SimpleChart';

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
  const [useSimpleChart, setUseSimpleChart] = useState(false);
  const [hasError, setHasError] = useState(false);
  const config = getMetricConfig(metricType);
  
 
  useEffect(() => {
    setHasError(false);
  }, [data, metricType]);
  
 
  if (!data) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        <div className="text-center">
          <div className="text-lg mb-2">No data available</div>
          <div className="text-sm">Please try refreshing the page</div>
        </div>
      </div>
    );
  }

  if (!data.labels || !data.values || !Array.isArray(data.labels) || !Array.isArray(data.values)) {
    console.error('Invalid data structure:', data);
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        <div className="text-center">
          <div className="text-lg mb-2">Invalid Data Structure</div>
          <div className="text-sm">Chart data format is incorrect</div>
        </div>
      </div>
    );
  }

  if (data.labels.length !== data.values.length || data.labels.length === 0) {
    console.error('Data mismatch or empty:', { 
      labels: data.labels.length, 
      values: data.values.length,
      labelsData: data.labels,
      valuesData: data.values
    });
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        <div className="text-center">
          <div className="text-lg mb-2">Data Error</div>
          <div className="text-sm">
            Labels: {data.labels.length}, Values: {data.values.length}
          </div>
        </div>
      </div>
    );
  }
  

  const chartData = data.labels.map((label, index) => {
    const value = data.values[index];
    return {
      name: label || `Day ${index + 1}`,
      value: typeof value === 'number' && !isNaN(value) ? value : 0,
    };
  }).filter(item => item.name);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <div className="text-sm">Loading {config.title.toLowerCase()} data...</div>
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        <div className="text-center">
          <div className="text-lg mb-2">No Chart Data</div>
          <div className="text-sm">Unable to process {config.title.toLowerCase()} data</div>
        </div>
      </div>
    );
  }


  if (hasError || useSimpleChart) {
    return (
      <div className="w-full">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => {
              setUseSimpleChart(false);
              setHasError(false);
            }}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Switch to Advanced Chart
          </button>
        </div>
        <SimpleChart data={data} metricType={metricType} />
      </div>
    );
  }


  try {
    return (
      <div className="w-full">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setUseSimpleChart(true)}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            Switch to Simple Chart
          </button>
        </div>
        <div className="w-full h-[300px] relative">
          <ResponsiveContainer width="100%" height="100%">
            {metricType === 'rainfall' ? (
              <AreaChart 
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#ccc' }}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#ccc' }}
                  axisLine={{ stroke: '#ccc' }}
                  domain={['dataMin', 'dataMax']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: any) => {
                    const numValue = Number(value);
                    return [`${numValue.toFixed(1)}${config.unit}`, config.title];
                  }}
                  labelStyle={{ color: '#333', fontWeight: 500 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={config.color}
                  fill={`${config.color}30`}
                  strokeWidth={2}
                  fillOpacity={0.6}
                />
              </AreaChart>
            ) : (
              <LineChart 
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#ccc' }}
                  axisLine={{ stroke: '#ccc' }}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#ccc' }}
                  axisLine={{ stroke: '#ccc' }}
                  domain={['dataMin', 'dataMax']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: any) => {
                    const numValue = Number(value);
                    return [`${numValue.toFixed(1)}${config.unit}`, config.title];
                  }}
                  labelStyle={{ color: '#333', fontWeight: 500 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={config.color}
                  strokeWidth={3}
                  dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: config.color, strokeWidth: 2, fill: '#fff' }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Recharts rendering error:', error);
    setHasError(true);

    return (
      <div className="w-full">
        <div className="text-xs text-amber-600 mb-2 p-2 bg-amber-50 rounded">
          Advanced chart failed to load. Using simple chart as fallback.
        </div>
        <SimpleChart data={data} metricType={metricType} />
      </div>
    );
  }
};

export default WeatherChart;
