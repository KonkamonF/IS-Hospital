import React, { useEffect, useState } from "react";
import i3 from "../../assets/3.png";
import i4 from "../../assets/4.png";
import i5 from "../../assets/5.png";
import i6 from "../../assets/6.png";
import i7 from "../../assets/7.png";

// Mock Data ผู้ป่วยใน (Enhanced with clinical details)
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
    treatmentPlan: "Rate control with Diltiazem drip. Monitor EKG. NPO for EGD.",
    physicalExamNotes: "ชีพจรไม่สม่ำเสมอ, ผิวหนังเย็น",
    stayDays: 3,
    followUpDate: "2025-10-10",
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
    stayDays: 0,
    followUpDate: "2025-10-03",
    i: i7,
  },
  {
    id: 7,
    name: "ศิริพร คำ",
    admitStatus: "Admit", // ผู้ป่วยนอก จะถูกซ่อนในรายการนี้
    roomNumber: "-",
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
    physicalExamNotes: "",
    stayDays: 0,
    followUpDate: "",
    i: i4,
  },
];

export default function BodyDoctor() {
  // กรองเฉพาะผู้ป่วยใน (IPD) เพื่อแสดงในรายการ
  const ipdPatients = initialPatients.filter((p) => p.admitStatus === "Admit");

  // State สำหรับผู้ป่วยที่ถูกเลือก
  const [selectedPatientId, setSelectedPatientId] = useState(
    ipdPatients[0]?.id || null
  );
  const selectedPatient = ipdPatients.find((p) => p.id === selectedPatientId);

  // Form states (ใช้สำหรับเก็บข้อมูลที่แพทย์กรอกหรืออัปเดต)
  const [currentDiagnosis, setCurrentDiagnosis] = useState(
    selectedPatient?.diagnosis || ""
  );
  const [currentTreatmentPlan, setCurrentTreatmentPlan] = useState(
    selectedPatient?.treatmentPlan || ""
  );
  const [currentStayDays, setCurrentStayDays] = useState(
    selectedPatient?.stayDays || 0
  );
  const [isAdmitted, setIsAdmitted] = useState(
    selectedPatient?.admitStatus === "Admit"
  );
  // New States for enhanced form
  const [currentTemp, setCurrentTemp] = useState(selectedPatient?.temp || "");
  const [currentO2Sat, setCurrentO2Sat] = useState(selectedPatient?.o2Sat || "");
  const [currentPE, setCurrentPE] = useState(
    selectedPatient?.physicalExamNotes || ""
  );
  const [currentFollowUp, setCurrentFollowUp] = useState(
    selectedPatient?.followUpDate || ""
  );
  const [currentDisease, setCurrentDisease] = useState("pneumonia"); // สำหรับ Dropdown

  // อัปเดต Form States เมื่อเลือกผู้ป่วยใหม่
  useEffect(() => {
    if (selectedPatient) {
      setCurrentDiagnosis(selectedPatient.diagnosis || "");
      setCurrentTreatmentPlan(selectedPatient.treatmentPlan || "");
      setCurrentStayDays(selectedPatient.stayDays || 0);
      setIsAdmitted(selectedPatient.admitStatus === "Admit");
      
      // Update New States
      setCurrentTemp(selectedPatient.temp || "");
      setCurrentO2Sat(selectedPatient.o2Sat || "");
      setCurrentPE(selectedPatient.physicalExamNotes || "");
      setCurrentFollowUp(selectedPatient.followUpDate || "");

      // อัปเดต Dropdown ตาม Diagnosis (Mock logic)
      if (selectedPatient.diagnosis.includes("Pneumonia")) {
        setCurrentDisease("pneumonia");
      } else if (selectedPatient.diagnosis.includes("Arrhythmia")) {
        setCurrentDisease("arrhythmia");
      } else if (selectedPatient.diagnosis.includes("Observation")) {
        setCurrentDisease("observation");
      } else {
        setCurrentDisease("");
      }
    }
  }, [selectedPatient]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // ในระบบจริง ข้อมูลจะถูกส่งไปยัง Firebase/Database
    console.log("--- บันทึกข้อมูลการรักษา ---");
    console.log("ผู้ป่วย:", selectedPatient.name);
    console.log("อุณหภูมิ/O2 Sat:", currentTemp, "/", currentO2Sat);
    console.log("การวินิจฉัย:", currentDiagnosis);
    console.log("แผนการรักษา:", currentTreatmentPlan);
    console.log("บันทึก PE:", currentPE);
    console.log("นัดติดตามผล:", currentFollowUp);
    console.log("สถานะ Admit:", isAdmitted ? "Admit" : "Discharge/OPD");
    // ในการใช้งานจริง ควรมีข้อความแจ้งเตือนความสำเร็จบนหน้าจอแทน modal
    alert("บันทึกข้อมูลการรักษาสำเร็จแล้ว!"); // ใช้ alert เป็น mock เนื่องจากห้ามใช้ confirm/window.confirm
  };
  
  // Custom Alert/Toast Component (Simplified inline, since we must avoid window.alert)
  const AlertMessage = ({ message, type }) => {
    if (!message) return null;
    const colors = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
    };
    return (
        <div className={`border px-4 py-3 rounded relative ${colors[type]} mb-4`} role="alert">
            <span className="block sm:inline">{message}</span>
        </div>
    );
  };
  
  // Temporary state for the mock alert (using a better method than console.log)
  const [alert, setAlert] = useState(null);

  const handleMockSubmit = (e) => {
    e.preventDefault();
    setAlert({
        message: `บันทึกข้อมูลการรักษาผู้ป่วย ${selectedPatient.name} เรียบร้อยแล้ว!`,
        type: 'success'
    });
    
    // Clear the alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);
    
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
    // ปรับปรุงการจัดการความสูง: ใช้ max-h-screen เพื่อให้รายการยาวได้เต็มจอถ้ามีหลายคน
    <div className="bg-white p-4 shadow-2xl rounded-xl max-h-[85vh] md:h-full overflow-y-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        👤 รายชื่อผู้ป่วยในที่ต้องตรวจ (IPD)
      </h3>
      <ul className="space-y-3">
        {ipdPatients.map((p) => (
          <li
            key={p.id}
            onClick={() => setSelectedPatientId(p.id)}
            className={`p-3 rounded-xl cursor-pointer transition flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 
                        ${
                          p.id === selectedPatientId
                            ? "bg-[#2155CD] text-white shadow-lg border border-transparent"
                            : "bg-gray-50 hover:bg-gray-200 border border-gray-100"
                        }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={p.i}
                alt={`รูปของ ${p.name}`}
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <span className="font-medium text-base break-words">
                {p.name}
              </span>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                p.id === selectedPatientId
                  ? "bg-indigo-300 text-gray-800"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              ห้อง {p.roomNumber}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  // --- Component ย่อย: กล่องข้อมูลสุขภาพผู้ป่วย (Enhanced Bio) ---
  const PatientInfoBox = ({ patient }) => (
    <div className="bg-blue-50 border-l-4 border-[#2155CD] p-5 rounded-xl shadow-inner mb-6">
      <div className="flex items-start mb-4 border-b pb-3">
        <img
          src={patient.i}
          alt={`รูปของ ${patient.name}`}
          className="w-16 h-16 rounded-full object-cover mr-4 shadow-md"
        />
        <div>
          <h3 className="text-2xl font-bold text-[#2155CD] break-words">
            {patient.name}
          </h3>
          <p className="text-base text-gray-600 font-normal">
            ห้อง: **{patient.roomNumber}** | อายุ: **{patient.age} ปี** |{" "}
            <span
              className={`font-bold ${
                patient.stayDays > 5 ? "text-red-600" : "text-green-600"
              }`}
            >
              Admit: {patient.stayDays} วัน
            </span>
          </p>
        </div>
      </div>

      <h4 className="font-semibold text-gray-800 mb-2">
        📋 ข้อมูลชีวประวัติ & ผลการตรวจ
      </h4>
      {/* Grid: 2 คอลัมน์บนมือถือ, 3 คอลัมน์บนจอใหญ่ */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
        <div className="col-span-2 md:col-span-1">
          <p className="font-medium text-gray-700">W/H:</p>
          <p className="text-gray-600">
            {patient.weight} กก. / {patient.height} ซม.
          </p>
        </div>
        <div>
          <p className="font-medium text-gray-700">ความดันโลหิต:</p>
          <p className="text-gray-600 font-bold text-red-500">
            {patient.bloodPressure}
          </p>
        </div>
        <div>
          <p className="font-medium text-gray-700">อุณหภูมิ/O2 Sat (ล่าสุด):</p>
          <p className="text-gray-600">
            {patient.temp} °C / {patient.o2Sat} %
          </p>
        </div>
        <div className="col-span-2">
          <p className="font-medium text-gray-700">โรคประจำตัว:</p>
          <p className="text-gray-600 italic">
            {patient.chronicDisease || "ไม่มี"}
          </p>
        </div>
        <div className="col-span-2 md:col-span-3 bg-white p-3 rounded-lg border">
          <p className="font-medium text-gray-700">
            🔬 ค่าเลือด/ผลตรวจสำคัญ (Lab Results):
          </p>
          <p className="text-gray-800 font-mono text-xs mt-1 break-words">
            {patient.bloodTest}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-sans">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
        🏥 ระบบจัดการผู้ป่วยใน (IPD) สำหรับแพทย์
      </h2>
      
      {/* Grid Layout: Stacks vertically on mobile, 3 columns on desktop */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* คอลัมน์ซ้าย: รายชื่อผู้ป่วย */}
        <div className="md:col-span-1 md:h-full h-auto">
          <PatientList />
        </div>

        {/* คอลัมน์ขวา: ข้อมูลผู้ป่วยและแบบฟอร์ม */}
        <div className="md:col-span-2">
          {selectedPatient ? (
            <div className="bg-white p-4 sm:p-6 shadow-2xl rounded-xl">
              
              {/* Alert Message */}
              <AlertMessage message={alert?.message} type={alert?.type} />

              {/* 1. ส่วนแสดงข้อมูลสุขภาพของผู้ป่วย */}
              <PatientInfoBox patient={selectedPatient} />

              {/* 2. แบบฟอร์มแพทย์ */}
              <h4 className="text-xl font-bold text-[#2155CD] mb-4 border-b pb-2">
                ✍️ บันทึกการตรวจและแผนการรักษาปัจจุบัน
              </h4>

              <form onSubmit={handleMockSubmit} className="space-y-5">
                {/* กลุ่ม Vital Signs & Admission Status */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* อุณหภูมิ */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      อุณหภูมิ (°C)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={currentTemp}
                      onChange={(e) => setCurrentTemp(e.target.value)}
                      placeholder="37.0"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
                    />
                  </div>

                  {/* O2 Sat */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      O2 Saturation (%)
                    </label>
                    <input
                      type="number"
                      min="80"
                      max="100"
                      value={currentO2Sat}
                      onChange={(e) => setCurrentO2Sat(e.target.value)}
                      placeholder="98"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
                    />
                  </div>
                  
                  {/* Admission Toggle */}
                  <div className="flex items-end justify-between border-gray-200 lg:col-span-1 col-span-2">
                    <span className="text-gray-700 font-medium text-sm">
                      สถานะผู้ป่วยใน
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAdmitted(!isAdmitted)}
                      className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
                        isAdmitted ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      <span className="sr-only">Toggle Admission</span>
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          isAdmitted ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* การวินิจฉัยและโรค (Dropdown + Editable Detail) */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Dropdown โรคหลัก */}
                    <div>
                        <label
                            htmlFor="disease-select"
                            className="block text-sm font-medium text-gray-700"
                        >
                            โรคหลัก (ตาม ICD-10)
                        </label>
                        <div className="relative">
                            <select
                            id="disease-select"
                            value={currentDisease}
                            onChange={(e) => {
                                setCurrentDisease(e.target.value);
                                // Mock update: update diagnosis field to match dropdown text
                                const selectedText = e.target.options[
                                    e.target.selectedIndex
                                ].text
                                    .trim()
                                    .split("–")[0]
                                    .trim();
                                setCurrentDiagnosis(selectedText);
                            }}
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#42C2FF] appearance-none text-sm"
                            >
                            <option value="" disabled>
                                เลือกชื่อโรคหลัก...
                            </option>
                            <optgroup label="Internal Medicine">
                                <option value="pneumonia">
                                Pneumonia (ปอดอักเสบ)
                                </option>
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
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-gray-400 text-sm">▼</span>
                            </div>
                        </div>
                    </div>
                    {/* การวินิจฉัยโดยละเอียด */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            การวินิจฉัยโดยละเอียด (Diagnosis)
                        </label>
                        <input
                            type="text"
                            value={currentDiagnosis}
                            onChange={(e) => setCurrentDiagnosis(e.target.value)}
                            placeholder="ระบุการวินิจฉัยที่เฉพาะเจาะจง (เช่น Community Acquired Pneumonia)"
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
                        />
                    </div>
                </div>

                {/* แผนการรักษาและบันทึก PE */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* แผนการรักษา */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      แผนการรักษา (Management Plan)
                    </label>
                    <textarea
                      rows="4"
                      value={currentTreatmentPlan}
                      onChange={(e) => setCurrentTreatmentPlan(e.target.value)}
                      placeholder="ระบุรายละเอียดแผนการรักษา: Medication, Monitoring, Intervention..."
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
                    />
                  </div>
                  {/* บันทึกการตรวจร่างกาย (Physical Exam Notes) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      บันทึกการตรวจร่างกาย (P.E. Notes)
                    </label>
                    <textarea
                      rows="4"
                      value={currentPE}
                      onChange={(e) => setCurrentPE(e.target.value)}
                      placeholder="บันทึกผลการตรวจร่างกายที่สำคัญ (เช่น Clear lungs, Abdomen soft, No edema)"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
                    />
                  </div>
                </div>

                {/* ระยะเวลานอนและนัดติดตามผล */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* ระยะเวลานอน */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            คาดการณ์ระยะเวลานอน (วัน)
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={currentStayDays}
                            onChange={(e) =>
                                setCurrentStayDays(parseInt(e.target.value) || 0)
                            }
                            placeholder="7"
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
                        />
                    </div>
                    {/* นัดติดตามผล */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            วันที่นัดติดตามผล (Follow-up Date)
                        </label>
                        <input
                            type="date"
                            value={currentFollowUp}
                            onChange={(e) => setCurrentFollowUp(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#2155CD] text-white py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-[#1B3DA8] transition shadow-lg mt-6 text-base transform hover:scale-[1.01]"
                >
                  💾 บันทึกและอัปเดตข้อมูลผู้ป่วย
                </button>
              </form>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 bg-white rounded-xl shadow-md h-full flex flex-col items-center justify-center min-h-[400px]">
              <svg className="w-12 h-12 mb-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              <p className="font-semibold">
                กรุณาเลือกชื่อผู้ป่วยจากรายการทางซ้ายมือ
              </p>
              <p className="text-sm mt-1">
                เพื่อตรวจสอบข้อมูลสุขภาพและเริ่มบันทึกแผนการรักษา
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
