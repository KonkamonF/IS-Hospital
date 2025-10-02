import React, { useState } from "react";

import i3 from "../../assets/3.png";
import i4 from "../../assets/4.png";
import i5 from "../../assets/5.png";
import i6 from "../../assets/6.png";
import i7 from "../../assets/7.png";

const patientsData = [
  {
    id: 1,
    name: "นายชาญชัย มั่นคง",
    admitStatus: "Admit",
    paymentStatus: "รอชำระ",
    insuranceStatus: "อนุมัติ",
    sentTime: new Date(new Date().getTime() - 5 * 60000),
    cost: 145000,
    approvedCost: 100000,
    roomNumber: "เดี่ยวพิเศษ 501",
    insuranceProvider: "AIA",
    age: 68,
    i: i3,
  },
  {
    id: 2,
    name: "นางสาวดวงพร เจริญ",
    admitStatus: "Admit",
    paymentStatus: "รอชำระ",
    insuranceStatus: "อนุมัติ (Co-pay)",
    sentTime: new Date(new Date().getTime() - 70 * 60000),
    cost: 85000,
    approvedCost: 75000,
    roomNumber: "เดี่ยวมาตรฐาน 405",
    insuranceProvider: "Allianz Ayudhya",
    age: 45,
    i: i4,
  },
  {
    id: 3,
    name: "นายวิทวัส อ่อนโยน",
    admitStatus: "Admit",
    paymentStatus: "ชำระแล้ว",
    insuranceStatus: "ปฏิเสธ",
    sentTime: new Date(new Date().getTime() - 30 * 60000),
    cost: 87500,
    approvedCost: 87500,
    roomNumber: "คู่ 310",
    insuranceProvider: "Muang Thai Life",
    age: 32,
    i: i5,
  },
  {
    id: 4,
    name: "นางสมศรี รักษ์ธรรม",
    admitStatus: "Admit",
    paymentStatus: "รอชำระ",
    insuranceStatus: "รอตอบกลับ",
    sentTime: new Date(new Date().getTime() - 120 * 60000),
    cost: 45000,
    approvedCost: 0,
    roomNumber: "เดี่ยวมาตรฐาน 205",
    insuranceProvider: "Tokio Marine",
    age: 75,
    i: i6,
  },
  {
    id: 5,
    name: "เด็กหญิงใบบัว น่ารัก",
    admitStatus: "Admit",
    paymentStatus: "รอชำระ",
    insuranceStatus: "อนุมัติ",
    sentTime: new Date(new Date().getTime() - 10 * 60000),
    cost: 65000,
    approvedCost: 65000,
    roomNumber: "เดี่ยวพิเศษ (VIP) 505",
    insuranceProvider: "Krungthai-AXA",
    age: 8,
    i: i7,
  },
];

// ฟังก์ชันจัดรูปแบบตัวเลขให้เป็นสกุลเงินบาท (Bxxx,xxx)
const formatCurrencyShort = (amount) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("฿", "B");
};

// ฟังก์ชันคำนวณเวลาที่รอ
const getWaitingTime = (sentTime) => {
  if (!sentTime) return "-";
  const diffMs = new Date() - new Date(sentTime);
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "น้อยกว่า 1 นาที";
  return `${diffMin} นาที`;
};

