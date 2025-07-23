'use client';

import React from 'react';
import { ChartData, MetricType } from '@/types';

interface SimpleChartProps {
  data: ChartData;
  metricType: MetricType;
}

const getMetricConfig = (type: MetricType) => {
  const configs = {
    temperature: { color: '#FF6B6B', unit: '°C', title: 'Temperature' },
    rainfall: { color: '#4ECDC4', unit: 'mm', title: 'Rainfall' },
    soilTemperature: { color: '#45B7D1', unit: '°C', title: 'Soil Temperature' },
    soilMoisture: { color: '#96CEB4', unit: '%', title: 'Soil Moisture' }
  };
  return configs[type];
};

const SimpleChart: React.FC<SimpleChartProps> = ({ data, metricType }) => {
  const config = getMetricConfig(metricType);
  
  if (!data || !data.labels || !data.values || data.labels.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        <div>No chart data available</div>
      </div>
    );
  }

  const width = 600;
  const height = 300;
  const padding = 50;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const minValue = Math.min(...data.values);
  const maxValue = Math.max(...data.values);
  const valueRange = maxValue - minValue || 1;

  const points = data.values.map((value, index) => {
    const x = padding + (index / (data.values.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;
    return { x, y, value, label: data.labels[index] };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <svg width={width} height={height} className="border border-gray-200 rounded-lg bg-white">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={`h-${i}`}
            x1={padding}
            y1={padding + (i * chartHeight) / 4}
            x2={padding + chartWidth}
            y2={padding + (i * chartHeight) / 4}
            stroke="#f0f0f0"
            strokeDasharray="2,2"
          />
        ))}
        
        {/* Chart line */}
        <path
          d={pathData}
          fill="none"
          stroke={config.color}
          strokeWidth="3"
          className="drop-shadow-sm"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill={config.color}
              stroke="white"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            {/* Labels */}
            <text
              x={point.x}
              y={height - 10}
              textAnchor="middle"
              fontSize="10"
              fill="#666"
            >
              {point.label}
            </text>
          </g>
        ))}
        
        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map(i => {
          const value = minValue + (i * valueRange) / 4;
          return (
            <text
              key={`y-${i}`}
              x={padding - 10}
              y={padding + chartHeight - (i * chartHeight) / 4 + 3}
              textAnchor="end"
              fontSize="10"
              fill="#666"
            >
              {value.toFixed(1)}
            </text>
          );
        })}
        
        {/* Title */}
        <text
          x={width / 2}
          y={20}
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill="#333"
        >
          {config.title} ({config.unit})
        </text>
      </svg>
    </div>
  );
};

export default SimpleChart;
