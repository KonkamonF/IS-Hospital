import React, { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import SidebarAdmin from "./SidebarAdmin";
import LogononText from "../../assets/LogononText.png";
import { Link } from "react-router-dom";

export default function HeaderAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar แสดงตาม state */}
      <SidebarAdmin isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow gap-12">
        {/* ปุ่มเปิดเมนู (เฉพาะมือถือ) */}
        <div className="flex items-center gap-2 ">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div className="flex items-center">
            <Link to={"/"}>
              {" "}
              <img src={LogononText} alt="" className="w-[70px]" />
            </Link>

            <h1 className="font-bold text-lg text-[#2155CD]">Hospital Admin</h1>
          </div>
        </div>

        {/* Search Box */}
        <form className="relative w-[30%] hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border-2 border-gray-400 pl-10 pr-3 py-2 
                       focus:outline-none focus:ring-2 focus:ring-[#42C2FF] 
                       focus:border-transparent text-sm hover:border-[#2155CD]"
          />
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2155CD] border-2 rounded-2xl p-1 hover:bg-[#e3f6ff]">
            <FiSearch size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
