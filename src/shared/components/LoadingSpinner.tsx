'use client';

import React from 'react';
import { Cloud, Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-600">
      <div className="relative mb-6">
        <Cloud className="w-16 h-16 text-blue-500 opacity-20" />
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Loading Weather Data</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        Fetching real-time weather analytics and generating visualizations...
      </p>
      <div className="flex gap-1 mt-4">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
