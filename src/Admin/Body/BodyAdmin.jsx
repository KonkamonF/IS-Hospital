import React, { useEffect, useState } from "react";
// สมมติว่า path ถูกต้อง
import i3 from "../../assets/3.png";
import i4 from "../../assets/4.png";
import i5 from "../../assets/5.png";
import i6 from "../../assets/6.png";
import i7 from "../../assets/7.png";
// import i8 from "../../assets/8.png";
// import i9 from "../../assets/9.png";
// import i10 from "../../assets/10.png";

// **********************************************
// MOCK DATA: รายละเอียดเพิ่มเติมเมื่อกดดู (จำลองข้อมูลสุขภาพ)
// **********************************************
const getPatientDetails = (id) => {
  switch (id) {
    case 1:
      return {
        diagnosis: "Pneumonia (ปอดอักเสบรุนแรง)",
        vitals: "Temp: 38.8°C, O2 Sat: 92%, BP: 140/90",
        treatment: "IV Ceftriaxone 1g BID, Oxygen Support 3L/min",
      };
    case 2:
      return {
        diagnosis: "Arrhythmia (AF with RVR)",
        vitals: "HR: 135 bpm (Irregular), BP: 110/70",
        treatment: "Rate control with Diltiazem drip, Monitor EKG in CCU",
      };
    case 3:
      return {
        diagnosis: "Upper GI Bleeding (แผลในกระเพาะ)",
        vitals: "Hb: 9.5 (ซีด), BP: 100/60 (เริ่มต่ำ)",
        treatment: "IV PPI Drip, NPO, EGD Consult",
      };
    case 4:
      return {
        diagnosis: "Pneumonia (ผู้สูงอายุ มีอาการสับสน)",
        vitals: "Temp: 37.8°C (ไข้ต่ำ), Confusion Score: 2/5",
        treatment: "IV Antibiotics, Monitor Delirium/Sepsis",
      };
    case 5:
      return {
        diagnosis: "Arrhythmia (VT - ต้อง Monitor)",
        vitals: "HR: 180 bpm (Tachycardia), BP: 95/60",
        treatment: "Anti-arrhythmic Medication, Transfer to PICU/CCU",
      };
    case 6:
      return {
        diagnosis: "Upper GI Bleeding (เส้นเลือดขอดแตก/Shock)",
        vitals: "BP: 80/50 (Shock), HR: 125, Transfusion needed",
        treatment: "Emergency Resuscitation, Packed Red Cells Transfusion",
      };
    case 7:
      return {
        diagnosis: "Pneumonia (ติดเชื้อไวรัส - TPA Reject เบื้องต้น)",
        vitals: "Temp: 39.5°C, O2 Sat: 98%",
        treatment: "Symptomatic treatment, Re-evaluation for IV needed",
      };
    case 8:
      return {
        diagnosis: "Arrhythmia (VF - Post Code Blue)",
        vitals: "BP: 90/60 (Post-Resuscitation), Unconscious",
        treatment: "Hypothermia protocol, CCU Care",
      };
    case 9:
      return {
        diagnosis: "Pneumonia (DM control Poor)",
        vitals: "FBS: 250 mg/dL, Temp: 38.2°C",
        treatment: "IV Antibiotics, Insulin Drip/Sliding Scale",
      };
    case 10:
      return {
        diagnosis: "Upper GI Bleeding (จากการใช้ยา NSAIDs)",
        vitals: "Melena (อุจจาระดำ), BP: 120/80 (Stable)",
        treatment: "Stop NSAIDs, IV PPI, Observation",
      };
    default:
      return { diagnosis: "N/A", vitals: "N/A", treatment: "N/A" };
  }
};

// ฟังก์ชันจัดรูปแบบตัวเลขให้เป็นสกุลเงินบาท
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(amount);
};

