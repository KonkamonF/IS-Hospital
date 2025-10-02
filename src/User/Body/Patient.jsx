import React, { useState } from "react";

// **********************************************
// MOCK DATA
// **********************************************

// ข้อมูลจำลองสำหรับผู้ป่วย
const patientData = {
  name: "นายชาญชัย มั่นคง",
  patientId: "P001001",
  insuranceBalance: "100,000 บาท", 
  policyInfo: "AIA - Prestige Health",
  outstandingPayment: "45,000 บาท", 
  room: "ห้องเดี่ยวพิเศษ (VIP) 501",
  treatmentPlan: "IV Ceftriaxone, Monitor O2 Saturation",
  doctorDiagnosis: "Pneumonia (ปอดอักเสบ)",
};

// ข้อมูลการแจ้งเตือนจำลอง
const alerts = [
  "⚠️ คุณมียอดค้างชำระจากบริษัทประกันจำนวน 45,000 บาท กรุณาตรวจสอบสถานะการชำระ",
  "กรมธรรม์จะหมดอายุใน 30 วัน (ต่ออายุ)",
  "หากเกิน 1 ชั่วโมง กรุณาติดต่อเจ้าหน้าที่เพื่อเร่งรัดการดำเนินการ",
];

// ข้อมูลเพิ่มเติมสำหรับแสดงใน Modal
const detailContent = {
    payment: {
        title: "ยอดค่าชำระคงค้าง",
        details: [
            { label: "ยอดรวมค่ารักษา", value: "฿145,000" },
            { label: "ยอดที่ประกันอนุมัติ", value: "฿100,000" },
            { label: "ยอดที่ผู้ป่วยต้องชำระเอง", value: "฿45,000", color: "text-red-600 font-bold" },
            { label: "กำหนดชำระ", value: "30 ต.ค. 2568" },
        ],
    },
    insurance: {
        title: "ข้อมูลประกันและกรมธรรม์",
        details: [
            { label: "บริษัทประกัน", value: patientData.policyInfo.split(' - ')[0] },
            { label: "ชื่อกรมธรรม์", value: patientData.policyInfo.split(' - ')[1] },
            { label: "วงเงินคงเหลือ (IPD)", value: patientData.insuranceBalance, color: "text-green-600 font-bold" },
            { label: "วันหมดอายุ", value: "25 พ.ย. 2568" },
        ],
    },
    diagnosis: {
        title: "คำวินิจฉัยและประวัติการรักษา",
        details: [
            { label: "แพทย์วินิจฉัย", value: patientData.doctorDiagnosis, color: "text-indigo-600 font-bold" },
            { label: "แผนการรักษาปัจจุบัน", value: patientData.treatmentPlan },
            { label: "วันเริ่ม Admit", value: "22 ต.ค. 2568" },
            { label: "อาการที่พบล่าสุด", value: "ไข้สูง 38.8°C, O2 Sat 94%" },
        ],
    },
    treatment: {
        title: "ข้อมูลห้องพักและแผนการรักษา",
        details: [
            { label: "ห้องพักปัจจุบัน", value: patientData.room, color: "text-purple-600 font-bold" },
            { label: "ประเภทห้อง", value: "เดี่ยวพิเศษ (VIP)" },
            { label: "แผนการรักษา", value: patientData.treatmentPlan },
            { label: "สถานะ", value: "อยู่ระหว่างการรักษา" },
        ],
    },
    alert: {
        title: "รายละเอียดการแจ้งเตือน",
        details: [{ label: "การแจ้งเตือนที่ถูกเลือก", value: "" }] // จะถูกแทนที่ด้วยข้อความ alert จริง
    }
};

