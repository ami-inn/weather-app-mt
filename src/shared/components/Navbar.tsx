'use client';

import { LucideSearch, Cloud, Zap } from "lucide-react";
import React, { useState } from "react";
import { useWeatherStore } from "@/store/weather";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { lastUpdated } = useWeatherStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search functionality here
    console.log("Searching for:", searchTerm);
  };

  return (
    <nav className="flex items-center w-full justify-between py-4 mb-2">
      {/* Left side: Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 font-poppins">
              Weather Dashboard
            </h2>
            <p className="text-sm text-gray-500">
              Real-time weather analytics
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Search and Status */}
      <div className="flex items-center gap-6">
        {/* Auto-refresh Status */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <Zap className="w-4 h-4 text-green-500" />
          <span>Auto-refresh: 1hr</span>
          {lastUpdated && (
            <span className="text-xs text-gray-400">
              • Last: {lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </span>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search location..."
            className="pl-4 pr-10 py-2.5 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <LucideSearch className="w-5 h-5" />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
