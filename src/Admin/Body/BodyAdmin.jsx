import React, { useState } from "react";
// Import รูปภาพ
import i3 from "../../assets/3.png";
import i4 from "../../assets/4.png";
import i5 from "../../assets/5.png";
import i6 from "../../assets/6.png";
import i7 from "../../assets/7.png";

// **********************************************
// MOCK DATA & UTILITY FUNCTIONS
// **********************************************

// Mock Data (ข้อมูลผู้ป่วย)
// แก้ไขให้เรียกใช้ตัวแปร i3, i4, ... ที่ import เข้ามาโดยตรง
const patientsData = [
  // 1. นายชาญชัย มั่นคง - AIA
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
  }, // 2. นางสาวดวงพร เจริญ - Allianz Ayudhya
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
  }, // 3. นายวิทวัส อ่อนโยน - Muang Thai Life
  {
    id: 3,
    name: "นายวิทวัส อ่อนโยน",
    admitStatus: "Admit",
    paymentStatus: "ชำระแล้ว",
    insuranceStatus: "อนุมัติ",
    sentTime: new Date(new Date().getTime() - 30 * 60000),
    cost: 87500,
    approvedCost: 87500,
    roomNumber: "ห้องคู่ 310",
    insuranceProvider: "Muang Thai Life",
    age: 32,
    i: i5,
  }, // 4. นางสมศรี รักษ์ธรรม - Tokio Marine
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
  }, // ผู้ป่วยเพิ่มเติม...
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
  {
    id: 6,
    name: "นายปรีชา ชนะภัย",
    admitStatus: "Admit",
    paymentStatus: "รอชำระ",
    insuranceStatus: "อนุมัติฉุกเฉิน",
    sentTime: new Date(new Date().getTime() - 15 * 60000),
    cost: 210000,
    approvedCost: 200000,
    roomNumber: "ห้องรวม (ICU) 1",
    insuranceProvider: "Thai Life",
    age: 55,
    i: i3,
  },
  {
    id: 7,
    name: "นางสาวภารดี พลังจิต",
    admitStatus: "Admit",
    paymentStatus: "รอชำระ",
    insuranceStatus: "ปฏิเสธเบื้องต้น",
    sentTime: new Date(new Date().getTime() - 25 * 60000),
    cost: 32000,
    approvedCost: 0,
    roomNumber: "เดี่ยวมาตรฐาน 308",
    insuranceProvider: "Bangkok Health Insurance (TPA)",
    age: 29,
    i: i4,
  },
  {
    id: 8,
    name: "นายมานะ แข็งแกร่ง",
    admitStatus: "Admit",
    paymentStatus: "รอชำระ",
    insuranceStatus: "อนุมัติด่วน",
    sentTime: new Date(new Date().getTime() - 8 * 60000),
    cost: 180000,
    approvedCost: 180000,
    roomNumber: "ห้องรวม (CCU) 3",
    insuranceProvider: "Dhipaya Life Insurance (TPA)",
    age: 40,
    i: i5,
  },
  {
    id: 9,
    name: "นางนวลจันทร์ อิ่มเอม",
    admitStatus: "Admit",
    paymentStatus: "รอชำระ",
    insuranceStatus: "อนุมัติ (วงเงินจำกัด)",
    sentTime: new Date(new Date().getTime() - 40 * 60000),
    cost: 95000,
    approvedCost: 80000,
    roomNumber: "เดี่ยวมาตรฐาน 401",
    insuranceProvider: "AIA",
    age: 60,
    i: i6,
  },
  {
    id: 10,
    name: "นายสุรศักดิ์ ใจดี",
    admitStatus: "Admit",
    paymentStatus: "ชำระแล้ว",
    insuranceStatus: "อนุมัติ",
    sentTime: new Date(new Date().getTime() - 60 * 60000),
    cost: 58000,
    approvedCost: 58000,
    roomNumber: "ห้องคู่ 305",
    insuranceProvider: "Allianz Ayudhya",
    age: 50,
    i: i7,
  },
];

// ฟังก์ชันจัดรูปแบบตัวเลขให้เป็นสกุลเงินบาทสั้นๆ (B145,000)
const formatCurrencyShort = (amount) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("฿", "B"); // เปลี่ยน ฿ เป็น B ตามรูป
};

// ฟังก์ชันสำหรับดึงรายละเอียดทางการแพทย์
const getPatientDetails = (id) => {
  const details = {
    1: {
      diagnosis: "Pneumonia (ปอดอักเสบ)",
      vitals: "Temp: 38.8°C",
      treatment: "IV Antibiotic",
    },
    2: {
      diagnosis: "Arrhythmia (AF with RVR)",
      vitals: "HR: 135 bpm",
      treatment: "Rate control",
    },
    3: {
      diagnosis: "Upper GI Bleeding",
      vitals: "Hb: 9.5",
      treatment: "IV PPI, EGD",
    },
    4: {
      diagnosis: "Pneumonia (ผู้สูงอายุ)",
      vitals: "Temp: 37.8°C",
      treatment: "IV Antibiotics",
    },
  };
  return details[id] || { diagnosis: "N/A", vitals: "N/A", treatment: "N/A" };
};

