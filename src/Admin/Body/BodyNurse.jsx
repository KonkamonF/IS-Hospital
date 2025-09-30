import React, { useState } from "react";
// สมมติว่าไฟล์รูปภาพถูกนำเข้าตามเดิม
import i3 from "../../assets/3.png";
import i4 from "../../assets/4.png";
import i5 from "../../assets/5.png";
import i6 from "../../assets/6.png";
import i7 from "../../assets/7.png";

// Mock imports for demonstration
// const mockImage = "https://via.placeholder.com/150/007bff/ffffff?text=Patient";

export default function BodyNurse() {
  // Mock data (จำลองข้อมูลจาก API)
  const initialPatients = [
    {
      id: 1,
      name: "Somchai Prasert",
      hn: "HN001",
      age: 45,
      gender: "ชาย",
      contact: "081-xxx-1234",
      diagnosis: "Appendicitis (ไส้ติ่งอักเสบ)",
      doctorDecision: "Admit",
      status: "รอ Admit", // สถานะเริ่มต้น
      room: "Ward A - ห้อง 302",
      treatmentPlan: "เตรียมผ่าตัดไส้ติ่งพรุ่งนี้เช้า, งดน้ำและอาหาร",
      vitals: { temp: 37.5, bp: "120/80", hr: 75, oxygen: 98 },
      i: i3,
    },
    {
      id: 2,
      name: "Warinya Thongdee",
      hn: "HN002",
      age: 32,
      gender: "หญิง",
      contact: "092-xxx-5678",
      diagnosis: "Gastroenteritis (ลำไส้อักเสบ)",
      doctorDecision: "OPD",
      status: "รับยากลับบ้าน",
      room: "OPD Zone B",
      treatmentPlan: "ให้ยาลดอาการอักเสบ, เกลือแร่, นัดติดตามผล 3 วัน",
      vitals: { temp: 36.8, bp: "110/70", hr: 80, oxygen: 99 },
      i: i4,
    },
    {
      id: 3,
      name: "Anan Pholchai",
      hn: "HN003",
      age: 60,
      gender: "ชาย",
      contact: "065-xxx-9012",
      diagnosis: "Pneumonia (ปอดอักเสบ)",
      doctorDecision: "Admit",
      status: "กำลังรักษาในหอผู้ป่วย",
      room: "Ward C - ห้อง 210",
      treatmentPlan:
        "ให้ยาปฏิชีวนะทางหลอดเลือด, ออกซิเจน 2L/min, ติดตามอาการทุก 4 ชม.",
      vitals: { temp: 38.2, bp: "135/85", hr: 95, oxygen: 94 },
      i: i5,
    },
    {
      id: 4,
      name: "Anan Pholchai",
      hn: "HN003",
      age: 60,
      gender: "ชาย",
      contact: "065-xxx-9012",
      diagnosis: "Pneumonia (ปอดอักเสบ)",
      doctorDecision: "Admit",
      status: "กำลังรักษาในหอผู้ป่วย",
      room: "Ward C - ห้อง 210",
      treatmentPlan:
        "ให้ยาปฏิชีวนะทางหลอดเลือด, ออกซิเจน 2L/min, ติดตามอาการทุก 4 ชม.",
      vitals: { temp: 38.2, bp: "135/85", hr: 95, oxygen: 94 },
      i: i6,
    },
    {
      id: 5,
      name: "Anan Pholchai",
      hn: "HN003",
      age: 60,
      gender: "ชาย",
      contact: "065-xxx-9012",
      diagnosis: "Pneumonia (ปอดอักเสบ)",
      doctorDecision: "Admit",
      status: "กำลังรักษาในหอผู้ป่วย",
      room: "Ward C - ห้อง 210",
      treatmentPlan:
        "ให้ยาปฏิชีวนะทางหลอดเลือด, ออกซิเจน 2L/min, ติดตามอาการทุก 4 ชม.",
      vitals: { temp: 38.2, bp: "135/85", hr: 95, oxygen: 94 },
      i: i7,
    },
  ];

  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState(null); // สถานะสำหรับเก็บข้อมูลผู้ป่วยที่ถูกเลือกเพื่อดูรายละเอียด

  // ฟังก์ชันสำหรับเปลี่ยนสถานะของผู้ป่วย
  const updatePatientStatus = (id, newStatus) => {
    setPatients((prevPatients) =>
      prevPatients.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    // อัพเดทข้อมูลใน Detailed View ด้วย หากผู้ป่วยคนเดิม
    if (selectedPatient && selectedPatient.id === id) {
      setSelectedPatient((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // สถานะสำหรับผู้ป่วย
  const statusOptions = [
    "รอ Admit",
    "กำลังรักษาในหอผู้ป่วย",
    "รอพบแพทย์",
    "รอผลแล็บ",
    "รับยากลับบ้าน",
    "จำหน่ายแล้ว",
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-teal-700 mb-6 border-b pb-3">
        📋 Nurse Dashboard & Patient Tracking
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- COLUMN 1: Patient List (Primary View) --- */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            รายการผู้ป่วยทั้งหมด ({patients.length} ราย)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onSelect={() => setSelectedPatient(patient)}
                onUpdateStatus={updatePatientStatus}
                statusOptions={statusOptions}
              />
            ))}
          </div>
        </div>

        {/* --- COLUMN 2: Patient Detailed View (Side Panel) --- */}
        <div className="lg:col-span-1">
          <DetailedPatientView
            patient={selectedPatient}
            onClose={() => setSelectedPatient(null)}
            onUpdateStatus={updatePatientStatus}
            statusOptions={statusOptions}
          />
        </div>
      </div>
    </div>
  );
}

// --- Reusable Component: Patient Card (สำหรับแสดงใน List) ---
const PatientCard = ({ patient, onSelect, onUpdateStatus, statusOptions }) => {
  // ฟังก์ชันกำหนดสีตามสถานะ
  const getStatusClass = (status) => {
    if (status.includes("รอ")) return "bg-yellow-500";
    if (status.includes("กำลัง")) return "bg-blue-500";
    if (status.includes("จำหน่าย")) return "bg-gray-500";
    if (status.includes("กลับบ้าน")) return "bg-green-600";
    return "bg-indigo-500";
  };

  return (
    <div className="border rounded-xl shadow-lg p-5 bg-white hover:shadow-xl transition flex flex-col">
      {/* Header: Name, Age, HN */}
      <div className="flex items-center space-x-4 border-b pb-3 mb-3">
        <img
          src={patient.i}
          alt=""
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-bold text-teal-700">{patient.name}</h3>
          <p className="text-sm text-gray-500">
            HN: {patient.hn} ({patient.age} ปี)
          </p>
        </div>
      </div>

      {/* Body: Diagnosis, Room, Status */}
      <div className="space-y-2 text-sm flex-grow">
        <p>
          <span className="font-medium text-gray-600">วินิจฉัย:</span>{" "}
          {patient.diagnosis}
        </p>
        <p>
          <span className="font-medium text-gray-600">ห้องพัก:</span>{" "}
          <span className="font-semibold text-purple-700">{patient.room}</span>
        </p>
        <p className="flex items-center">
          <span className="font-medium text-gray-600 mr-2">สถานะ:</span>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusClass(
              patient.status
            )}`}
          >
            {patient.status}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex space-x-2">
        <button
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          onClick={onSelect}
        >
          👀 รายละเอียด & แผนการรักษา
        </button>

        <select
          className="w-1/3 bg-gray-200 text-gray-800 py-2 px-1 rounded-lg text-sm border border-gray-300 cursor-pointer"
          value={patient.status}
          onChange={(e) => onUpdateStatus(patient.id, e.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              เปลี่ยนเป็น: {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// --- Reusable Component: Detailed Patient View (สำหรับ Side Panel) ---
const DetailedPatientView = ({
  patient,
  onClose,
  onUpdateStatus,
  statusOptions,
}) => {
  if (!patient) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4 border-l-4 border-teal-500">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          ข้อมูลผู้ป่วยที่เลือก
        </h3>
        <p className="text-gray-500">
          กรุณาเลือกผู้ป่วยจากรายการด้านซ้ายเพื่อดูรายละเอียด
        </p>
      </div>
    );
  }

  const {
    id,
    name,
    hn,
    age,
    gender,
    contact,
    diagnosis,
    status,
    treatmentPlan,
    vitals,
    doctorDecision,
  } = patient;

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl sticky top-4 border-l-4 border-teal-700">
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold text-teal-700">{name}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-xl font-bold transition"
        >
          &times;
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        HN: {hn} | ID: {id}
      </p>

      <hr className="mb-4" />

      {/* BIO Information */}
      <h4 className="text-lg font-semibold text-gray-800 mb-2">
        📋 ข้อมูลส่วนตัว (Bio)
      </h4>
      <div className="text-sm space-y-1 mb-4 bg-gray-50 p-3 rounded">
        <p>
          <strong>อายุ:</strong> {age} ปี ({gender})
        </p>
        <p>
          <strong>เบอร์โทร:</strong> {contact}
        </p>
        <p>
          <strong>คำสั่งแพทย์:</strong>{" "}
          <span className="font-bold text-red-600">
            {doctorDecision === "Admit" ? "นอนโรงพยาบาล" : "ผู้ป่วยนอก (OPD)"}
          </span>
        </p>
      </div>

      {/* Treatment and Status */}
      <h4 className="text-lg font-semibold text-gray-800 mb-2">
        🏥 แผนการรักษาและสถานะ
      </h4>
      <div className="text-sm space-y-3">
        <p>
          <strong>วินิจฉัย:</strong> {diagnosis}
        </p>
        <p>
          <strong>แผนการรักษาปัจจุบัน:</strong>{" "}
          <span className="text-green-700 italic">{treatmentPlan}</span>
        </p>

        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">อัพเดทสถานะ:</span>
          <select
            className="flex-1 bg-teal-100 text-teal-800 py-1 px-2 rounded-lg text-sm border border-teal-300 cursor-pointer"
            value={status}
            onChange={(e) => onUpdateStatus(id, e.target.value)}
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="my-4" />

      {/* Vitals */}
      <h4 className="text-lg font-semibold text-gray-800 mb-2">
        📊 สัญญาณชีพล่าสุด
      </h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-red-50 p-2 rounded">
          <strong>อุณหภูมิ:</strong> {vitals.temp}°C
        </div>
        <div className="bg-blue-50 p-2 rounded">
          <strong>ความดัน:</strong> {vitals.bp} mmHg
        </div>
        <div className="bg-yellow-50 p-2 rounded">
          <strong>อัตราการเต้นหัวใจ:</strong> {vitals.hr} bpm
        </div>
        <div className="bg-green-50 p-2 rounded">
          <strong>ออกซิเจน:</strong> {vitals.oxygen}%
        </div>
      </div>
    </div>
  );
};
