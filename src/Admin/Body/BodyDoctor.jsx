import React, { useState } from "react";

export default function BodyDoctor() {
  const [isAdmitted, setIsAdmitted] = useState(false);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold text-[#2155CD] mb-4">Doctor Form</h2>

      <form className="space-y-4">
        {/* อาการป่วย */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            อาการป่วย
          </label>
          <input
            type="text"
            placeholder="กรอกอาการป่วย..."
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
          />
        </div>

        {/* โรค */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            โรค
          </label>
          <input
            type="text"
            placeholder="กรอกชื่อโรค..."
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
          />
        </div>

        {/* แผนก */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            แผนกการรักษา
          </label>
          <select
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
          >
            <option>เลือกแผนก</option>
            <option>อายุรกรรม</option>
            <option>ระบบทางเดินอาหาร</option>
            <option>โรคหัวใจและทรวงอก</option>

          </select>
        </div>

        {/* Admission Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Admission</span>
          <button
            type="button"
            onClick={() => setIsAdmitted(!isAdmitted)}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
              isAdmitted ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isAdmitted ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* ฟิลด์เพิ่มเติมถ้าเปิด Admission */}
        {isAdmitted && (
          <div className="space-y-4 border-t pt-4">
            {/* แผนการรักษา */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                แผนการรักษา
              </label>
              <textarea
                rows="3"
                placeholder="ระบุรายละเอียดแผนการรักษา..."
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
              />
            </div>

            {/* ระยะเวลานอน */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ระยะเวลานอนโรงพยาบาล (วัน)
              </label>
              <input
                type="number"
                min="1"
                placeholder="เช่น 3"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#2155CD] text-white py-2 rounded-lg font-medium hover:bg-[#1B3DA8] transition"
        >
          บันทึกข้อมูล
        </button>
      </form>
    </div>
  );
}
