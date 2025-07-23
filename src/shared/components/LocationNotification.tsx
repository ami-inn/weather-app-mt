'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, CheckCircle, X } from 'lucide-react';

interface LocationNotificationProps {
  location: string;
  show: boolean;
  onClose: () => void;
}

const LocationNotification: React.FC<LocationNotificationProps> = ({ 
  location, 
  show, 
  onClose 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-green-100 rounded-full">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 mb-1">
              Location Updated
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationNotification;
