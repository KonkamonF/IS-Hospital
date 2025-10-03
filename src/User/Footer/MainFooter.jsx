import React from "react";

export default function MainFooter() {
  return (
    <>
      <div className="bg-[#2155CD] text-white p-4 text-center rounded-t-4xl">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold text-blue-800">ติดต่อเรา</h2>
          <p className="text-gray-700 mt-2">
            โทร: 1234-5678 | อีเมล: info@hospital.com
            <br />
            เปิดบริการตลอด 24 ชั่วโมง
          </p>
        </div>
      </div>
    </>
  );
}
