'use client';

import React from 'react';
import { Thermometer, CloudRain, Gauge, Droplets } from 'lucide-react';
import { MetricType } from '@/types';

interface MetricSelectorProps {
  selectedMetric: MetricType;
  onMetricChange: (metric: MetricType) => void;
}

const metrics = [
  {
    key: 'temperature' as MetricType,
    label: 'Temperature',
    icon: Thermometer,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  {
    key: 'rainfall' as MetricType,
    label: 'Rainfall',
    icon: CloudRain,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    key: 'soilTemperature' as MetricType,
    label: 'Soil Temp',
    icon: Gauge,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    key: 'soilMoisture' as MetricType,
    label: 'Soil Moisture',
    icon: Droplets,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
];

const MetricSelector: React.FC<MetricSelectorProps> = ({ selectedMetric, onMetricChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {metrics.map((metric) => {
        const isSelected = selectedMetric === metric.key;
        const Icon = metric.icon;
        
        return (
          <button
            key={metric.key}
            onClick={() => onMetricChange(metric.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
              isSelected
                ? `${metric.bgColor} ${metric.borderColor} border-2 ${metric.color} shadow-md`
                : 'bg-gray-50 border-2 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon size={16} />
            <span className="text-sm font-medium">{metric.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MetricSelector;