// **********************************************
// Component: PatientDetailCard (แสดงรายละเอียด Desktop)
// **********************************************
const PatientDetailCard = ({ patient, onClose }) => {
  if (!patient) return null;

  const details = getPatientDetails(patient.id);
  const selfPayCost = patient.cost - patient.approvedCost;

  return (
    <div className="mt-6 p-6 bg-white border border-[#2155CD] rounded-lg shadow-2xl">
           {" "}
      <div className="flex justify-between items-start border-b-2 border-indigo-200 pb-3 mb-4">
               {" "}
        <h3 className="text-xl font-bold text-[#2155CD]">
                    🧑‍⚕️ รายละเอียดทางการแพทย์และค่าใช้จ่าย: {patient.name}       {" "}
        </h3>
               {" "}
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-600 transition duration-150 text-2xl font-light"
          title="ปิดรายละเอียด"
        >
                    &times;        {" "}
        </button>
             {" "}
      </div>
           {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Medical Details */}       {" "}
        <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                   {" "}
          <p className="font-bold text-blue-800 text-lg border-b border-blue-200 pb-1">
                        การวินิจฉัยและการรักษา          {" "}
          </p>
                   {" "}
          <p>
            <span className="font-semibold text-gray-700">Diagnosis:</span>{" "}
            <span className="text-red-600 font-bold">{details.diagnosis}</span>
          </p>
                   {" "}
          <p>
            <span className="font-semibold text-gray-700">Treatment:</span>{" "}
            {details.treatment}
          </p>
                 {" "}
        </div>
                {/* Financial Details (ตรงตามภาพ) */}       {" "}
        <div className="space-y-3 p-4 bg-gray-100 rounded-lg border border-gray-300">
                   {" "}
          <p className="font-bold text-gray-800 text-lg border-b border-gray-300 pb-1">
                        สรุปค่าใช้จ่ายประกัน          {" "}
          </p>
                   {" "}
          <div className="flex justify-between font-bold text-lg text-blue-700">
                        <span>ยอดรวมค่ารักษา:</span>             {" "}
            {/* แก้ไขให้แสดงผลลัพธ์เป็น Bxxxx,xxx ตามรูป */}           {" "}
            <span>{formatCurrencyShort(patient.cost)}</span>         {" "}
          </div>
                   {" "}
          <div className="flex justify-between text-base border-t border-dashed pt-2">
                       {" "}
            <span className="font-semibold text-green-600">
              ยอดอนุมัติโดยประกัน:
            </span>
                        <span>{formatCurrencyShort(patient.approvedCost)}</span>
                     {" "}
          </div>
                             {" "}
          <div className="flex justify-between font-extrabold text-xl text-red-700 pt-1">
                        <span>ยอดชำระเอง (Co-pay):</span>           {" "}
            <span>{formatCurrencyShort(selfPayCost)}</span>         {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

// **********************************************
// Main Component: BodyAdmin
// **********************************************
export default function BodyAdmin() {
  const [patients] = useState(patientsData);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Function to calculate waiting time

  const getWaitingTime = (sentTime) => {
    if (!sentTime) return "-";
    const diffMs = new Date() - new Date(sentTime);
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "น้อยกว่า 1 นาที";
    return `${diffMin} นาที`;
  };

  const ipdPatients = patients.filter((p) => p.admitStatus === "Admit");
  const selectedPatient =
    ipdPatients.find((p) => p.id === selectedPatientId) || null;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
           {" "}
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#2155CD] mb-4 md:mb-6 border-b-4 border-yellow-500 pb-2">
                🛡️ IPD Insurance Administration Dashboard      {" "}
      </h2>
           {" "}
      <div className="rounded-lg shadow-2xl overflow-x-auto">
                {/* ตารางหลัก: Desktop View (UI ตรงตามภาพ) */}       {" "}
        <table className="w-full min-w-[1200px] border-collapse border hidden md:table">
                   {" "}
          <thead className="bg-[#2155CD] text-white sticky top-0">
                       {" "}
            <tr>
                            <th className="p-3 text-left w-[50px]">รูป</th>     
                      <th className="p-3 text-left">ชื่อผู้ป่วย / อายุ</th>     
                      <th className="p-3 text-left">เลขห้อง</th>             {" "}
              <th className="p-3 text-left">บริษัทประกัน</th>             {" "}
              <th className="p-3 text-right">ยอดรวมค่ารักษา</th>             {" "}
              <th className="p-3 text-right">ยอดอนุมัติ</th>             {" "}
              <th className="p-3 text-right">ยอดชำระเอง</th>             {" "}
              <th className="p-3 text-left">สถานะชำระเงิน</th>             {" "}
              <th className="p-3 text-left">สถานะประกัน</th>             {" "}
              <th className="p-3 text-left">เวลาที่รอ</th>           {" "}
            </tr>
                     {" "}
          </thead>
                   {" "}
          <tbody>
                       {" "}
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
                                   {" "}
                  <td className="p-3">
                                       {" "}
                    <img
                      src={p.i}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                                     {" "}
                  </td>
                                   {" "}
                  <td className="p-3 font-medium text-gray-900">
                                        {p.name}{" "}
                    <span className="text-sm text-gray-500">({p.age} ปี)</span> 
                                   {" "}
                  </td>
                                   {" "}
                  <td className="p-3 font-bold text-indigo-600">
                                        {p.roomNumber}                 {" "}
                  </td>
                                   {" "}
                  <td className="p-3 text-sm text-gray-600">
                                        {p.insuranceProvider}                 {" "}
                  </td>
                                   {" "}
                  <td className="p-3 text-right font-bold text-blue-700">
                                        {formatCurrencyShort(p.cost)}           
                         {" "}
                  </td>
                                   {" "}
                  <td className="p-3 text-right font-bold text-green-600">
                                        {formatCurrencyShort(p.approvedCost)}   
                                 {" "}
                  </td>
                                   {" "}
                  <td className="p-3 text-right font-bold text-red-600">
                                        {formatCurrencyShort(selfPayCost)}     
                               {" "}
                  </td>
                                   {" "}
                  <td
                    className={`p-3 font-semibold ${
                      p.paymentStatus === "ชำระแล้ว"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                                        {p.paymentStatus}                 {" "}
                  </td>
                                   {" "}
                  <td className="p-3 font-semibold text-green-600">
                                        {p.insuranceStatus}                 {" "}
                  </td>
                                   {" "}
                  <td
                    className={`p-3 font-bold ${
                      isOver1h ? "text-red-600" : "text-green-700"
                    }`}
                  >
                                        {getWaitingTime(p.sentTime)}           
                         {" "}
                  </td>
                                 {" "}
                </tr>
              );
            })}
                     {" "}
          </tbody>
                 {" "}
        </table>
             {" "}
      </div>
            {/* ส่วนแสดงรายละเอียดผู้ป่วยที่ถูกเลือก (Desktop Only) */}     {" "}
      <div className="hidden md:block">
               {" "}
        <PatientDetailCard
          patient={selectedPatient}
          onClose={() => setSelectedPatientId(null)}
        />
             {" "}
      </div>
                    {/* Card/Expandable Row Layout: Mobile View */}     {" "}
      <div className="md:hidden space-y-3">
               {" "}
        {ipdPatients.map((p) => {
          const isExpanded = expandedRowId === p.id;
          const selfPayCost = p.cost - p.approvedCost;
          return (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md border-l-4 border-[#2155CD] p-3"
              onClick={() => setExpandedRowId(isExpanded ? null : p.id)}
            >
                             {" "}
              <div className="flex items-center justify-between">
                                   {" "}
                <div className="flex items-center space-x-3">
                                         {" "}
                  <img
                    src={p.i}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                                         {" "}
                  <div>
                                               {" "}
                    <p className="font-bold">{p.name}</p>                       
                       {" "}
                    <p className="text-sm text-gray-500">
                      ห้อง {p.roomNumber} ({p.age} ปี)
                    </p>
                                           {" "}
                  </div>
                                     {" "}
                </div>
                                   {" "}
                <div className="flex flex-col items-end">
                                         {" "}
                  <span className="font-semibold text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                                                {p.insuranceStatus}             
                             {" "}
                  </span>
                                         {" "}
                  <span className="text-xs text-gray-400">
                                                รอ: {getWaitingTime(p.sentTime)}
                                           {" "}
                  </span>
                                     {" "}
                </div>
                               {" "}
              </div>
                             {" "}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t space-y-2">
                                         {" "}
                  <div className="flex justify-between font-bold text-sm">
                                               {" "}
                    <span className="text-blue-700">ยอดรวม:</span>             
                                 {" "}
                    <span className="text-blue-700">
                      {formatCurrencyShort(p.cost)}
                    </span>
                                           {" "}
                  </div>
                                         {" "}
                  <div className="flex justify-between text-sm">
                                               {" "}
                    <span className="text-green-600">อนุมัติ:</span>           
                                   {" "}
                    <span className="text-green-600">
                      {formatCurrencyShort(p.approvedCost)}
                    </span>
                                           {" "}
                  </div>
                                         {" "}
                  <div className="flex justify-between text-sm font-extrabold">
                                               {" "}
                    <span className="text-red-600">ชำระเอง:</span>             
                                 {" "}
                    <span className="text-red-600">
                      {formatCurrencyShort(selfPayCost)}
                    </span>
                                           {" "}
                  </div>
                                     {" "}
                </div>
              )}
                         {" "}
            </div>
          );
        })}
             {" "}
      </div>
         {" "}
    </div>
  );
}
