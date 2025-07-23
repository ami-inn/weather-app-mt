import React from "react";

interface CardProps {
  icon: React.ElementType;
  label: string;
  percentage: number;
  unit?: string;
}

const Card: React.FC<CardProps> = ({ icon: Icon, label, percentage, unit = "%" }) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-3 rounded-full bg-blue-50">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
        <div className="text-xl font-bold text-gray-800">
          {percentage}{unit}
        </div>
      </div>
    </div>
  );
};

export default Card;
