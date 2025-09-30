import React from "react";
import { Link } from "react-router-dom";

// กำหนด Inline SVG Icons เพื่อหลีกเลี่ยงข้อผิดพลาดในการ Resolve Module
const HomeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const UsersIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const SettingsIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function SidebarAdmin({ isOpen, setIsOpen }) {
  // ฟังก์ชันสำหรับกำหนด class ของ Link ที่ถูกเลือกในปัจจุบัน (จำลอง)
  // ในการใช้งานจริงควรใช้ useLocation ของ react-router-dom
  const activeLinkClass = (path) =>
    window.location.pathname === path
      ? "flex items-center gap-3 px-4 py-2 text-white bg-[#2155CD] rounded-lg transition font-semibold"
      : "flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#2155CD]/10 hover:text-[#2155CD] rounded-lg transition";

  return (
    // ปรับปรุง Responsive:
    // 1. ใช้ translate-x สำหรับการเลื่อนเข้า-ออก
    // 2. Sidebar จะถูกซ่อนด้วย -translate-x-full และจะแสดงเมื่อ isOpen เป็น true เท่านั้น
    <div
      className={` bg-white shadow-2xl fixed top-0 left-0 h-full w-64
        transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Overlay สำหรับมือถือ เมื่อเปิด Sidebar ควรมี Overlay มืดๆ เพื่อกันการคลิกเนื้อหาด้านหลัง (ต้องเพิ่มใน Parent Component) */}

      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#2155CD] tracking-wider">
          Admin Panel
        </h2>
        {/* ปุ่มปิด: ใช้สำหรับยุบ Sidebar ทั้งบน Mobile และ Desktop */}
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-600 hover:text-[#2155CD] text-2xl p-1 rounded-full hover:bg-gray-100 transition"
          aria-label="Close menu"
        >
          &times;
        </button>
      </div>
      <nav className="mt-4 space-y-1">
        <Link
          to={"/admin/doctor"}
          // ใช้ activeLinkClass เพื่อแสดงสถานะ Active Link
          className={activeLinkClass("/admin/doctor")}
        >
          <HomeIcon /> Doctor
        </Link>
        <Link to={"/admin/nurse"} className={activeLinkClass("/admin/nurse")}>
          <UsersIcon /> Nurse
        </Link>
        <Link
          to={"/admin/insurance"}
          className={activeLinkClass("/admin/insurance")}
        >
          <SettingsIcon /> Insurance
        </Link>
      </nav>
      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t text-xs text-gray-400">
        Dashboard v1.0
      </div>
    </div>
  );
}
