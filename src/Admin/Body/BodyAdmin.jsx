import React, { useEffect, useState } from "react";
import i3 from "../../assets/3.png";
import i4 from "../../assets/4.png";
import i5 from "../../assets/5.png";
import i6 from "../../assets/6.png";
import i7 from "../../assets/7.png";

export default function BodyAdmin() {
  // Mock data ผู้ป่วย (เพิ่ม property 'age' สำหรับการแสดงผลบนมือถือ)
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Somchai Prasert",
      admitStatus: "Admit", // IPD
      paymentStatus: "รอชำระ",
      insuranceStatus: "รอส่งประกัน",
      sentTime: null,
      cost: 15500,
      roomNumber: "301",
      insuranceProvider: "AIA",
      age: 45, // NEW: เพิ่มอายุ
      i: i3,
    },
    {
      id: 2,
      name: "Warinya Thongdee",
      admitStatus: "OPD", // จะถูก Filter ออก
      paymentStatus: "ชำระแล้ว",
      insuranceStatus: "รอตอบกลับ",
      sentTime: new Date(new Date().getTime() - 70 * 60000),
      cost: 4200,
      roomNumber: "-",
      insuranceProvider: "Allianz Ayudhya",
      age: 28, // NEW: เพิ่มอายุ
      i: i4,
    },
    {
      id: 3,
      name: "Anan Pholchai",
      admitStatus: "Admit", // IPD
      paymentStatus: "ชำระแล้ว",
      insuranceStatus: "อนุมัติ",
      sentTime: new Date(new Date().getTime() - 30 * 60000),
      cost: 87500,
      roomNumber: "410",
      insuranceProvider: "Muang Thai Life",
      age: 62, // NEW: เพิ่มอายุ
      i: i5,
    },
    {
      id: 4,
      name: "Chutima Sriboon",
      admitStatus: "Admit", // IPD
      paymentStatus: "รอชำระ",
      insuranceStatus: "รอตอบกลับ",
      sentTime: new Date(new Date().getTime() - 120 * 60000),
      cost: 45000,
      roomNumber: "205",
      insuranceProvider: "Krungthai-AXA",
      age: 33, // NEW: เพิ่มอายุ
      i: i6,
    },
    {
      id: 5,
      name: "Pichai Meesuk",
      admitStatus: "Admit", // IPD
      paymentStatus: "รอชำระ",
      insuranceStatus: "ปฏิเสธ",
      sentTime: new Date(new Date().getTime() - 10 * 60000),
      cost: 21000,
      roomNumber: "502",
      insuranceProvider: "Bangkok Health Insurance (TPA)",
      age: 50, // NEW: เพิ่มอายุ
      i: i7,
    },
    {
      id: 6,
      name: "Supaporn Dee",
      admitStatus: "Admit", // IPD
      paymentStatus: "ชำระแล้ว",
      insuranceStatus: "ส่งแล้ว",
      sentTime: new Date(new Date().getTime() - 15 * 60000),
      cost: 32000,
      roomNumber: "308",
      insuranceProvider: "Tokio Marine",
      age: 29, // NEW: เพิ่มอายุ
      i: i4,
    },
  ]);

  const [time, setTime] = useState(new Date());
  // State สำหรับเก็บ ID ของแถวที่ถูกขยาย
  const [expandedRowId, setExpandedRowId] = useState(null);

  // Update เวลาทุกๆ 1 นาที (คงเดิม)
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // ฟังก์ชันคำนวณเวลารอประกัน (คงเดิม)
  const getWaitingTime = (sentTime) => {
    if (!sentTime) return "-";
    const diffMs = new Date() - new Date(sentTime);
    const diffMin = Math.floor(diffMs / 60000);
    return `${diffMin} นาที`;
  };

  // ฟังก์ชันจัดรูปแบบตัวเลขให้เป็นสกุลเงินบาท (คงเดิม)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // ฟังก์ชันสลับการขยายแถว
  const toggleRow = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  // กรองข้อมูล: แสดงเฉพาะผู้ป่วยใน (IPD) (คงเดิม)
  const ipdPatients = patients.filter((p) => p.admitStatus === "Admit");

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#2155CD] mb-4 md:mb-6 border-b-4 border-yellow-500 pb-2">
        🛡️ IPD Insurance Administration Dashboard
      </h2>

      <div className="rounded-lg shadow-2xl">
        {/* ตารางหลัก: จะถูกซ่อนบน Mobile และแสดงบน Desktop */}
        <table className="w-full border-collapse border hidden md:table">
          <thead className="bg-[#2155CD] text-white sticky top-0">
            <tr>
              <th className="p-3 text-left w-[50px]">รูป</th>
              <th className="p-3 text-left">ชื่อผู้ป่วย</th>
              <th className="p-3 text-left">เลขห้อง</th>
              <th className="p-3 text-left">บริษัทประกัน</th>
              <th className="p-3 text-left">การชำระเงิน</th>
              <th className="p-3 text-left">สถานะประกัน</th>
              <th className="p-3 text-right">ค่ารักษาพยาบาล</th>
              <th className="p-3 text-left">เวลาที่รอ</th>
            </tr>
          </thead>
          <tbody>
            {ipdPatients.map((p) => {
              const waitingTime = p.sentTime
                ? new Date() - new Date(p.sentTime)
                : 0;
              const isOver1h = waitingTime > 60 * 60 * 1000;

              return (
                <tr
                  key={p.id}
                  className="border-b bg-white hover:bg-indigo-50 transition"
                >
                  <td className="p-3">
                    <img src={p.i} alt="" className="w-full max-w-[50px]" />
                  </td>
                  <td className="p-3 font-medium text-gray-900">{p.name}</td>
                  <td className="p-3 font-bold text-indigo-600">
                    {p.roomNumber}
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {p.insuranceProvider}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      p.paymentStatus === "ชำระแล้ว"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {p.paymentStatus}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      p.insuranceStatus.includes("รอ")
                        ? "text-yellow-600"
                        : p.insuranceStatus === "อนุมัติ"
                        ? "text-green-600"
                        : p.insuranceStatus === "ปฏิเสธ"
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                  >
                    {p.insuranceStatus}
                  </td>
                  <td className="p-3 text-right font-bold text-blue-700">
                    {formatCurrency(p.cost)}
                  </td>
                  <td
                    className={`p-3 ${
                      isOver1h ? "text-red-600 font-bold" : "text-gray-700"
                    }`}
                  >
                    {getWaitingTime(p.sentTime)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Card/Expandable Row Layout: แสดงเฉพาะบน Mobile */}
        <div className="md:hidden space-y-3">
          {ipdPatients.map((p) => {
            const isExpanded = expandedRowId === p.id;
            const waitingTime = p.sentTime
              ? new Date() - new Date(p.sentTime)
              : 0;
            const isOver1h = waitingTime > 60 * 60 * 1000;

            return (
              <div
                key={p.id}
                className="bg-white rounded-lg shadow-md border-l-4 border-[#2155CD] p-3 transition duration-300 ease-in-out"
              >
                {/* Main Row (คลิกเพื่อขยาย) */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleRow(p.id)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={p.i}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{p.name}</p>
                      <p className="text-sm text-gray-500">
                        ห้อง {p.roomNumber} | {p.age} ปี
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-semibold text-sm px-2 py-1 rounded-full ${
                        p.insuranceStatus.includes("รอ")
                          ? "bg-yellow-100 text-yellow-800"
                          : p.insuranceStatus === "อนุมัติ"
                          ? "bg-green-100 text-green-800"
                          : p.insuranceStatus === "ปฏิเสธ"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {p.insuranceStatus}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Expanded Details (ซ่อน/แสดง) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-96 pt-3 mt-3 border-t" : "max-h-0"
                  }`}
                >
                  <div className="space-y-2 text-sm">
                    {/* บริษัทประกัน */}
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">
                        บริษัทประกัน:
                      </span>
                      <span className="text-gray-800 break-words max-w-[60%] text-right">
                        {p.insuranceProvider}
                      </span>
                    </div>

                    {/* ค่ารักษาพยาบาล */}
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">
                        ค่ารักษาพยาบาล:
                      </span>
                      <span className="font-bold text-blue-700">
                        {formatCurrency(p.cost)}
                      </span>
                    </div>

                    {/* การชำระเงิน */}
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">
                        การชำระเงิน:
                      </span>
                      <span
                        className={`font-semibold ${
                          p.paymentStatus === "ชำระแล้ว"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {p.paymentStatus}
                      </span>
                    </div>

                    {/* เวลาที่รอ */}
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">
                        เวลาที่รอ (ประกัน):
                      </span>
                      <span
                        className={`font-semibold ${
                          isOver1h
                            ? "text-red-600"
                            : p.sentTime
                            ? "text-gray-700"
                            : "text-gray-400"
                        }`}
                      >
                        {getWaitingTime(p.sentTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer / Summary (คงเดิม) */}
      <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-[#2155CD]">
          จำนวนผู้ป่วยใน (IPD):{" "}
          <span className="text-3xl">{ipdPatients.length}</span> ราย
        </p>
      </div>
    </div>
  );
}