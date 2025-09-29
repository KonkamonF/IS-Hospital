import React from "react";
import { FiSearch } from "react-icons/fi";

export default function HeaderAdmin() {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white shadow">
        <p className="text-lg font-semibold text-[#2155CD]">Hospital Staff</p>

        <form className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 
                       focus:outline-none focus:ring-2 focus:ring-[#42C2FF] 
                       focus:border-transparent text-sm"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </form>
      </div>
    </>
  );
}