// **********************************************
// Component ใหม่สำหรับแสดงรายละเอียดผู้ป่วยที่ถูกเลือก (Desktop Only)
// **********************************************
const PatientDetailCard = ({ patient, onClose }) => {
  if (!patient) return null;

  const details = getPatientDetails(patient.id);
  const selfPayCost = patient.cost - patient.approvedCost;
  const hasSelfPay = selfPayCost > 0;

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
                       {" "}
            <span className="font-semibold text-gray-700">Diagnosis:</span>    
                   {" "}
            <span className="text-red-600 font-bold">{details.diagnosis}</span> 
                   {" "}
          </p>
                   {" "}
          <p>
                       {" "}
            <span className="font-semibold text-gray-700">Vitals:</span>{" "}
            {details.vitals}         {" "}
          </p>
                   {" "}
          <p>
                       {" "}
            <span className="font-semibold text-gray-700">Treatment:</span>{" "}
            {details.treatment}         {" "}
          </p>
                 {" "}
        </div>
                {/* Financial Details */}       {" "}
        <div className="space-y-3 p-4 bg-gray-100 rounded-lg border border-gray-300">
                   {" "}
          <p className="font-bold text-gray-800 text-lg border-b border-gray-300 pb-1">
                        สรุปค่าใช้จ่ายประกัน          {" "}
          </p>
                   {" "}
          <div className="flex justify-between">
                       {" "}
            <span className="font-semibold text-gray-600">บริษัทประกัน:</span> 
                     {" "}
            <span className="font-medium text-gray-800">
              {patient.insuranceProvider}
            </span>
                     {" "}
          </div>
                   {" "}
          <div className="flex justify-between font-bold text-lg text-blue-700">
                        <span>ยอดรวมค่ารักษา:</span>           {" "}
            <span>{formatCurrency(patient.cost)}</span>         {" "}
          </div>
                   {" "}
          <div className="flex justify-between text-base border-t border-dashed pt-2">
                       {" "}
            <span className="font-semibold text-green-600">
              ยอดอนุมัติโดยประกัน:
            </span>
                       {" "}
            <span className="font-semibold text-green-600">
              {formatCurrency(patient.approvedCost)}
            </span>
                     {" "}
          </div>
                             {" "}
          <div
            className={`flex justify-between font-extrabold text-xl ${
              hasSelfPay ? "text-red-700" : "text-gray-500"
            } pt-1`}
          >
                        <span>ยอดชำระเอง (Co-pay):</span>           {" "}
            <span>{formatCurrency(selfPayCost)}</span>         {" "}
          </div>
                   {" "}
          <div className="flex justify-between pt-2">
                       {" "}
            <span className="font-semibold text-gray-600">สถานะชำระเงิน:</span> 
                     {" "}
            <span
              className={`font-bold ${
                patient.paymentStatus === "ชำระแล้ว"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
                            {patient.paymentStatus}           {" "}
            </span>
                     {" "}
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
  // Mock data ผู้ป่วย (เพิ่ม approvedCost)
  const [patients] = useState([
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
    }, // 5. เด็กหญิงใบบัว น่ารัก - Krungthai-AXA
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
    }, // 6. นายปรีชา ชนะภัย - Thai Life
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
      i: i4,
    }, // 7. นางสาวภารดี พลังจิต - Bangkok Health Insurance (TPA)
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
      i: i3,
    }, // 8. นายมานะ แข็งแกร่ง - Dhipaya Life Insurance (TPA)
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
    }, // 9. นางนวลจันทร์ อิ่มเอม - AIA
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
      i: i3,
    }, // 10. นายสุรศักดิ์ ใจดี - Allianz Ayudhya
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
      i: i4,
    }, // ผู้ป่วยนอก (OPD) - จะถูกกรองออกไป
    {
      id: 11,
      name: "ผู้ป่วยนอก 1",
      admitStatus: "OPD",
      paymentStatus: "ชำระแล้ว",
      insuranceStatus: "N/A",
      sentTime: null,
      cost: 1500,
      approvedCost: 0,
      roomNumber: "-",
      insuranceProvider: "Thai Life",
      age: 35,
      i: i5,
    },
  ]);

  const [time, setTime] = useState(new Date()); // State สำหรับเก็บ ID ของแถวที่ถูกขยาย (Mobile)
  const [expandedRowId, setExpandedRowId] = useState(null); // State สำหรับเก็บ ID ผู้ป่วยที่ถูกเลือก (Desktop)
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Update เวลาทุกๆ 1 นาที (คงเดิม)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []); // ฟังก์ชันคำนวณเวลารอประกัน (คงเดิม)

  const getWaitingTime = (sentTime) => {
    if (!sentTime) return "-";
    const diffMs = new Date() - new Date(sentTime);
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "น้อยกว่า 1 นาที";
    return `${diffMin} นาที`;
  }; // ฟังก์ชันสลับการขยายแถว (สำหรับ Mobile)

  const toggleRow = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  }; // กรองข้อมูล: แสดงเฉพาะผู้ป่วยใน (IPD)
  const ipdPatients = patients.filter((p) => p.admitStatus === "Admit"); // ดึงข้อมูลผู้ป่วยที่ถูกเลือก

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
                {/* ตารางหลัก: จะถูกซ่อนบน Mobile และแสดงบน Desktop */}       {" "}
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
              <th className="p-3 text-right text-green-300">ยอดอนุมัติ</th>     
                     {" "}
              <th className="p-3 text-right text-red-300">ยอดชำระเอง</th>       
                    <th className="p-3 text-left">สถานะชำระเงิน</th>           
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
                  key={p.id} // ไฮไลท์แถวที่ถูกเลือก และเพิ่ม onClick สำหรับ Desktop
                  className={`border-b bg-white transition cursor-pointer ${
                    selectedPatientId === p.id
                      ? "bg-indigo-100 border-l-4 border-indigo-600"
                      : "hover:bg-indigo-50"
                  }`}
                  onClick={() => setSelectedPatientId(p.id)} // **Desktop: กดแล้วตั้งค่า ID เพื่อแสดงใน PatientDetailCard**
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
                                        {formatCurrency(p.cost)}               
                     {" "}
                  </td>
                                   {" "}
                  <td className="p-3 text-right font-bold text-green-600">
                                        {formatCurrency(p.approvedCost)}       
                             {" "}
                  </td>
                                   {" "}
                  <td className="p-3 text-right font-bold text-red-600">
                                        {formatCurrency(selfPayCost)}           
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
                  <td
                    className={`p-3 font-semibold ${
                      p.insuranceStatus.includes("รอ") ||
                      p.insuranceStatus.includes("เบื้องต้น")
                        ? "text-yellow-600"
                        : p.insuranceStatus.includes("อนุมัติ")
                        ? "text-green-600"
                        : p.insuranceStatus === "ปฏิเสธ"
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                  >
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
                     {" "}
      {/* Card/Expandable Row Layout: แสดงเฉพาะบน Mobile (โค้ดเดิม) */}       {" "}
      <div className="md:hidden space-y-3">
                 {" "}
        {ipdPatients.map((p) => {
          const isExpanded = expandedRowId === p.id;
          const waitingTime = p.sentTime
            ? new Date() - new Date(p.sentTime)
            : 0;
          const isOver1h = waitingTime > 60 * 60 * 1000;
          const details = getPatientDetails(p.id);
          const selfPayCost = p.cost - p.approvedCost; // คำนวณยอดชำระเอง

          return (
            <div
              key={p.id}
              className={`bg-white rounded-lg shadow-md border-l-4 p-3 transition duration-300 ease-in-out ${
                p.insuranceStatus.includes("ปฏิเสธ") ||
                (p.insuranceStatus.includes("อนุมัติ") &&
                  selfPayCost > 0 &&
                  p.paymentStatus !== "ชำระแล้ว")
                  ? "border-red-500" // เน้นสีแดง ถ้าถูกปฏิเสธ หรือมีส่วนที่ต้องชำระเองและยังไม่จ่าย
                  : p.insuranceStatus.includes("รอ") ||
                    p.insuranceStatus.includes("เบื้องต้น")
                  ? "border-yellow-500"
                  : "border-[#2155CD]"
              }`}
            >
                              {/* Main Row (คลิกเพื่อขยาย) */}               {" "}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleRow(p.id)} // **Mobile: กดแล้วขยายแถว**
              >
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
                    <p className="font-bold text-gray-900">{p.name}</p>         
                               {" "}
                    <p className="text-sm text-gray-500">
                                              ห้อง {p.roomNumber} | **{p.age}{" "}
                      ปี**                      {" "}
                    </p>
                                       {" "}
                  </div>
                                   {" "}
                </div>
                                 {" "}
                <div className="flex flex-col items-end space-y-1">
                                     {" "}
                  <span
                    className={`font-semibold text-xs px-2 py-1 rounded-full ${
                      p.insuranceStatus.includes("รอ") ||
                      p.insuranceStatus.includes("เบื้องต้น")
                        ? "bg-yellow-100 text-yellow-800"
                        : p.insuranceStatus.includes("อนุมัติ")
                        ? "bg-green-100 text-green-800"
                        : p.insuranceStatus === "ปฏิเสธ"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                                          {p.insuranceStatus}                   {" "}
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
                              {/* Expanded Details (ซ่อน/แสดง) */}             
               {" "}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-screen pt-3 mt-3 border-t" : "max-h-0"
                }`}
              >
                                 {" "}
                <div className="space-y-3 text-sm">
                                      {/* รายละเอียดการวินิจฉัย/รักษา */}       
                             {" "}
                  <div className="bg-blue-50 p-2 rounded-md border border-blue-200">
                                         {" "}
                    <p className="font-bold text-blue-700">
                      Diagnosis: {details.diagnosis}
                    </p>
                                         {" "}
                    <p className="text-xs text-gray-600">
                      Vitals: {details.vitals}
                    </p>
                                         {" "}
                    <p className="text-xs text-gray-600">
                      Treatment: {details.treatment}
                    </p>
                                       {" "}
                  </div>
                                      {/* บริษัทประกัน */}                   {" "}
                  <div className="flex justify-between">
                                         {" "}
                    <span className="font-semibold text-gray-600">
                      บริษัทประกัน:
                    </span>
                                         {" "}
                    <span className="text-gray-800 break-words max-w-[60%] text-right font-medium">
                                              {p.insuranceProvider}             
                             {" "}
                    </span>
                                       {" "}
                  </div>
                                      {/* สรุปค่าใช้จ่าย */}                   {" "}
                  <div className="bg-gray-100 p-2 rounded-md space-y-1">
                                           {" "}
                    <div className="flex justify-between font-extrabold text-base">
                                                 {" "}
                      <span className="text-gray-800">ยอดรวมค่ารักษา:</span>   
                                             {" "}
                      <span className="text-blue-700">
                        {formatCurrency(p.cost)}
                      </span>
                                             {" "}
                    </div>
                                           {" "}
                    <div className="flex justify-between text-sm">
                                                 {" "}
                      <span className="text-green-600 font-semibold">
                        ยอดอนุมัติโดยประกัน:
                      </span>
                                                 {" "}
                      <span className="text-green-600 font-semibold">
                        {formatCurrency(p.approvedCost)}
                      </span>
                                             {" "}
                    </div>
                                           {" "}
                    <div className="flex justify-between text-sm border-t border-dashed pt-1">
                                                 {" "}
                      <span className="text-red-600 font-bold">
                        ยอดชำระเอง (Co-pay):
                      </span>
                                                 {" "}
                      <span className="text-red-600 font-bold">
                        {formatCurrency(selfPayCost)}
                      </span>
                                             {" "}
                    </div>
                                       {" "}
                  </div>
                                      {/* การชำระเงิน */}                   {" "}
                  <div className="flex justify-between">
                                         {" "}
                    <span className="font-semibold text-gray-600">
                      สถานะชำระเงิน:
                    </span>
                                         {" "}
                    <span
                      className={`font-semibold ${
                        p.paymentStatus === "ชำระแล้ว"
                          ? "text-green-600"
                          : "text-red-600" // เน้นสีแดงหากยังไม่ชำระ
                      }`}
                    >
                                              {p.paymentStatus}                 
                         {" "}
                    </span>
                                       {" "}
                  </div>
                                   {" "}
                </div>
                               {" "}
              </div>
                           {" "}
            </div>
          );
        })}
               {" "}
      </div>
                    {/* Footer / Summary (คงเดิม) */}     {" "}
      <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
               {" "}
        <p className="text-lg font-semibold text-[#2155CD]">
                    จำนวนผู้ป่วยใน (IPD):          {" "}
          <span className="text-3xl">{ipdPatients.length}</span> ราย        {" "}
        </p>
             {" "}
      </div>
         {" "}
    </div>
  );
}
