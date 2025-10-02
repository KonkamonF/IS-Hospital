import React, { useEffect, useState, useMemo } from "react";
import {
  User,
  ClipboardList,
  TestTube,
  FileEdit,
  Save,
  ClipboardX,
  ChevronDown,
  Activity,
  HeartPulse,
  DollarSign, // เพิ่มไอคอนสำหรับค่าใช้จ่าย
} from "lucide-react";

import i3 from "../../assets/3.png";
import i4 from "../../assets/4.png";
import i5 from "../../assets/5.png";
import i6 from "../../assets/6.png";
import i7 from "../../assets/7.png";
// Placeholder URLs for the images (ใช้ placeholder แทนการ import ไฟล์ภายนอก)
// const PLACEHOLDER_IMAGES = {
//   1: "https://placehold.co/100x100/1E3A8A/FFFFFF?text=SM", // สมชาย
//   3: "https://placehold.co/100x100/065F46/FFFFFF?text=AN", // อนันต์
//   5: "https://placehold.co/100x100/7C2D12/FFFFFF?text=PC", // พิชัย
//   7: "https://placehold.co/100x100/5B21B6/FFFFFF?text=SP", // ศิริพร
// };

// Mock Data ผู้ป่วยใน (Enhanced with clinical details and CURRENT EXPENSES)
const initialPatients = [
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
    expenses: 45000.5, // ค่าใช้จ่ายปัจจุบัน
    i: i3,
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
    expenses: 8900.0, // ค่าใช้จ่ายปัจจุบัน
    i: i5,
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
    expenses: 15200.75, // ค่าใช้จ่ายปัจจุบัน
    i: i6,
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
    expenses: 28750.0, // ค่าใช้จ่ายปัจจุบัน
    i: i7,
  },
];

