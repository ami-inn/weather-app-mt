'use client';

import { Cloud, Zap, RefreshCw } from "lucide-react";
import React from "react";
import { useWeatherStore } from "@/store/weather";
import { useWeatherData } from "@/hooks/useWeatherData";
import SearchDropdown from "./SearchDropdown";

const Navbar = () => {
  const { lastUpdated, currentLocation } = useWeatherStore();
  const { refreshWeatherData, isLoading } = useWeatherData();

  const handleRefresh = () => {
    refreshWeatherData();
  };

  const handleLocationSelect = (location: string) => {
    console.log("Location selected:", location);
  };

  return (
    <nav className="flex items-center w-full justify-between py-4 mb-2">
      {/* Left side: Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 font-poppins">
              Weather Dashboard
            </h2>
            <p className="text-sm text-gray-500">
              Real-time weather analytics • {currentLocation}
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Controls */}
      <div className="flex items-center gap-6">
        {/* Auto-refresh Status */}
        <div className="hidden lg:flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-500" />
            <span>Auto-refresh: 1hr</span>
          </div>
          
          {lastUpdated && (
            <div className="text-xs text-gray-400">
              Last updated: {lastUpdated.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit' 
              })}
            </div>
          )}
          
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Search Bar */}
        <SearchDropdown onLocationSelect={handleLocationSelect} />
      </div>
    </nav>
  );
};

export default Navbar;