// **********************************************
// Component: PatientDetailModal (Modal แสดงรายละเอียด)
// **********************************************
const PatientDetailModal = ({ detailKey, alertText, onClose }) => {
    if (!detailKey) return null;

    const content = detailKey === 'alert' 
        ? { 
            title: "รายละเอียดการแจ้งเตือน", 
            details: [{ label: "ข้อความ", value: alertText }]
        }
        : detailContent[detailKey];

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 scale-100">
                
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-blue-600 rounded-t-xl">
                    <h3 className="text-2xl font-bold text-white">
                        {content.title}
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="text-white hover:text-gray-200 transition text-3xl font-light"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-6 space-y-4">
                    {content.details.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row justify-between py-2 border-b last:border-b-0">
                            <span className="font-semibold text-gray-600 w-full sm:w-2/5 pr-4 mb-1 sm:mb-0">
                                {item.label}:
                            </span>
                            <span className={`text-gray-800 w-full sm:w-3/5 text-right font-medium ${item.color || 'font-normal'}`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


/**
 * Component ย่อยสำหรับการ์ดข้อมูลที่สามารถคลิกได้ (ใช้ Tailwind)
 */
const ClickableCard = ({ title, value, detail, colorClass, backgroundColorClass, onClick }) => {
    
  return (
    <div
      className={`
        ${backgroundColorClass} 
        p-6 rounded-xl shadow-lg 
        transition duration-300 ease-in-out 
        transform hover:-translate-y-1 hover:shadow-2xl 
        cursor-pointer 
        flex flex-col justify-between 
        border-t-4 border-b-2 ${colorClass.replace('text', 'border')}
      `}
      onClick={onClick}
      role="button"
      tabIndex="0"
    >
        <div>
            <h2 className={`text-lg font-bold mb-3 ${colorClass}`}>{title}</h2>
            {/* Value (ข้อมูลหลัก) */}
            <p className={`text-3xl font-extrabold ${colorClass} mb-2`}>
                {value}
            </p>
            {/* Detail (ข้อมูลรอง) */}
            <p className="text-gray-600 text-sm mt-1">{detail}</p>
        </div>
        
        <p className="text-blue-500 font-bold mt-4 text-sm hover:text-blue-700 transition">
          ➡ คลิกเพื่อดูรายละเอียด
      </p>
    </div>
  );
};


// **********************************************
// Component หลักของหน้าผู้ป่วย
// **********************************************
export default function PatientDashboard() {
    // State สำหรับ Modal
    const [modalDetailKey, setModalDetailKey] = useState(null); 
    const [alertDetail, setAlertDetail] = useState(null); // ใช้เก็บข้อความ alert ที่ถูกเลือก

    // ฟังก์ชันสำหรับเปิด Modal
    const openModal = (key, alertMsg = null) => {
        setAlertDetail(alertMsg);
        setModalDetailKey(key);
    };

    // ฟังก์ชันสำหรับปิด Modal
    const closeModal = () => {
        setModalDetailKey(null);
        setAlertDetail(null);
    };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen font-kanit">
        
      {/* 1. Header ผู้ป่วย */}
      <header className="mb-6 pb-4 border-b-4 border-blue-500">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
            👤 ข้อมูลสรุปผู้ป่วย
        </h1>
        <p className="mt-2 text-base md:text-lg text-gray-600">
          **คุณ{patientData.name}** | รหัส: **{patientData.patientId}**
        </p>
      </header>

      {/* 2. การแจ้งเตือนสำคัญ (Alerts) */}
      <div className="mb-8 p-4 md:p-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4 border-b pb-2">
          🚨 การแจ้งเตือนสำคัญ (คลิกเพื่อดูรายละเอียด)
        </h2>
        <ul className="list-none p-0 m-0 space-y-3">
          {alerts.map((alert, index) => (
            <li
              key={index}
              className="p-3 bg-yellow-100 text-yellow-800 rounded-lg cursor-pointer border-l-4 border-yellow-600 hover:bg-yellow-200 transition"
              onClick={() => openModal('alert', alert)}
              role="button"
              tabIndex="0"
            >
              {alert}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Grid Card หลัก */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* ยอดค่าชำระ (เน้นสีแดง) */}
        <ClickableCard
          title="ยอดค่าชำระคงค้าง"
          value={patientData.outstandingPayment}
          detail="กรุณาชำระก่อนวันที่ 30 ต.ค."
          colorClass="text-red-700"
          backgroundColorClass="bg-red-50"
          onClick={() => openModal('payment')}
        />

        {/* ยอดเงินประกัน & ข้อมูลกรรมธรรม์ (เน้นสีเขียว) */}
        <ClickableCard
          title="ยอดเงินประกันคงเหลือ"
          value={patientData.insuranceBalance}
          detail={`กรมธรรม์: ${patientData.policyInfo}`}
          colorClass="text-green-700"
          backgroundColorClass="bg-green-50"
          onClick={() => openModal('insurance')}
        />
        
        {/* คำวินิจฉัยหมอล่าสุด (เน้นสีน้ำเงิน) */}
        <ClickableCard
          title="คำวินิจฉัยหมอ"
          value={patientData.doctorDiagnosis}
          detail="คลิกเพื่อดูผลการตรวจ, ใบสั่งยา และประวัติการรักษา"
          colorClass="text-blue-700"
          backgroundColorClass="bg-blue-50"
          onClick={() => openModal('diagnosis')}
        />

        {/* ห้องพักและแผนการรักษา (เน้นสีม่วง) */}
        <ClickableCard
          title="ห้องพัก & แผนการรักษา"
          value={`ห้อง: ${patientData.room}`}
          detail={`แผน: ${patientData.treatmentPlan}`}
          colorClass="text-purple-700"
          backgroundColorClass="bg-purple-50"
          onClick={() => openModal('treatment')}
        />
      </div>
      
      {/* Modal แสดงรายละเอียด (แสดงบนทุกหน้าจอเมื่อถูกเรียก) */}
      <PatientDetailModal 
        detailKey={modalDetailKey} 
        alertText={alertDetail}
        onClose={closeModal} 
      />
    </div>
  );
}