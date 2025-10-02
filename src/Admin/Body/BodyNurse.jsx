import React, { useState, useEffect } from "react";
import i3 from "../../assets/3.png";
import i4 from "../../assets/4.png";
import i5 from "../../assets/5.png";
import i6 from "../../assets/6.png";
import i7 from "../../assets/7.png";



// Map ID ผู้ป่วยกับ URL รูปภาพที่ต้องการ
const imageMap = {
  1: i3, // สมชาย ประเสริฐ (ID 1)
  3: i4, // อนันต์ พลชัย (ID 3)
  5: i5, // พิชัย มีสุข (ID 5)
  7: i6, // ศิริพร คำ (ID 7)
};

// ฟังก์ชันสำหรับดึง URL รูปภาพตาม ID
const getPatientImage = (id) => imageMap[id] || i7; // ใช้ i7 เป็นค่าเริ่มต้นหาก ID ไม่อยู่ใน Map

// Mock Data (ข้อมูลดิบที่ผู้ใช้ให้มา)
const newRawPatients = [
  {
    id: 1,
    name: "สมชาย ประเสริฐ",
    admitStatus: "Admit",
    roomNumber: "301",
    age: 45,
    weight: 78,
    height: 175,
    bloodPressure: "140/90 mmHg",
    temp: 38.5,
    o2Sat: 93,
    bloodTest: "WBC: 15.2, CRP: 85 (ติดเชื้อสูง)",
    chronicDisease: "Hypertension, Hyperlipidemia",
    diagnosis: "Pneumonia",
    treatmentPlan: "IV Ceftriaxone 1g BID for 7 days. Supportive care.",
    physicalExamNotes: "มีเสียง Rales ปอดขวา, อ่อนเพลีย",
    stayDays: 7,
    followUpDate: "2025-10-15",
    expenses: 45000.5,
  },
  {
    id: 3,
    name: "อนันต์ พลชัย",
    admitStatus: "Admit",
    roomNumber: "410",
    age: 62,
    weight: 65,
    height: 168,
    bloodPressure: "125/80 mmHg",
    temp: 36.8,
    o2Sat: 98,
    bloodTest: "Hb: 9.5 (ซีด), Platelet: 150k",
    chronicDisease: "Upper GI Bleeding history",
    diagnosis: "Arrhythmia - AF with RVR",
    treatmentPlan:
      "Rate control with Diltiazem drip. Monitor EKG. NPO for EGD.",
    physicalExamNotes: "ชีพจรไม่สม่ำเสมอ, ผิวหนังเย็น",
    stayDays: 3,
    followUpDate: "2025-10-10",
    expenses: 8900.0,
  },
  {
    id: 5,
    name: "พิชัย มีสุข",
    admitStatus: "Admit",
    roomNumber: "502",
    age: 33,
    weight: 95,
    height: 180,
    bloodPressure: "130/85 mmHg",
    temp: 37.0,
    o2Sat: 99,
    bloodTest: "LFT normal, BUN/Cr normal",
    chronicDisease: "None",
    diagnosis: "Observation - Post minor surgery",
    treatmentPlan: "Keep wound clean. Pain control PRN.",
    physicalExamNotes: "แผลผ่าตัดแห้งดี, ไม่มีบวมแดง",
    stayDays: 4,
    followUpDate: "2025-10-03",
    expenses: 15200.75,
  },
  {
    id: 7,
    name: "ศิริพร คำ",
    admitStatus: "Admit",
    roomNumber: "505",
    age: 28,
    weight: 55,
    height: 160,
    bloodPressure: "110/70 mmHg",
    temp: 36.5,
    o2Sat: 99,
    bloodTest: "Normal",
    chronicDisease: "None",
    diagnosis: "Headache (Tension type)",
    treatmentPlan: "Paracetamol PRN. Follow up if symptoms worsen.",
    physicalExamNotes: "Conscious, E4V5M6, no focal deficit.",
    stayDays: 10,
    followUpDate: "2025-10-08",
    expenses: 28750.0,
  },
];

// สถานะสำหรับผู้ป่วย
const statusOptions = [
  "รอ Admit",
  "กำลังรักษาในหอผู้ป่วย",
  "รอพบแพทย์",
  "รอผลแล็บ/X-ray",
  "รับยากลับบ้าน",
  "จำหน่ายแล้ว",
];

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);
};

