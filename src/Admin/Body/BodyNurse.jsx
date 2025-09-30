import React, { useState } from "react";
import i3 from "../../assets/3.png";
import i4 from "../../assets/4.png";
import i5 from "../../assets/5.png";
import i6 from "../../assets/6.png";
import i7 from "../../assets/7.png";

export default function BodyNurse() {
  // Mock data (จำลองข้อมูลจาก API)
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Somchai Prasert",
      age: 45,
      diagnosis: "Appendicitis",
      doctorDecision: "Admit",
      status: "รอ Admit",
      room: "Ward A - ห้อง 302",
      treatment: "เตรียมผ่าตัดไส้ติ่ง",
      i: i3,
    },
    {
      id: 2,
      name: "Warinya Thongdee",
      age: 32,
      diagnosis: "Gastroenteritis",
      doctorDecision: "OPD",
      status: "รับยากลับบ้าน",
      room: "OPD Zone B",
      treatment: "ให้ยาลดอาการอักเสบและเกลือแร่",
      i: i4,
    },
    {
      id: 3,
      name: "Anan Pholchai",
      age: 60,
      diagnosis: "Pneumonia",
      doctorDecision: "Admit",
      status: "กำลังรักษาในหอผู้ป่วย",
      room: "Ward C - ห้อง 210",
      treatment: "ให้ยาปฏิชีวนะและออกซิเจน",
      i: i5,
    },
  ]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📋 Nurse Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition"
          >
            <img src={patient.i} alt="" className="w-[200px] rounded-full" />

            <h3 className="text-lg font-semibold text-blue-700">
              {patient.name} ({patient.age} ปี)
            </h3>

            <p className="mt-1">
              <span className="font-medium">วินิจฉัยเบื้องต้น:</span>{" "}
              {patient.diagnosis}
            </p>

            <p>
              <span className="font-medium">คำสั่งแพทย์:</span>{" "}
              {patient.doctorDecision === "Admit"
                ? "นอนโรงพยาบาล"
                : "รักษาแบบผู้ป่วยนอก (OPD)"}
            </p>

            <p>
              <span className="font-medium">สถานะผู้ป่วย:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  patient.status.includes("รอ")
                    ? "bg-yellow-500"
                    : patient.status.includes("กำลัง")
                    ? "bg-blue-500"
                    : "bg-green-600"
                }`}
              >
                {patient.status}
              </span>
            </p>

            {/* เพิ่มห้องพัก */}
            <p>
              <span className="font-medium">ห้องพัก:</span> {patient.room}
            </p>

            {/* เพิ่มแผนการรักษา */}
            <p>
              <span className="font-medium">การรักษา:</span> {patient.treatment}
            </p>

            {/* Action สำหรับพยาบาล */}
            {patient.doctorDecision === "Admit" && (
              <button
                className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
                onClick={() =>
                  alert(`เริ่มดำเนินการ Admit ผู้ป่วย: ${patient.name}`)
                }
              >
                ✅ ดำเนินการ Admit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