// **********************************************
// Component: PatientDetailCard (แสดงรายละเอียด Desktop)
// **********************************************
const PatientDetailCard = ({ patient, onClose }) => {
  if (!patient) return null;

  const selfPayCost = patient.cost - patient.approvedCost;

  return (
    <div className="mt-6 p-6 bg-white border border-[#2155CD] rounded-lg shadow-2xl">
      <div className="flex justify-between items-start border-b-2 border-indigo-200 pb-3 mb-4">
        <h3 className="text-xl font-bold text-[#2155CD]">
          🧑‍⚕️ รายละเอียดผู้ป่วย: {patient.name}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-600 transition duration-150 text-2xl font-light"
          title="ปิดรายละเอียด"
        >
          &times;
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medical Info */}
        <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="font-bold text-blue-800 text-lg border-b border-blue-200 pb-1">
            ข้อมูลทั่วไป
          </p>
          <p>
            <span className="font-semibold text-gray-700">ห้องพัก:</span>{" "}
            {patient.roomNumber}
          </p>
          <p>
            <span className="font-semibold text-gray-700">บริษัทประกัน:</span>{" "}
            {patient.insuranceProvider}
          </p>
        </div>

        {/* Financial Info */}
        <div className="space-y-3 p-4 bg-gray-100 rounded-lg border border-gray-300">
          <p className="font-bold text-gray-800 text-lg border-b border-gray-300 pb-1">
            สรุปค่าใช้จ่าย
          </p>
          <div className="flex justify-between font-bold text-lg text-blue-700">
            <span>ยอดรวมค่ารักษา:</span>
            <span>{formatCurrencyShort(patient.cost)}</span>
          </div>
          <div className="flex justify-between text-base border-t border-dashed pt-2">
            <span className="font-semibold text-green-600">
              ยอดอนุมัติโดยประกัน:
            </span>
            <span>{formatCurrencyShort(patient.approvedCost)}</span>
          </div>
          <div className="flex justify-between font-extrabold text-xl text-red-700 pt-1">
            <span>ยอดชำระเอง (Co-pay):</span>
            <span>{formatCurrencyShort(selfPayCost)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BodyAdmin() {
  const [patients] = useState(patientsData);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const ipdPatients = patients.filter((p) => p.admitStatus === "Admit");
  const selectedPatient =
    ipdPatients.find((p) => p.id === selectedPatientId) || null;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#2155CD] mb-4 md:mb-6 border-b-4 border-yellow-500 pb-2">
        🛡️ IPD Insurance Administration Dashboard
      </h2>

      {/* Table: Desktop View */}
      <div className="rounded-lg shadow-2xl overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse hidden md:table">
          <thead className="bg-[#2155CD] text-white sticky top-0 text-sm">
            <tr>
              <th className="p-3 text-center w-[60px]">รูป</th>
              <th className="p-3 text-left w-[220px]">ชื่อผู้ป่วย / อายุ</th>
              <th className="p-3 text-left w-[160px]">เลขห้อง</th>
              <th className="p-3 text-left w-[220px]">บริษัทประกัน</th>
              <th className="p-3 text-right w-[150px]">ยอดรวมค่ารักษา</th>
              <th className="p-3 text-right w-[150px]">ยอดอนุมัติ</th>
              <th className="p-3 text-right w-[150px]">ยอดชำระเอง</th>
              <th className="p-3 text-center w-[120px]">สถานะชำระเงิน</th>
              <th className="p-3 text-center w-[160px]">สถานะประกัน</th>
              <th className="p-3 text-center w-[100px]">เวลาที่รอ</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {ipdPatients.map((p) => {
              const waitingTime = p.sentTime
                ? new Date() - new Date(p.sentTime)
                : 0;
              const isOver1h = waitingTime > 60 * 60 * 1000;
              const selfPayCost = p.cost - p.approvedCost;

              return (
                <tr
                  key={p.id}
                  className={`border-b bg-white transition cursor-pointer ${
                    selectedPatientId === p.id
                      ? "bg-indigo-100 border-l-4 border-indigo-600"
                      : "hover:bg-indigo-50"
                  }`}
                  onClick={() => setSelectedPatientId(p.id)}
                >
                  <td className="p-3 text-center">
                    <img
                      src={p.i}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full object-cover mx-auto"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-900 whitespace-nowrap">
                    {p.name}{" "}
                    <span className="text-sm text-gray-500">({p.age} ปี)</span>
                  </td>
                  <td className="p-3 font-bold text-indigo-600 whitespace-nowrap">
                    {p.roomNumber}
                  </td>
                  <td className="p-3 text-gray-600 whitespace-nowrap">
                    {p.insuranceProvider}
                  </td>
                  <td className="p-3 text-right font-bold text-blue-700">
                    {formatCurrencyShort(p.cost)}
                  </td>
                  <td className="p-3 text-right font-bold text-green-600">
                    {formatCurrencyShort(p.approvedCost)}
                  </td>
                  <td className="p-3 text-right font-bold text-red-600">
                    {formatCurrencyShort(selfPayCost)}
                  </td>
                  <td
                    className={`p-3 text-center font-semibold whitespace-nowrap ${
                      p.paymentStatus === "ชำระแล้ว"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {p.paymentStatus}
                  </td>
                  {(() => {
                    let badgeClass = "text-yellow-600 flex justify-center p-5"; // ค่าเริ่มต้น = เหลือง
                    if (p.insuranceStatus.includes("อนุมัติ")) {
                      badgeClass = "text-green-600 flex justify-center p-5";
                    } else if (p.insuranceStatus.includes("ปฏิเสธ")) {
                      badgeClass = "text-red-600 flex justify-center p-5 ";
                    }
                    return (
                      <span className={`font-semibold p-5 ${badgeClass}`}>
                        {p.insuranceStatus}
                      </span>
                    );
                  })()}
                  <td
                    className={`p-3 text-center font-bold ${
                      isOver1h ? "text-red-600" : "text-green-700"
                    }`}
                  >
                    {getWaitingTime(p.sentTime)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Patient Detail: Desktop */}
      <div className="hidden md:block">
        <PatientDetailCard
          patient={selectedPatient}
          onClose={() => setSelectedPatientId(null)}
        />
      </div>

      {/* Card Layout: Mobile */}
      <div className="md:hidden space-y-3 mt-4">
        {ipdPatients.map((p) => {
          const isExpanded = expandedRowId === p.id;
          const selfPayCost = p.cost - p.approvedCost;
          return (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md border-l-4 border-[#2155CD] p-3"
              onClick={() => setExpandedRowId(isExpanded ? null : p.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={p.i}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-sm text-gray-500">
                      ห้อง {p.roomNumber} ({p.age} ปี)
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {/* <span className="font-semibold text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                    {p.insuranceStatus}
                  </span> */}
                  {(() => {
                    let badgeClass = "bg-yellow-100 text-yellow-800"; // ค่าเริ่มต้น = เหลือง
                    if (p.insuranceStatus.includes("อนุมัติ")) {
                      badgeClass = "bg-green-100 text-green-800";
                    } else if (p.insuranceStatus.includes("ปฏิเสธ")) {
                      badgeClass = "bg-red-100 text-red-800";
                    }
                    return (
                      <span
                        className={`font-semibold text-xs px-2 py-1 rounded-full ${badgeClass}`}
                      >
                        {p.insuranceStatus}
                      </span>
                    );
                  })()}
                  <span className="text-xs text-gray-400">
                    รอ: {getWaitingTime(p.sentTime)}
                  </span>
                </div>
              </div>
              {isExpanded && (
                <div className="mt-3 pt-3 border-t space-y-2">
                  <div className="flex justify-between font-bold text-sm">
                    <span className="text-blue-700">ยอดรวม:</span>
                    <span className="text-blue-700">
                      {formatCurrencyShort(p.cost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">อนุมัติ:</span>
                    <span className="text-green-600">
                      {formatCurrencyShort(p.approvedCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold">
                    <span className="text-red-600">ชำระเอง:</span>
                    <span className="text-red-600">
                      {formatCurrencyShort(selfPayCost)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