// --- Function to map and enrich the user's simplified data ---
const mapPatientData = (data) => {
  // Simple heuristic to determine gender
  const determineGender = (name) => (name.includes("ศิริพร") ? "หญิง" : "ชาย");

  return data.map((p, index) => {
    const defaultAdmitDate = `2025-10-${p.stayDays ? 10 - p.stayDays : "01"}`;
    const roomPrefix = p.roomNumber ? p.roomNumber[0] : "3";
    let roomName = "Ward A";
    if (roomPrefix === "4") roomName = "Ward B";
    else if (roomPrefix === "5") roomName = "Ward C";

    // Infer priority: High for low O2Sat or high Temp. Medium for elderly or long stay.
    const inferredPriority =
      p.o2Sat <= 95 || p.temp >= 38.0
        ? "High"
        : p.age >= 60 || p.stayDays > 5
        ? "Medium"
        : "Low";

    return {
      id: p.id,
      name: p.name,
      hn: `HN00${p.id}`,
      age: p.age,
      gender: determineGender(p.name),
      contact: `08${(p.id * 11) % 100}-xxx-${p.id * 1000 + 1234}`, // Placeholder contact
      diagnosis: p.diagnosis,
      doctorDecision: p.admitStatus || "Admit",
      status:
        index === 0
          ? "กำลังรักษาในหอผู้ป่วย"
          : index === 1
          ? "รอผลแล็บ/X-ray"
          : "รอ Admit", // Set initial status based on context
      room: roomName,
      roomNumber: p.roomNumber || "N/A",
      priority: inferredPriority,
      billingStatus: index % 2 === 0 ? "ค้างชำระ" : "รอเบิกประกัน", // Placeholder
      admitDate: defaultAdmitDate,
      allergies: p.chronicDisease.includes("Hypertension")
        ? "ยาแก้ปวดกลุ่ม NSAIDs"
        : "ไม่มี", // Placeholder
      treatmentPlan: p.treatmentPlan,
      vitals: {
        temp: p.temp,
        bp: p.bloodPressure.replace(" mmHg", ""), // Simplify BP format
        hr: Math.floor(Math.random() * (100 - 65 + 1)) + 65, // Random HR
        oxygen: p.o2Sat,
        weight: p.weight, // New vital
        height: p.height, // New vital
      },
      nursingNotes: p.physicalExamNotes,
      totalBilling: p.expenses,
      imgUrl: getPatientImage(p.id), // *** เปลี่ยนมาใช้ getPatientImage(p.id) ที่มีการ map รูปภาพแล้ว ***
      bloodTest: p.bloodTest, // New field
      chronicDisease: p.chronicDisease, // New field
      stayDays: p.stayDays, // New field
    };
  });
};

const initialPatients = mapPatientData(newRawPatients);

