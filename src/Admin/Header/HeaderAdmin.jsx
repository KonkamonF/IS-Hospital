import React, { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import SidebarAdmin from "./SidebarAdmin";

export default function HeaderAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar แสดงตาม state */}
      <SidebarAdmin isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow">
        {/* ปุ่มเปิดเมนู (เฉพาะมือถือ) */}
        <div className="flex items-center gap-2 ">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="font-bold text-lg text-[#2155CD]">Hospital Admin</h1>
        </div>

        {/* Search Box */}
        <form className="relative w-64 hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 
                       focus:outline-none focus:ring-2 focus:ring-[#42C2FF] 
                       focus:border-transparent text-sm"
          />
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </form>
      </div>
    </>
  );
}
