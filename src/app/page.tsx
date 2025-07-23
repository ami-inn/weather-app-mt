import React from "react";
import {
  LucideMenu,
  LucideSearch,
  CloudHail,
  Sunrise,
  Sunset,
  Sun,
} from "lucide-react";
import WeatherImg from "../assets/weather.png";
import Image from "next/image";
import Navbar from "@/shared/components/Navbar";

const page = () => {
  return (
    <main className="flex flex-col min-h-screen px-32 py-8  items-center">
     <Navbar/>
      {/* weathre info section */}
      <section className="w-full flex justify-center mt-2">
        <div className="relative w-full ">
          <Image
            src={WeatherImg}
            alt="Weather"
            className="w-full h-[450px] object-cover rounded-xl shadow-xl"
          />
          {/* Left bottom: Temperature and location */}
          <div className="absolute left-6 bottom-6 text-white">
            <div className="text-6xl font-bold drop-shadow-lg">13°</div>
            <div className="text-lg font-medium drop-shadow-lg">
              Telluride, CO, USA
            </div>
          </div>
          {/* Right bottom: Time and sunset info */}
          <div className="absolute right-6 bottom-6 text-right text-white">
            <div className="text-xl font-bold drop-shadow-lg">7:50 PM</div>
            <div className="text-md drop-shadow-lg">Sunset Time, Monday</div>
          </div>
        </div>
      </section>

      {/* about section graph and other thisng */}
      <section className="flex w-full mt-8 gap-8">
        {/* Left side: 35% */}
        <div className="w-[40%]  p-6 flex  flex-col justify-center">
          {/* Add your left side content here */}
          <div className="grid grid-cols-2 px-5 py-6 gap-6 shadow-md">
            {/* Humidity Card */}
            <div className="flex items-center bg-white rounded-xl   p-4">
              <CloudHail className="w-10 h-10 text-blue-400 mr-4" />
              <div>
                <span className="text-lg font-semibold">Humidity</span>
                <div className="text-2xl font-bold text-gray-800">60%</div>
              </div>
            </div>
            {/* UV Index Card */}
            <div className="flex items-center bg-white rounded-xl   p-4">
              <Sun className="w-10 h-10 text-yellow-400 mr-4" />
              <div>
                <span className="text-lg font-semibold">UV Index</span>
                <div className="text-2xl font-bold text-gray-800">
                  5 (Moderate)
                </div>
              </div>
            </div>
            {/* Sunrise Card */}
            <div className="flex items-center bg-white rounded-xl   p-4">
              <Sunrise className="w-10 h-10 text-orange-400 mr-4" />
              <div>
                <span className="text-lg font-semibold">Sunrise</span>
                <div className="text-2xl font-bold text-gray-800">6:10 AM</div>
              </div>
            </div>
            {/* Sunset Card */}
            <div className="flex items-center bg-white rounded-xl   p-4">
              <Sunset className="w-10 h-10 text-pink-400 mr-4" />
              <div>
                <span className="text-lg font-semibold">Sunset</span>
                <div className="text-2xl font-bold text-gray-800">7:50 PM</div>
              </div>
            </div>
          </div>
          {/* Small bottom div */}
          <div
            className="mt-6 rounded-lg p-4 flex flex-col gap-2 shadow-md"
            style={{
              background: "linear-gradient(90deg, #A6B1FE 0%, #7284FF 100%)",
            }}
          >
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Wind</span>
              <span className="text-sm font-medium text-gray-800">12 km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Pressure</span>
              <span className="text-sm font-medium text-gray-800">
                1012 hPa
              </span>
            </div>
          </div>
        </div>
        {/* Right side: 65% */}
        <div className="w-[60%] bg-white rounded-xl shadow p-6">
          {/* Add your right side content here */}
          <h3 className="text-xl font-bold mb-4">Weather Graph</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* Placeholder for graph */}
            Graph goes here
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
