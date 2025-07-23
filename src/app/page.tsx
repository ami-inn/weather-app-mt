'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import WeatherImg from "../assets/weather.png";
import weatherNewImg from "../assets/weathernew.png";
import Navbar from "@/shared/components/Navbar";
import Card from "@/shared/components/Card";
import SummaryBox from "@/shared/components/SummaryBox";
import WeatherChart from "@/shared/components/WeatherChart";
import MetricSelector from "@/shared/components/MetricSelector";
import LocationNotification from "@/shared/components/LocationNotification";
import { weatherCards } from "@/constant";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useWeatherStore } from "@/store/weather";

const HomePage = () => {
  const { weatherData, isLoading } = useWeatherData();
  const { selectedMetric, setSelectedMetric, currentLocation } = useWeatherStore();
  const [showLocationNotification, setShowLocationNotification] = useState(false);
  const [previousLocation, setPreviousLocation] = useState(currentLocation);

  // Show notification when location changes
  useEffect(() => {
    if (currentLocation !== previousLocation && previousLocation) {
      setShowLocationNotification(true);
    }
    setPreviousLocation(currentLocation);
  }, [currentLocation, previousLocation]);

  if (isLoading && !weatherData) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading weather data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen px-4 lg:px-32 py-8 bg-gray-50">
      <Navbar />
      
      {/* Location Change Notification */}
      <LocationNotification
        location={currentLocation}
        show={showLocationNotification}
        onClose={() => setShowLocationNotification(false)}
      />
      
      {/* Hero Weather Section */}
      <section className="w-full flex justify-center mt-4">
        <div className="relative w-full max-w-7xl">
          <Image
            src={weatherNewImg}
            alt="Weather"
            className="w-full h-[300px] lg:h-[400px] object-cover rounded-xl shadow-xl"
          />
          {/* Left bottom: Temperature and location */}
          <div className="absolute left-4 lg:left-14 bottom-4 lg:bottom-14 text-white">
            <div className="text-4xl lg:text-8xl font-light font-poppins drop-shadow-lg">
              {weatherData?.currentTemp || 13}°
            </div>
            <div className="text-sm lg:text-lg font-medium drop-shadow-lg">
              {currentLocation}
            </div>
          </div>
          {/* Right bottom: Time and date info */}
          <div className="absolute right-4 lg:right-14 bottom-4 lg:bottom-14 text-right text-white">
            <div className="text-lg lg:text-xl font-bold drop-shadow-lg">
              {new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
            <div className="text-sm lg:text-md drop-shadow-lg">
              {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="flex flex-col xl:flex-row w-full max-w-7xl mx-auto mt-8 gap-8">
        {/* Left side: Summary and Cards */}
        <div className="xl:w-[35%] w-full flex flex-col gap-6">
          {/* Summary Box */}
          {weatherData && (
            <SummaryBox
              location={weatherData.location}
              date={weatherData.date}
              currentTemp={weatherData.currentTemp}
              currentRainfall={weatherData.currentRainfall}
            />
          )}

          {/* Weather Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {weatherCards.map((card, index) => (
              <Card
                key={index}
                icon={card.icon}
                label={card.label}
                percentage={card.percentage}
                unit={card.unit}
              />
            ))}
          </div>

          {/* Monthly Rainfall Card */}
          <div
            className="rounded-lg p-6 flex flex-col gap-2 shadow-md"
            style={{
              background: "linear-gradient(90deg, #A6B1FE 0%, #7284FF 100%)",
            }}
          >
            <div className="flex justify-between">
              <span className="text-sm text-white">Monthly Rainfall</span>
              <span className="text-sm font-medium text-white">45mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white">This Year</span>
              <span className="text-sm font-bold text-[#69EF91]">+17%</span>
            </div>
          </div>
        </div>

        {/* Right side: Weather Chart */}
        <div className="xl:w-[65%] w-full bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 lg:mb-0">
              Weather Analytics - Last 7 Days
            </h3>
            <div className="text-sm text-gray-500">
              Updates every hour • Last updated: {' '}
              {new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit' 
              })}
            </div>
          </div>
          
          <MetricSelector
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />

          {weatherData ? (
            <WeatherChart
              data={weatherData[selectedMetric]}
              metricType={selectedMetric}
              isLoading={isLoading}
            />
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-400">
              <div className="text-center">
                <div className="animate-pulse text-lg mb-2">Loading chart data...</div>
                <div className="text-sm">Fetching weather analytics</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
