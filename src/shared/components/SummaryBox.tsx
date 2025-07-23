'use client';

import React from 'react';
import { Thermometer, CloudRain, Calendar, MapPin } from 'lucide-react';

interface SummaryBoxProps {
  location: string;
  date: string;
  currentTemp: number;
  currentRainfall: number;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({
  location,
  date,
  currentTemp,
  currentRainfall
}) => {
  return (
    <div className="bg-gradient-to-br from-[#A6B1FE] to-[#7284FF] rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={16} />
        <span className="text-sm font-medium opacity-90">{location}</span>
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <Calendar size={16} />
        <span className="text-sm opacity-90">{date}</span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Current Temperature */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Thermometer size={20} />
          </div>
          <div>
            <div className="text-xs opacity-80 mb-1">Temperature</div>
            <div className="text-2xl font-bold">{currentTemp}°C</div>
          </div>
        </div>

        {/* Current Rainfall */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <CloudRain size={20} />
          </div>
          <div>
            <div className="text-xs opacity-80 mb-1">Rainfall</div>
            <div className="text-2xl font-bold">{currentRainfall}mm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBox;
