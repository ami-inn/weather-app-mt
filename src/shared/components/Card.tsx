import React from "react";

const Card: React.FC<CardProps> = ({ icon: Icon, label, percentage }) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-4">
      <Icon className="w-14 h-14 text-primary" />
      <div>
        <span className="text-lg font-semibold">{label}</span>
        <div className="text-xl font-bold text-gray-800">{percentage}%</div>
      </div>
    </div>
  );
};

export default Card;
