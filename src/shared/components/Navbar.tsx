import { LucideMenu, LucideSearch } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center w-full justify-between py-2 ">
      {/* Left side: Bold text */}
      <h2 className="text-3xl font-bold text-gray-800">Amin</h2>
      {/* Right side: Toggle, Search bar */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search Location..."
            className="pl-3 px-3 placeholder:text-[#A8ABC4] text-[#A8ABC4]  pr-10 py-2 rounded border border-secondary focus:outline-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
            <LucideSearch className="w-5 h-5" />
          </span>
        </div>
        {/* Toggle Icon */}
        {/* <button className="p-2 rounded hover:bg-gray-200">
          <svg className="w-6 h-6" aria-hidden="true">
            <LucideMenu />
          </svg>
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