// Custom Alert/Toast Component
const AlertMessage = ({ alert, setAlert }) => {
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  if (!alert) return null;

  const colors = {
    success: "bg-green-50 border-green-400 text-green-700",
    error: "bg-red-50 border-red-400 text-red-700",
  };
  const icon =
    alert.type === "success" ? (
      <svg
        className="w-5 h-5 mr-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ) : (
      <svg
        className="w-5 h-5 mr-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    );

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl border ${
        colors[alert.type]
      } transition-all duration-300 ease-out`}
      role="alert"
      style={{ minWidth: "300px" }}
    >
      <div className="flex items-center">
        {icon}
        <span className="font-medium text-sm">{alert.message}</span>
      </div>
    </div>
  );
};

export default function App() {
  // กรองเฉพาะผู้ป่วยใน (IPD) เพื่อแสดงในรายการ
  const ipdPatients = useMemo(
    () => initialPatients.filter((p) => p.admitStatus === "Admit"),
    []
  );

  // State สำหรับผู้ป่วยที่ถูกเลือก
  const [selectedPatientId, setSelectedPatientId] = useState(
    ipdPatients[0]?.id || null
  );
  const selectedPatient = useMemo(
    () => ipdPatients.find((p) => p.id === selectedPatientId),
    [selectedPatientId, ipdPatients]
  );

  // Form states
  const [currentDiagnosis, setCurrentDiagnosis] = useState("");
  const [currentTreatmentPlan, setCurrentTreatmentPlan] = useState("");
  const [currentStayDays, setCurrentStayDays] = useState(0);
  const [isAdmitted, setIsAdmitted] = useState(true);
  const [currentTemp, setCurrentTemp] = useState("");
  const [currentO2Sat, setCurrentO2Sat] = useState("");
  const [currentPE, setCurrentPE] = useState("");
  const [currentFollowUp, setCurrentFollowUp] = useState("");
  const [currentDisease, setCurrentDisease] = useState("pneumonia"); // สำหรับ Dropdown

  const [alert, setAlert] = useState(null);

  // อัปเดต Form States เมื่อเลือกผู้ป่วยใหม่
  useEffect(() => {
    if (selectedPatient) {
      setCurrentDiagnosis(selectedPatient.diagnosis || "");
      setCurrentTreatmentPlan(selectedPatient.treatmentPlan || "");
      setCurrentStayDays(selectedPatient.stayDays || 0);
      setIsAdmitted(selectedPatient.admitStatus === "Admit");

      setCurrentTemp(selectedPatient.temp || "");
      setCurrentO2Sat(selectedPatient.o2Sat || "");
      setCurrentPE(selectedPatient.physicalExamNotes || "");
      setCurrentFollowUp(selectedPatient.followUpDate || "");

      // Mock logic for dropdown selection based on diagnosis
      if (selectedPatient.diagnosis.toLowerCase().includes("pneumonia")) {
        setCurrentDisease("pneumonia");
      } else if (
        selectedPatient.diagnosis.toLowerCase().includes("arrhythmia")
      ) {
        setCurrentDisease("arrhythmia");
      } else if (
        selectedPatient.diagnosis.toLowerCase().includes("observation")
      ) {
        setCurrentDisease("observation");
      } else if (selectedPatient.diagnosis.toLowerCase().includes("headache")) {
        setCurrentDisease("headache");
      } else {
        setCurrentDisease("");
      }
    }
  }, [selectedPatient]);

  const handleMockSubmit = (e) => {
    e.preventDefault();

    if (!selectedPatient) {
      setAlert({
        message: "กรุณาเลือกผู้ป่วยที่ต้องการบันทึกข้อมูลก่อน",
        type: "error",
      });
      return;
    }

    setAlert({
      message: `บันทึกข้อมูลการรักษาผู้ป่วย ${selectedPatient.name} เรียบร้อยแล้ว!`,
      type: "success",
    });

    // Log the data for demonstration
    console.log("--- บันทึกข้อมูลการรักษา ---");
    console.log("ผู้ป่วย:", selectedPatient.name);
    console.log("อุณหภูมิ/O2 Sat:", currentTemp, "/", currentO2Sat);
    console.log("การวินิจฉัย:", currentDiagnosis);
    console.log("แผนการรักษา:", currentTreatmentPlan);
    console.log("บันทึก PE:", currentPE);
    console.log("นัดติดตามผล:", currentFollowUp);
    console.log("สถานะ Admit:", isAdmitted ? "Admit" : "Discharge/OPD");
  };

  // --- Component ย่อย: รายชื่อผู้ป่วย (ซ้ายมือ) ---
  const PatientList = () => (
    <div className="bg-white p-4 shadow-xl rounded-xl max-h-[85vh] md:h-full overflow-y-auto border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-100 pb-2 flex items-center">
        <User className="w-5 h-5 mr-2 text-[#2155CD]" />
        รายการผู้ป่วยในที่ต้องตรวจ (IPD)
      </h3>
      <ul className="space-y-3">
        {ipdPatients.map((p) => (
          <li
            key={p.id}
            onClick={() => setSelectedPatientId(p.id)}
            className={`p-3 rounded-xl cursor-pointer transition flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 
                        hover:ring-2 hover:ring-offset-2 hover:ring-[#42C2FF]
                        ${
                          p.id === selectedPatientId
                            ? "bg-[#2155CD] text-white shadow-lg border border-transparent ring-2 ring-offset-2 ring-[#42C2FF]"
                            : "bg-gray-50 text-gray-800 hover:bg-indigo-50 border border-gray-100"
                        }`}
          >
            <div className="flex items-center space-x-3">
              {/* แสดงรูปภาพ */}
              <img
                src={p.i}
                alt={`รูปของ ${p.name}`}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-inner"
              />
              <span className="font-semibold text-base break-words">
                {p.name}
              </span>
            </div>
            {/* แสดงห้องและค่าใช้จ่าย */}
            <div className="flex flex-col items-end space-y-1 sm:space-y-0">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                  p.id === selectedPatientId
                    ? "bg-indigo-300 text-gray-800"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                ห้อง {p.roomNumber}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap flex items-center
                        ${
                          p.expenses > 30000
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }
                    `}
              >
                <DollarSign className="w-3 h-3 mr-1" />
                {p.expenses.toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  // --- Component ย่อย: กล่องข้อมูลสุขภาพผู้ป่วย (Enhanced Bio) ---
  const PatientInfoBox = ({ patient }) => (
    <div className="bg-blue-50 border-l-4 border-[#2155CD] p-5 rounded-xl shadow-inner mb-6">
      <div className="flex items-start mb-4 border-b border-blue-200 pb-3">
        <img
          src={patient.i}
          alt={`รูปของ ${patient.name}`}
          className="w-16 h-16 rounded-full object-cover mr-4 shadow-md"
        />
        <div>
          <h3 className="text-2xl font-extrabold text-[#2155CD] break-words">
            {patient.name}
          </h3>
          <p className="text-sm text-gray-600 font-normal mt-1">
            ห้อง:{" "}
            <span className="font-bold text-gray-800">
              {patient.roomNumber}
            </span>{" "}
            | อายุ: <span className="font-bold">{patient.age} ปี</span>
          </p>
          <p
            className={`font-bold text-sm mt-1 flex items-center ${
              patient.stayDays > 5 ? "text-red-600" : "text-green-600"
            }`}
          >
            <HeartPulse className="w-4 h-4 mr-1" />
            Admit: {patient.stayDays} วันแล้ว
          </p>
        </div>
      </div>

      {/* ข้อมูลการเงิน */}
      <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
        <DollarSign className="w-5 h-5 mr-2 text-green-600" />
        สถานะค่าใช้จ่ายปัจจุบัน
      </h4>
      <div className="bg-white border border-green-300 p-3 rounded-lg flex justify-between items-center shadow-md mb-6">
        <p className="font-medium text-gray-700">ค่าใช้จ่ายรวม ณ วันนี้:</p>
        <p
          className={`text-xl font-extrabold ${
            patient.expenses > 30000 ? "text-red-600" : "text-green-600"
          }`}
        >
          {patient.expenses.toLocaleString("th-TH", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 2,
          })}
        </p>
      </div>

      <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
        <ClipboardList className="w-5 h-5 mr-2 text-indigo-600" />
        ข้อมูลชีวประวัติ & ผลการตรวจ
      </h4>
      {/* Grid: 2 คอลัมน์บนมือถือ, 3 คอลัมน์บนจอใหญ่ */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
        {/* W/H & BP */}
        <InfoItem
          title="W/H"
          value={`${patient.weight} กก. / ${patient.height} ซม.`}
        />
        <InfoItem
          title="ความดันโลหิต"
          value={patient.bloodPressure}
          valueClass="font-bold text-red-600"
        />

        {/* Vitals */}
        <InfoItem
          title="อุณหภูมิ/O2 Sat (ล่าสุด)"
          value={`${patient.temp} °C / ${patient.o2Sat} %`}
        />

        {/* Chronic Disease - Full row on mobile/desktop */}
        <div className="col-span-2 lg:col-span-3">
          <p className="font-medium text-gray-700 mb-1">โรคประจำตัว:</p>
          <p className="text-gray-600 italic bg-white p-2 rounded-lg border border-gray-200 text-xs">
            {patient.chronicDisease || "ไม่มี"}
          </p>
        </div>

        {/* Lab Results - Full row on mobile/desktop */}
        <div className="col-span-2 lg:col-span-3 bg-white p-3 rounded-lg border border-red-300 shadow-md">
          <p className="font-bold text-gray-700 flex items-center mb-1">
            <TestTube className="w-4 h-4 mr-2 text-red-500" />
            ค่าเลือด/ผลตรวจสำคัญ (Lab Results):
          </p>
          <p className="text-gray-800 font-mono text-xs break-words whitespace-pre-wrap">
            {patient.bloodTest}
          </p>
        </div>
      </div>
    </div>
  );

  // Helper Component for Info Boxes
  const InfoItem = ({ title, value, valueClass = "text-gray-600" }) => (
    <div>
      <p className="font-medium text-gray-700 mb-1 text-xs">{title}:</p>
      <p className={`text-sm ${valueClass}`}>{value}</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen font-sans">
      <AlertMessage alert={alert} setAlert={setAlert} />

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-[#2155CD] pb-3">
        <Activity className="inline w-7 h-7 mr-2 text-[#2155CD]" />
        ระบบจัดการผู้ป่วยใน (IPD) สำหรับแพทย์
      </h1>

      {/* Grid Layout: Stacks vertically on mobile, 1:2 ratio on desktop */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* คอลัมน์ซ้าย: รายชื่อผู้ป่วย */}
        <div className="md:col-span-1 md:h-full h-auto">
          <PatientList />
        </div>

        {/* คอลัมน์ขวา: ข้อมูลผู้ป่วยและแบบฟอร์ม */}
        <div className="md:col-span-2">
          {selectedPatient ? (
            <div className="bg-white p-4 sm:p-6 shadow-2xl rounded-xl border border-gray-200">
              {/* 1. ส่วนแสดงข้อมูลสุขภาพของผู้ป่วย */}
              <PatientInfoBox patient={selectedPatient} />

              {/* 2. แบบฟอร์มแพทย์ */}
              <h4 className="text-xl font-bold text-[#2155CD] mb-5 border-b-2 border-indigo-100 pb-2 flex items-center">
                <FileEdit className="w-5 h-5 mr-2 text-[#2155CD]" />
                บันทึกการตรวจและแผนการรักษาปัจจุบัน
              </h4>

              <form onSubmit={handleMockSubmit} className="space-y-6">
                {/* กลุ่ม Vital Signs & Admission Status */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* อุณหภูมิ */}
                  <FormInput
                    label="อุณหภูมิ (°C)"
                    type="number"
                    step="0.1"
                    value={currentTemp}
                    onChange={(e) => setCurrentTemp(e.target.value)}
                    placeholder="37.0"
                  />

                  {/* O2 Sat */}
                  <FormInput
                    label="O2 Saturation (%)"
                    type="number"
                    min="80"
                    max="100"
                    value={currentO2Sat}
                    onChange={(e) => setCurrentO2Sat(e.target.value)}
                    placeholder="98"
                  />

                  {/* Admission Toggle */}
                  <div className="flex flex-col justify-end pt-2">
                    <span className="text-gray-700 font-medium text-sm mb-1 block">
                      สถานะผู้ป่วย
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAdmitted(!isAdmitted)}
                      className={`relative inline-flex h-10 w-full items-center justify-between rounded-lg px-3 transition shadow-md font-bold text-white ${
                        isAdmitted
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      <span>{isAdmitted ? "✅ Admit" : "❌ Discharge"}</span>
                      <span className="sr-only">Toggle Admission</span>
                    </button>
                  </div>
                </div>

                {/* การวินิจฉัยและโรค (Dropdown + Editable Detail) */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Dropdown โรคหลัก */}
                  <div className="relative">
                    <label
                      htmlFor="disease-select"
                      className="block text-sm font-medium text-gray-700"
                    >
                      โรคหลัก (ตาม ICD-10)
                    </label>
                    <select
                      id="disease-select"
                      value={currentDisease}
                      onChange={(e) => {
                        setCurrentDisease(e.target.value);
                        const selectedText = e.target.options[
                          e.target.selectedIndex
                        ].text
                          .trim()
                          .split("(")[0]
                          .trim();
                        setCurrentDiagnosis(selectedText);
                      }}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#42C2FF] appearance-none text-sm shadow-sm"
                    >
                      <option value="" disabled>
                        เลือกชื่อโรคหลัก...
                      </option>
                      <optgroup label="Internal Medicine">
                        <option value="pneumonia">Pneumonia (ปอดอักเสบ)</option>
                        <option value="observation">
                          Observation (สังเกตอาการ)
                        </option>
                      </optgroup>
                      <optgroup label="Cardiology">
                        <option value="arrhythmia">
                          Arrhythmia (ภาวะหัวใจเต้นผิดจังหวะ)
                        </option>
                      </optgroup>
                      <optgroup label="Gastroenterology">
                        <option value="upper-gi-bleeding">
                          Upper GI Bleeding (เลือดออกทางเดินอาหารส่วนบน)
                        </option>
                      </optgroup>
                      <optgroup label="Neurology">
                        <option value="headache">Headache (ปวดศีรษะ)</option>
                      </optgroup>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 mt-7">
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  {/* การวินิจฉัยโดยละเอียด */}
                  <FormInput
                    label="การวินิจฉัยโดยละเอียด (Diagnosis)"
                    type="text"
                    value={currentDiagnosis}
                    onChange={(e) => setCurrentDiagnosis(e.target.value)}
                    placeholder="ระบุการวินิจฉัยที่เฉพาะเจาะจง"
                  />
                </div>

                {/* แผนการรักษาและบันทึก PE */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* แผนการรักษา */}
                  <FormTextarea
                    label="แผนการรักษา (Management Plan)"
                    rows="4"
                    value={currentTreatmentPlan}
                    onChange={(e) => setCurrentTreatmentPlan(e.target.value)}
                    placeholder="ระบุรายละเอียดแผนการรักษา: Medication, Monitoring, Intervention..."
                  />
                  {/* บันทึกการตรวจร่างกาย (Physical Exam Notes) */}
                  <FormTextarea
                    label="บันทึกการตรวจร่างกาย (P.E. Notes)"
                    rows="4"
                    value={currentPE}
                    onChange={(e) => setCurrentPE(e.target.value)}
                    placeholder="บันทึกผลการตรวจร่างกายที่สำคัญ"
                  />
                </div>

                {/* ระยะเวลานอนและนัดติดตามผล */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* ระยะเวลานอน */}
                  <FormInput
                    label="คาดการณ์ระยะเวลานอน (วัน)"
                    type="number"
                    min="0"
                    value={currentStayDays}
                    onChange={(e) =>
                      setCurrentStayDays(parseInt(e.target.value) || 0)
                    }
                    placeholder="7"
                  />
                  {/* นัดติดตามผล */}
                  <FormInput
                    label="วันที่นัดติดตามผล (Follow-up Date)"
                    type="date"
                    value={currentFollowUp}
                    onChange={(e) => setCurrentFollowUp(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#2155CD] text-white py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-[#1B3DA8] transition shadow-xl mt-6 text-base transform hover:scale-[1.005] flex items-center justify-center ring-4 ring-offset-2 ring-blue-300"
                >
                  <Save className="w-5 h-5 mr-2" />
                  บันทึกและอัปเดตข้อมูลผู้ป่วย
                </button>
              </form>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 bg-white rounded-xl shadow-md h-full flex flex-col items-center justify-center min-h-[500px] border border-gray-200">
              <ClipboardX className="w-16 h-16 mb-4 text-indigo-400" />
              <p className="font-bold text-xl text-gray-700">
                กรุณาเลือกชื่อผู้ป่วยจากรายการทางซ้ายมือ
              </p>
              <p className="text-base mt-2">
                เพื่อตรวจสอบข้อมูลสุขภาพและเริ่มบันทึกแผนการรักษา
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Form Input Component
const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  step,
  min,
  max,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      step={step}
      min={min}
      max={max}
      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#42C2FF] shadow-sm"
    />
  </div>
);

// Reusable Textarea Component
const FormTextarea = ({ label, rows, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#42C2FF] shadow-sm"
    />
  </div>
);
