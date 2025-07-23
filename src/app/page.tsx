import React from "react";
import { LucideMenu, LucideSearch } from "lucide-react";

const page = () => {
  return (
    <main className="flex flex-col min-h-screen px-32 py-12  items-center">
      <nav className="flex items-center w-full justify-between px-4 py-2 bg-gray-100">
        {/* Left side: Bold text */}
        <h2
        className="text-2xl font-bold text-gray-800"
        >
          Amin
        </h2>
        {/* Right side: Toggle, Search bar */}
        <div className="flex items-center gap-4">
      

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-3 pr-10 py-1 rounded border border-gray-300 focus:outline-none"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              {/* Lucide: Search icon */}
              <LucideSearch className="w-5 h-5" />
            </span>
          </div>
              {/* Toggle Icon */}
          <button className="p-2 rounded hover:bg-gray-200">
            <svg className="w-6 h-6" aria-hidden="true">
              {/* Example toggle icon (Lucide: Menu) */}
              <LucideMenu />
            </svg>
          </button>
        </div>
      </nav>
    </main>
  );
};

export default page;
