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
    name: "Somchai Prasert",
    admitStatus: "Admit",
    roomNumber: "301",
    age: 45,
    weight: 78,
    height: 175,
    bloodPressure: "140/90 mmHg",
    bloodTest: "WBC: 15.2, CRP: 85 (ติดเชื้อสูง)",
    chronicDisease: "Hypertension, Hyperlipidemia",
    diagnosis: "Pneumonia",
    treatmentPlan: "IV Ceftriaxone 1g BID for 7 days.",
    stayDays: 7,
    i: i3,
  },
  {
    id: 3,
    name: "Anan Pholchai",
    admitStatus: "Admit",
    roomNumber: "410",
    age: 62,
    weight: 65,
    height: 168,
    bloodPressure: "125/80 mmHg",
    bloodTest: "Hb: 9.5 (ซีด), Platelet: 150k",
    chronicDisease: "Upper GI Bleeding history",
    diagnosis: "Arrhythmia - AF with RVR",
    treatmentPlan: "Rate control with Diltiazem drip. Monitor EKG.",
    stayDays: 3,
    i: i5,
  },
  {
    id: 5,
    name: "Pichai Meesuk",
    admitStatus: "Admit",
    roomNumber: "502",
    age: 33,
    weight: 95,
    height: 180,
    bloodPressure: "130/85 mmHg",
    bloodTest: "LFT normal, BUN/Cr normal",
    chronicDisease: "None",
    diagnosis: "",
    treatmentPlan: "",
    stayDays: 0,
    i: i7,
  },
  {
    id: 7,
    name: "Siriporn Kum",
    admitStatus: "OPD", // ผู้ป่วยนอก จะถูกซ่อนในรายการนี้
    roomNumber: "-",
    age: 28,
    weight: 55,
    height: 160,
    bloodPressure: "110/70 mmHg",
    bloodTest: "Normal",
    chronicDisease: "None",
    diagnosis: "",
    treatmentPlan: "",
    stayDays: 0,
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
  const [currentDisease, setCurrentDisease] = useState("pneumonia"); // สำหรับ Dropdown

  // อัปเดต Form States เมื่อเลือกผู้ป่วยใหม่
  useEffect(() => {
    if (selectedPatient) {
      setCurrentDiagnosis(selectedPatient.diagnosis || "");
      setCurrentTreatmentPlan(selectedPatient.treatmentPlan || "");
      setCurrentStayDays(selectedPatient.stayDays || 0);
      setIsAdmitted(selectedPatient.admitStatus === "Admit");
      // สมมติว่าโรคถูกซิงค์จาก diagnosis
      setCurrentDisease(
        selectedPatient.diagnosis.includes("Pneumonia")
          ? "pneumonia"
          : "arrhythmia"
      );
    }
  }, [selectedPatient]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // ในระบบจริง ข้อมูลจะถูกส่งไปยัง Firebase/Database
    console.log("บันทึกข้อมูลการรักษาสำหรับ:", selectedPatient.name);
    console.log("การวินิจฉัย:", currentDiagnosis);
    console.log("แผนการรักษา:", currentTreatmentPlan);
    console.log("จำนวนวันนอน:", currentStayDays);
    console.log("สถานะ Admit:", isAdmitted ? "Admit" : "Discharge/OPD");
    // ในการใช้งานจริง ควรมีข้อความแจ้งเตือนความสำเร็จบนหน้าจอแทน
  };

  // --- Component ย่อย: รายชื่อผู้ป่วย (ซ้ายมือ) ---
  const PatientList = () => (
    // ปรับปรุงการจัดการความสูง: ใช้ max-h-96 สำหรับมือถือเพื่อจำกัดความสูงของรายการ
    <div className="bg-white p-4 shadow-xl rounded-xl max-h-96 md:h-full overflow-y-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
        ผู้ป่วยในที่ต้องตรวจ (IPD)
      </h3>
      <ul className="space-y-2">
        {ipdPatients.map((p) => (
          <li
            key={p.id}
            onClick={() => setSelectedPatientId(p.id)}
            className={`p-3 rounded-lg cursor-pointer transition flex justify-between items-center 
                        ${
                          p.id === selectedPatientId
                            ? "bg-[#2155CD] text-white shadow-md font-bold"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
          >
            <img src={p.i} alt="" className="w-[100px] rounded-full" />
            <span className="font-medium">{p.name}</span>
            <span
              className={`text-xs ${
                p.id === selectedPatientId ? "text-indigo-200" : "text-gray-500"
              }`}
            >
              ห้อง {p.roomNumber}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  // --- Component ย่อย: กล่องข้อมูลสุขภาพผู้ป่วย ---
  const PatientInfoBox = ({ patient }) => (
    <div className="bg-blue-50 border-l-4 border-[#2155CD] p-5 rounded-xl shadow-inner mb-6">
      <img src={patient.i} alt="" className="w-[200px] rounded-full" />
      <h3 className="text-2xl font-bold text-[#2155CD] mb-3 break-words">
        {patient.name}
        {/* ปรับให้เลขห้องอยู่บรรทัดใหม่บนมือถือและอยู่บรรทัดเดียวกับชื่อบนจอใหญ่ */}
        <span className="text-sm text-gray-600 font-normal ml-2 block sm:inline-block">
          (ห้อง {patient.roomNumber})
        </span>
      </h3>
      {/* Grid ปรับเป็น 1 คอลัมน์บนมือถือ และ 2 คอลัมน์บนจอเล็กขึ้นไป */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <p>
          <span className="font-semibold text-gray-700">อายุ:</span>{" "}
          {patient.age} ปี
        </p>
        <p>
          <span className="font-semibold text-gray-700">น้ำหนัก/ส่วนสูง:</span>{" "}
          {patient.weight} กก. / {patient.height} ซม.
        </p>
        <p>
          <span className="font-semibold text-gray-700">ความดันโลหิต:</span>{" "}
          {patient.bloodPressure}
        </p>
        <p>
          <span className="font-semibold text-gray-700">โรคประจำตัว:</span>{" "}
          {patient.chronicDisease || "ไม่มี"}
        </p>
        <div className="col-span-1 sm:col-span-2 text-wrap break-words">
          <span className="font-semibold text-gray-700">ค่าเลือด & อื่นๆ:</span>{" "}
          {patient.bloodTest}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
        🩺 Doctor Patient Management
      </h2>

      {/* Grid Layout: Stacks vertically on mobile, 3 columns on desktop */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* คอลัมน์ซ้าย: รายชื่อผู้ป่วย */}
        <div className="md:col-span-1 md:h-[80vh] h-auto">
          <PatientList />
        </div>

        {/* คอลัมน์ขวา: ข้อมูลผู้ป่วยและแบบฟอร์ม */}
        <div className="md:col-span-2">
          {selectedPatient ? (
            <div className="bg-white p-4 sm:p-6 shadow-2xl rounded-xl">
              {/* 1. ส่วนแสดงข้อมูลสุขภาพของผู้ป่วย */}
              <PatientInfoBox patient={selectedPatient} />

              {/* 2. แบบฟอร์มแพทย์ */}
              <h4 className="text-xl font-bold text-[#2155CD] mb-4 border-b pb-2">
                แบบฟอร์มการวินิจฉัยและแผนการรักษา
              </h4>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* โรค (Diagnosis) */}
                <div>
                  <label
                    htmlFor="disease-select"
                    className="block text-sm font-medium text-gray-700"
                  >
                    โรค
                  </label>
                  <div className="relative">
                    <select
                      id="disease-select"
                      value={currentDisease}
                      onChange={(e) => {
                        setCurrentDisease(e.target.value);
                        // อัปเดต diagnosis field ให้ดูสอดคล้องกัน (Mock)
                        const selectedOption = e.target.options[
                          e.target.selectedIndex
                        ].text
                          .trim()
                          .split("–")[0]
                          .trim();
                        setCurrentDiagnosis(selectedOption);
                      }}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10
                                 focus:outline-none focus:ring-2 focus:ring-[#42C2FF] appearance-none text-sm"
                    >
                      <option value="" disabled>
                        เลือกชื่อโรค...
                      </option>
                      <optgroup label="Internal Medicine">
                        <option value="pneumonia">
                          Pneumonia – ไข้ หอบ ใช้ IV antibiotics
                        </option>
                      </optgroup>
                      <optgroup label="Cardiology">
                        <option value="arrhythmia">
                          Arrhythmia – AF with RVR, VT, VF → ต้อง Monitor
                        </option>
                      </optgroup>
                      <optgroup label="gastroenterology">
                        <option value="upper-gi-bleeding">
                          Upper GI Bleeding – แผลในกระเพาะ, เส้นเลือดขอดแตก
                        </option>
                      </optgroup>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-400 text-xs">▼</span>
                    </div>
                  </div>
                </div>

                {/* การวินิจฉัย (Editable text based on dropdown choice) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    การวินิจฉัยโดยละเอียด (Diagnosis)
                  </label>
                  <input
                    type="text"
                    value={currentDiagnosis}
                    onChange={(e) => setCurrentDiagnosis(e.target.value)}
                    placeholder="กรอกชื่อโรคหรือการวินิจฉัย..."
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                                focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
                  />
                </div>

                {/* Admission Toggle (ให้สิทธิ์แพทย์เปลี่ยนแปลงสถานะ) */}
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-gray-700 font-medium text-sm">
                    สถานะผู้ป่วยใน (Admission)
                  </span>
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
                  <div className="space-y-4 pt-2">
                    {/* แผนการรักษา */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        แผนการรักษา
                      </label>
                      <textarea
                        rows="3"
                        value={currentTreatmentPlan}
                        onChange={(e) =>
                          setCurrentTreatmentPlan(e.target.value)
                        }
                        placeholder="ระบุรายละเอียดแผนการรักษา..."
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
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
                        value={currentStayDays}
                        onChange={(e) =>
                          setCurrentStayDays(parseInt(e.target.value) || 0)
                        }
                        placeholder="กรุณาใส่ตัวเลข"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                                      focus:outline-none focus:ring-2 focus:ring-[#42C2FF]"
                      />
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#2155CD] text-white py-2 rounded-lg font-medium hover:bg-[#1B3DA8] transition shadow-md mt-6 text-base"
                >
                  บันทึกข้อมูลการรักษา
                </button>
              </form>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 bg-white rounded-xl shadow-md h-full flex items-center justify-center min-h-[400px]">
              กรุณาเลือกชื่อผู้ป่วยจากรายการทางซ้ายมือเพื่อเริ่มบันทึกข้อมูล
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
