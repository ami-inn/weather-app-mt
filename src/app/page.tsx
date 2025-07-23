import React from "react";
import { CloudHail, Sunrise, Sunset, Sun } from "lucide-react";
import WeatherImg from "../assets/weather.png";
import Image from "next/image";
import Navbar from "@/shared/components/Navbar";
import Card from "@/shared/components/Card";
import { weatherCards } from "@/constant";

const page = () => {
  return (
    <main className="flex flex-col min-h-screen px-32 py-8  items-center">
      <Navbar />
      {/* weathre info section */}
      <section className="w-full flex justify-center mt-4">
        <div className="relative w-full ">
          <Image
            src={WeatherImg}
            alt="Weather"
            className="w-full h-[450px] object-cover rounded-xl shadow-xl"
          />
          {/* Left bottom: Temperature and location */}
          <div className="absolute left-14 bottom-14 text-white">
            <div className="text-8xl font-light font-poppins drop-shadow-lg">
              13°
            </div>
            <div className="text-lg font-medium drop-shadow-lg">
              Telluride, CO, USA
            </div>
          </div>
          {/* Right bottom: Time and sunset info */}
          <div className="absolute right-14 bottom-14 text-right text-white">
            <div className="text-xl font-bold drop-shadow-lg">7:50 PM</div>
            <div className="text-md drop-shadow-lg">Sunset Time, Monday</div>
          </div>
        </div>
      </section>

      {/* about section graph and other thisng */}
      <section className="flex flex-col md:flex-row w-full mt-8 gap-8">
        {/* Left side: 40% on desktop, full width on mobile */}
        <div className="md:w-[40%] w-full  flex flex-col justify-center">
          <div className="grid grid-cols-2 px-5 py-6 gap-6 border-secondary bg-white border-1 rounded-xl ">
            {weatherCards.map((card, index) => (
              <Card
                key={index}
                icon={card.icon}
                label={card.label}
                percentage={card.percentage}
              />
            ))}
          </div>
          {/* Small bottom div */}
          <div
            className="mt-6 rounded-lg p-4 px-6 py-6 flex flex-col gap-2 shadow-md"
            style={{
              background: "linear-gradient(90deg, #A6B1FE 0%, #7284FF 100%)",
            }}
          >
            <div className="flex justify-between ">
              <span className="text-sm text-white">Monthly Rainfall</span>
              <span className="text-sm font-medium text-white">45mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white">This Year</span>
              <span className="text-sm font-bold text-[#69EF91]">
                +17% 
              </span>
            </div>
          </div>
        </div>


        {/* Right side: 60% on desktop, full width on mobile */}
        <div className="md:w-[60%] w-full bg-white rounded-xl shadow p-6 flex flex-col">
          <h3 className="text-xl font-bold mb-4">Weather Graph</h3>
          <div className="flex-1 flex items-center justify-center text-gray-400 min-h-[256px]">
            {/* Placeholder for graph */}
            Graph goes here
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
