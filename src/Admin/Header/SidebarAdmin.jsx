import React from "react";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { Link } from "react-router";

export default function SidebarAdmin({ isOpen, setIsOpen }) {
  return (
    <div
      className={` bg-white shadow-lg fixed top-0 left-0 h-full w-64
        transform ${isOpen ? "translate-y-0" : "-translate-y-full"}
        md:translate-y-0 transition-transform duration-300 z-50
      `}
    >
      <div className="p-6 border-b flex justify-between items-center md:block">
        <h2 className="text-xl font-semibold text-[#2155CD]">Admin Panel</h2>
        {/* ปุ่มปิด (แสดงเฉพาะมือถือ) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden text-gray-600 hover:text-[#2155CD]"
        >
          ✖
        </button>
      </div>
      <nav className="mt-4 space-y-2">
        <Link
          to={"/admin/doctor"}
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#2155CD]/10 hover:text-[#2155CD] rounded-lg transition"
        >
          <FiHome /> Doctor
        </Link>
        <Link
          to={"/admin/nurse"}
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#2155CD]/10 hover:text-[#2155CD] rounded-lg transition"
        >
          <FiUsers /> Nurse
        </Link>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#2155CD]/10 hover:text-[#2155CD] rounded-lg transition"
        >
          <FiSettings /> Settings
        </a>
      </nav>
    </div>
  );
}