// --- Main Component: BodyNurse ---
export default function BodyNurse() {
  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.hn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.roomNumber.includes(searchTerm)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold text-teal-800 border-b-4 border-teal-500 pb-2">
          👩‍⚕️ Nurse & Ward Management Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          ติดตามสถานะและรายละเอียดการรักษาของผู้ป่วยในความดูแล
        </p>
      </header>

      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">
          รายการผู้ป่วยทั้งหมด ({filteredPatients.length} ราย)
        </h3>
        <input
          type="text"
          placeholder="ค้นหา: ชื่อ, HN หรือห้อง..."
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- COLUMN 1: Patient List (Primary View) --- */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onSelect={() => setSelectedPatient(patient)}
                  onUpdateStatus={updatePatientStatus}
                  statusOptions={statusOptions}
                  isSelected={
                    selectedPatient && selectedPatient.id === patient.id
                  }
                />
              ))
            ) : (
              <div className="col-span-full p-8 text-center bg-white rounded-xl shadow-lg">
                <p className="text-gray-500">
                  ไม่พบข้อมูลผู้ป่วยที่ตรงกับคำค้นหา
                </p>
              </div>
            )}
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
const PatientCard = ({
  patient,
  onSelect,
  onUpdateStatus,
  statusOptions,
  isSelected,
}) => {
  // ฟังก์ชันกำหนดสีตามสถานะ
  const getStatusClass = (status) => {
    if (status.includes("รอ"))
      return "bg-yellow-100 text-yellow-800 border-yellow-500";
    if (status.includes("กำลัง"))
      return "bg-blue-100 text-blue-800 border-blue-500";
    if (status.includes("จำหน่าย"))
      return "bg-gray-100 text-gray-800 border-gray-500";
    if (status.includes("กลับบ้าน"))
      return "bg-green-100 text-green-800 border-green-600";
    return "bg-indigo-100 text-indigo-800 border-indigo-500";
  };

  // ฟังก์ชันกำหนดสีตาม Priority
  const getPriorityClass = (priority) => {
    if (priority === "High") return "bg-red-500";
    if (priority === "Medium") return "bg-yellow-500";
    return "bg-green-500";
  };

  const selectedClass = isSelected
    ? "ring-4 ring-offset-2 ring-teal-500 shadow-2xl"
    : "shadow-lg hover:shadow-xl";

  return (
    <div
      className={`border rounded-xl p-5 bg-white transition flex flex-col relative ${selectedClass}`}
    >
      {/* Priority Flag */}
      <span
        className={`absolute top-0 right-0 m-3 px-3 py-1 text-xs font-bold text-white rounded-full ${getPriorityClass(
          patient.priority
        )}`}
      >
        {patient.priority === "High"
          ? "🚨 ด่วน"
          : patient.priority === "Medium"
          ? "⚠️ ปานกลาง"
          : "🟢 ปกติ"}
      </span>

      {/* Header: Name, Age, HN */}
      <div className="flex items-start space-x-4 border-b pb-3 mb-3">
        <img
          src={patient.imgUrl}
          alt={patient.name}
          // Fallback if the placeholder URL fails
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/100x100/A0E7E5/333333?text=P";
          }}
          className="w-16 h-16 rounded-full object-cover border-2 border-teal-400"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-teal-700">{patient.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            HN: **{patient.hn}** | {patient.age} ปี
          </p>
        </div>
      </div>

      {/* Body: Diagnosis, Room, Status */}
      <div className="space-y-2 text-sm flex-grow">
        <div className="flex items-center text-gray-700">
          <span className="w-5 text-center mr-2 text-teal-600">🩺</span>
          <span className="font-medium">วินิจฉัย:</span> {patient.diagnosis}
        </div>
        <div className="flex items-center">
          <span className="w-5 text-center mr-2 text-purple-600">🛏️</span>
          <span className="font-medium">ห้องพัก:</span>{" "}
          <span className="font-bold text-purple-700">
            {patient.room} {patient.roomNumber}
          </span>
        </div>
        <div className="flex items-center pt-2">
          <span className="w-5 text-center mr-2 text-gray-600">✅</span>
          <span className="font-medium">สถานะ:</span>
          <span
            className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClass(
              patient.status
            )}`}
          >
            {patient.status}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex space-x-3">
        <button
          className="flex-1 bg-teal-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          onClick={onSelect}
        >
          📝 ดูบันทึก & รายละเอียด
        </button>

        <select
          className="w-1/3 bg-teal-50 text-teal-700 py-2 px-2 rounded-lg text-sm border border-teal-300 cursor-pointer hover:bg-teal-100 transition duration-150"
          value={patient.status}
          onChange={(e) => onUpdateStatus(patient.id, e.target.value)}
        >
          <option value="" disabled>
            เปลี่ยนสถานะ
          </option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
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
  const getBillingClass = (status) => {
    if (status === "ค้างชำระ")
      return "text-red-600 font-bold bg-red-100 p-1 rounded";
    if (status === "รอเบิกประกัน")
      return "text-orange-600 font-bold bg-orange-100 p-1 rounded";
    return "text-green-600 font-bold bg-green-100 p-1 rounded";
  };

  const VitalsItem = ({ label, value, unit, color }) => (
    <div
      className={`flex flex-col items-center justify-center p-3 rounded-xl shadow-inner ${color}`}
    >
      <p className="text-xl font-bold">
        {value}
        <span className="text-sm font-normal ml-1">{unit}</span>
      </p>
      <p className="text-xs font-medium text-gray-600">{label}</p>
    </div>
  );

  if (!patient) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4 border-l-4 border-teal-500 h-[calc(100vh-8rem)] flex items-center justify-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            ข้อมูลผู้ป่วยที่เลือก
          </h3>
          <p className="text-gray-500 text-sm">
            กรุณาเลือกผู้ป่วยจากรายการด้านซ้ายเพื่อดูรายละเอียด
          </p>
          <p className="text-xs text-gray-400 mt-4">
            (จอแสดงผลนี้จะติดตามการเลื่อนหน้าจอ)
          </p>
        </div>
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
    room,
    roomNumber,
    billingStatus,
    admitDate,
    allergies,
    nursingNotes,
    totalBilling,
    bloodTest,
    chronicDisease,
    stayDays,
  } = patient;

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl sticky top-4 border-l-8 border-teal-700 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="flex justify-between items-start border-b pb-3 mb-4">
        <div>
          <h3 className="text-2xl font-extrabold text-teal-700">{name}</h3>
          <p className="text-sm text-gray-500">
            HN: {hn} | อายุ: {age} ปี ({gender}) | อยู่ รพ. {stayDays} วัน
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-2xl font-bold transition p-1"
        >
          &times;
        </button>
      </div>

      {/* Vitals */}
      <section className="mb-4">
        <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
          ❤️ สัญญาณชีพล่าสุด (Vitals)
        </h4>
        <div className="grid grid-cols-4 gap-3 text-sm">
          <VitalsItem
            label="Temp"
            value={vitals.temp}
            unit="°C"
            color="bg-red-50 text-red-800"
          />
          <VitalsItem
            label="HR"
            value={vitals.hr}
            unit="bpm"
            color="bg-yellow-50 text-yellow-800"
          />
          <VitalsItem
            label="SpO₂"
            value={vitals.oxygen}
            unit="%"
            color="bg-green-50 text-green-800"
          />
          <VitalsItem
            label="BP"
            value={vitals.bp}
            unit="mmHg"
            color="bg-blue-50 text-blue-800"
          />
          <VitalsItem
            label="Weight"
            value={vitals.weight}
            unit="kg"
            color="bg-gray-50 text-gray-800"
          />
          <VitalsItem
            label="Height"
            value={vitals.height}
            unit="cm"
            color="bg-gray-50 text-gray-800"
          />
        </div>
      </section>

      {/* Lab and Chronic Disease */}
      <section className="mb-4 space-y-3">
        <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
          🧪 ข้อมูลทางคลินิก
        </h4>
        <div className="p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg text-sm">
          <strong className="text-gray-600 block mb-1">
            ผลตรวจเลือด/แล็บ:
          </strong>
          <p className="text-indigo-800">{bloodTest}</p>
        </div>
        <div className="p-3 bg-pink-50 border-l-4 border-pink-500 rounded-lg text-sm">
          <strong className="text-gray-600 block mb-1">โรคประจำตัว:</strong>
          <p className="text-pink-800 font-medium">
            {chronicDisease || "ไม่มี"}
          </p>
        </div>
      </section>

      {/* Medical Summary */}
      <section className="mb-4 p-4 border rounded-xl bg-gray-50">
        <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
          🩺 ข้อมูลทางการแพทย์
        </h4>
        <div className="text-sm space-y-2">
          <p>
            <strong className="text-gray-600">วินิจฉัยหลัก:</strong>{" "}
            <span className="text-teal-800 font-medium">{diagnosis}</span>
          </p>
          <p>
            <strong className="text-gray-600">คำสั่งแพทย์:</strong>{" "}
            <span
              className={`font-bold ${
                doctorDecision === "Admit" ? "text-red-600" : "text-indigo-600"
              }`}
            >
              {doctorDecision === "Admit"
                ? `Admit (${room} ${roomNumber})`
                : "OPD (ผู้ป่วยนอก)"}
            </span>
          </p>
          <p>
            <strong className="text-gray-600">อาการแพ้:</strong>{" "}
            <span className="text-red-500 italic font-semibold">
              {allergies}
            </span>
          </p>
          <div className="mt-2 p-3 bg-white border border-dashed rounded-lg">
            <strong className="text-gray-600">แผนการรักษา:</strong>{" "}
            <p className="text-green-700 italic mt-1">{treatmentPlan}</p>
          </div>
        </div>
      </section>

      {/* Status Update */}
      <section className="mb-4">
        <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
          🔄 สถานะและอัพเดท
        </h4>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-gray-700 w-1/3">อัพเดทสถานะ:</span>
          <select
            className="flex-1 bg-teal-100 text-teal-800 py-2 px-3 rounded-lg text-sm border border-teal-300 cursor-pointer font-semibold hover:bg-teal-200"
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
      </section>

      {/* Nursing Notes */}
      <section className="mb-4">
        <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
          🗒️ บันทึกพยาบาลล่าสุด
        </h4>
        <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-lg text-sm italic text-gray-700">
          <p>{nursingNotes}</p>
          <p className="text-xs text-gray-500 mt-2">Admitted: {admitDate}</p>
        </div>
      </section>

      {/* Billing Information (ค่ารักษา) */}
      <section>
        <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
          💵 ข้อมูลค่ารักษา
        </h4>
        <div className="text-sm space-y-2 bg-yellow-50 p-3 rounded-xl border border-yellow-300">
          <p>
            <strong className="text-gray-700">รวมค่ารักษา:</strong>{" "}
            <span className="text-lg font-extrabold text-teal-600">
              {formatCurrency(totalBilling)}
            </span>
          </p>
          <p>
            <strong className="text-gray-700">สถานะการเงิน:</strong>{" "}
            <span className={getBillingClass(billingStatus)}>
              {billingStatus}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};
