import React, { useState } from "react";

// **********************************************
// MOCK DATA
// **********************************************

const patientData = {
    name: "นายสมชาย ประเสริฐ",
    patientId: "P001001",
    insuranceBalance: "100,000 บาท",
    policyInfo: "AIA - Prestige Health",
    outstandingPayment: "45,000 บาท",
    room: "ห้องเดี่ยวพิเศษ (VIP) 501", // ข้อมูลห้องพักปัจจุบัน
    treatmentPlan: "IV Ceftriaxone, Monitor O2 Saturation",
    doctorDiagnosis: "Pneumonia (ปอดอักเสบ)",
};

// ข้อมูลการแจ้งเตือนจำลอง
const alerts = [
    "⚠️ คุณมียอดค้างชำระจากบริษัทประกันจำนวน 45,000 บาท กรุณาตรวจสอบสถานะการชำระ",
    "กรมธรรม์จะหมดอายุใน 30 วัน (ต่ออายุ)",
    "หากเกิน 1 ชั่วโมง กรุณาติดต่อเจ้าหน้าที่เพื่อเร่งรัดการดำเนินการ",
];

// ข้อมูลรายละเอียดสำหรับแสดงใน Modal ทั่วไป
const detailContent = {
    payment: {
        title: "ยอดค่าชำระคงค้าง",
        details: [
            { label: "ยอดรวมค่ารักษา", value: "฿145,000" },
            { label: "ยอดที่ประกันอนุมัติ", value: "฿100,000" },
            {
                label: "ยอดที่ผู้ป่วยต้องชำระเอง",
                value: "฿45,000",
                color: "text-red-600 font-bold",
            },
            { label: "กำหนดชำระ", value: "30 ต.ค. 2568" },
        ],
    },
    insurance: {
        title: "ข้อมูลประกันและกรมธรรม์",
        details: [
            { label: "บริษัทประกัน", value: patientData.policyInfo.split(" - ")[0] },
            { label: "ชื่อกรมธรรม์", value: patientData.policyInfo.split(" - ")[1] },
            {
                label: "วงเงินคงเหลือ (IPD)",
                value: patientData.insuranceBalance,
                color: "text-green-600 font-bold",
            },
            { label: "วันหมดอายุ", value: "25 พ.ย. 2568" },
        ],
    },
    diagnosis: {
        title: "คำวินิจฉัยและประวัติการรักษา",
        details: [
            {
                label: "แพทย์วินิจฉัย",
                value: patientData.doctorDiagnosis,
                color: "text-indigo-600 font-bold",
            },
            { label: "แผนการรักษาปัจจุบัน", value: patientData.treatmentPlan },
            { label: "วันเริ่ม Admit", value: "22 ต.ค. 2568" },
            { label: "อาการที่พบล่าสุด", value: "ไข้สูง $38.8^\circ C$, $O_2$ Sat 94%" },
        ],
    },
    treatment: {
        title: "ข้อมูลห้องพักและแผนการรักษา",
        details: [
            {
                label: "ห้องพักปัจจุบัน",
                value: patientData.room,
                color: "text-purple-600 font-bold",
            },
            { label: "ประเภทห้อง", value: "เดี่ยวพิเศษ (VIP)" },
            { label: "แผนการรักษา", value: patientData.treatmentPlan },
            { label: "สถานะ", value: "อยู่ระหว่างการรักษา" },
        ],
    },
    alert: {
        title: "รายละเอียดการแจ้งเตือน",
        details: [{ label: "ข้อความ", value: "" }],
    },
};

// ข้อมูลห้องพักใหม่ที่นำมาใช้ใน Modal (อ้างอิงตามข้อมูลที่ผู้ใช้ให้มา)
const ROOM_DATA_SIMPLE = [
    { 
        type: "Ward 5I (Deluxe)", 
        price: "17,550 บาท/คืน", 
        benefits: "ค่าห้อง+อาหาร (17,550฿) | พยาบาล (4,200฿) | สิ่งอำนวยความสะดวกครบครัน" 
    },
    { 
        type: "Ward 4A (Standard)", 
        price: "8,500 บาท/คืน", 
        benefits: "ค่าห้อง+อาหาร (8,500฿) | พยาบาล (2,500฿) | ห้องน้ำภายใน, ตู้เย็น, ทีวี" 
    },
    { 
        type: "VIP Suite (Luxury)", 
        price: "35,000 บาท/คืน", 
        benefits: "ค่าห้อง+อาหาร (35,000฿) | พยาบาล (6,000฿) | ห้องรับแขก, ครัวเล็ก, อ่างอาบน้ำ" 
    },
    { 
        type: "Semi-Private (Superior)", 
        price: "12,000 บาท/คืน", 
        benefits: "ค่าห้อง+อาหาร (12,000฿) | พยาบาล (3,500฿) | โซฟา, ห้องน้ำรวม, WiFi, ทีวี" 
    },
    { 
        type: "Pediatric Ward (Child)", 
        price: "7,000 บาท/คืน", 
        benefits: "ค่าห้อง+อาหาร (7,000฿) | พยาบาล (2,800฿) | เตียงเด็ก, โซฟาผู้ปกครอง, มุมของเล่น" 
    },
    { 
        type: "VIP Family Room", 
        price: "25,000 บาท/คืน", 
        benefits: "ค่าห้อง+อาหาร (25,000฿) | พยาบาล (5,000฿) | ห้องนั่งเล่น, ครัวเล็ก, 2 เตียง" 
    },
];

// **********************************************
// COMPONENTS
// **********************************************

/**
 * Component ย่อยสำหรับการ์ดข้อมูลที่สามารถคลิกได้ (ClickableCard)
 */
const ClickableCard = ({
    title,
    value,
    detail,
    colorClass,
    backgroundColorClass,
    onClick,
    showDetailLink = true,
}) => {
    return (
        <div
            className={`
                ${backgroundColorClass} 
                p-6 rounded-xl shadow-lg 
                transition duration-300 ease-in-out 
                transform hover:-translate-y-1 hover:shadow-2xl 
                cursor-pointer 
                flex flex-col justify-between 
                border-t-4 border-b-2 ${colorClass.replace("text", "border")}
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
            {/* แสดงลิงก์ดูรายละเอียด หากไม่ได้กำหนดให้ซ่อน */}
            {showDetailLink && (
                <p className="text-blue-500 font-bold mt-4 text-sm hover:text-blue-700 transition">
                    ➡ คลิกเพื่อดูรายละเอียด
                </p>
            )}
        </div>
    );
};

/**
 * Modal สำหรับแสดงรายละเอียดทั่วไป (Payment, Insurance, Diagnosis, Treatment)
 */
const PatientDetailModal = ({ detailKey, alertText, onClose }) => {
    if (!detailKey) return null;

    const content =
        detailKey === "alert"
            ? {
                title: "รายละเอียดการแจ้งเตือน",
                details: [{ label: "ข้อความ", value: alertText }],
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
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row justify-between py-2 border-b last:border-b-0"
                        >
                            <span className="font-semibold text-gray-600 w-full sm:w-2/5 pr-4 mb-1 sm:mb-0">
                                {item.label}:
                            </span>
                            <span
                                className={`text-gray-800 w-full sm:w-3/5 text-left sm:text-right font-medium ${
                                    item.color || "font-normal"
                                }`}
                            >
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
 * Modal สำหรับเลือก/เปลี่ยนห้องพัก
 */
const RoomSelectionModal = ({ onClose, currentRoom }) => {
    // แยกประเภทห้องพักจากข้อมูลปัจจุบัน (เช่น "ห้องเดี่ยวพิเศษ (VIP) 501" -> "ห้องเดี่ยวพิเศษ (VIP)")
    const currentRoomTypePrefix = currentRoom.split(' ')[0];
    
    // หาห้องที่ถูกเลือกเริ่มต้น
    const initialSelectedRoom = ROOM_DATA_SIMPLE.find(room => 
        room.type.includes(currentRoomTypePrefix)
    ) || ROOM_DATA_SIMPLE[0];

    const [selectedRoom, setSelectedRoom] = useState(initialSelectedRoom);

    // ตรวจสอบว่าห้องที่เลือกเป็นห้องเดียวกับประเภทห้องปัจจุบันหรือไม่
    const isSameType = selectedRoom.type.includes(currentRoomTypePrefix);

    const handleConfirm = () => {
        // ใช้ custom modal แทน alert()
        console.log(`ยืนยันการขอเปลี่ยนเป็น: ${selectedRoom.type} ราคา ${selectedRoom.price} - ระบบจะดำเนินการตรวจสอบวงเงินและห้องว่าง`);
        
        // ในสถานการณ์จริง ควรใช้ UI Modal แทน alert()
        alert(`ยืนยันการขอเปลี่ยนเป็น: ${selectedRoom.type} ราคา ${selectedRoom.price} - ระบบจะดำเนินการตรวจสอบวงเงินและห้องว่าง`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-auto transform transition-all duration-300 scale-100">
                
                {/* Header - ใช้สี Indigo ดูพรีเมียม */}
                <div className="p-6 border-b flex justify-between items-center bg-indigo-600 rounded-t-xl">
                    <h3 className="text-2xl font-bold text-white">
                        🛏️ เลือก/เปลี่ยนห้องพัก
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
                <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                    <p className="text-gray-600 text-sm">ห้องพักปัจจุบัน: **{currentRoom}**</p>
                    <div className="space-y-3">
                        {ROOM_DATA_SIMPLE.map((room, index) => (
                            <div 
                                key={index} 
                                className={`p-4 border rounded-lg cursor-pointer transition 
                                    ${selectedRoom.type === room.type 
                                        ? 'border-indigo-600 ring-2 ring-indigo-300 bg-indigo-50' 
                                        : 'border-gray-300 hover:border-indigo-400'
                                    }`}
                                onClick={() => setSelectedRoom(room)}
                            >
                                <h4 className="font-bold text-lg text-indigo-800">{room.type}</h4>
                                <p className="text-sm font-semibold text-gray-700">
                                    <span className="text-red-600">ราคา/คืน: {room.price}</span>
                                </p>
                                <p className="text-xs text-gray-500">
                                    <span className="font-medium text-gray-600">รายละเอียด:</span> {room.benefits}
                                </p>
                                {room.type.includes(currentRoomTypePrefix) && (
                                     <p className="mt-2 text-xs font-bold text-green-600">
                                        ✅ ประเภทห้องพักเดียวกับห้องปัจจุบัน
                                     </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        เลือก: <span className="font-bold text-indigo-700">{selectedRoom.type}</span>
                    </p>
                    <button 
                        onClick={handleConfirm}
                        className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        // ปุ่มจะถูกปิดใช้งานหากห้องที่เลือกเป็นประเภทเดียวกันกับห้องปัจจุบัน
                        disabled={isSameType} 
                    >
                        ยืนยันการขอเปลี่ยนห้อง
                    </button>
                </div>
            </div>
        </div>
    );
};


// **********************************************
// MAIN COMPONENT (PatientDashboard)
// **********************************************
export default function PatientDashboard() {
    // State สำหรับ Modal รายละเอียดทั่วไป
    const [modalDetailKey, setModalDetailKey] = useState(null);
    const [alertDetail, setAlertDetail] = useState(null);

    // State ใหม่สำหรับ Modal เลือกห้องพัก
    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false); 

    const openModal = (key, alertMsg = null) => {
        setAlertDetail(alertMsg);
        setModalDetailKey(key);
    };

    const closeModal = () => {
        setModalDetailKey(null);
        setAlertDetail(null);
        setIsRoomModalOpen(false); // ปิด Modal เลือกห้องพักด้วย
    };

    // ฟังก์ชันเปิด Modal เลือกห้องพัก
    const openRoomModal = () => {
        setIsRoomModalOpen(true);
    };

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-kanit">
            
            {/* 1. Header ผู้ป่วย */}
            <header className="mb-8 pb-4 border-b-4 border-indigo-500">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center">
                    <svg className="w-8 h-8 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    ข้อมูลสรุปผู้ป่วย
                </h1>
                <p className="mt-2 text-base md:text-lg text-gray-600">
                    **คุณ{patientData.name}** | รหัส: **{patientData.patientId}**
                </p>
            </header>

            {/* 2. การแจ้งเตือนสำคัญ (Alerts) */}
            <div className="mb-8 p-4 md:p-6 bg-yellow-100 border-2 border-yellow-500 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold text-red-700 mb-4 border-b border-yellow-400 pb-2 flex items-center">
                    🚨 การแจ้งเตือนสำคัญ (คลิกเพื่อดูรายละเอียด)
                </h2>
                <ul className="list-none p-0 m-0 space-y-3">
                    {alerts.map((alert, index) => (
                        <li
                            key={index}
                            className="p-3 bg-white text-yellow-800 rounded-lg cursor-pointer border-l-4 border-red-500 hover:bg-yellow-200 transition shadow-sm"
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
            
            {/* 4. ปุ่มเลือกห้องพัก (ปรับขนาดให้ไม่ใหญ่มาก: p-3 text-base) */}
            <div className="mt-8 lg:col-span-4">
                <button
                    onClick={openRoomModal}
                    className="w-full p-3 flex items-center justify-center 
                               bg-indigo-600 text-white text-base font-bold rounded-xl 
                               shadow-lg hover:bg-indigo-700 transition duration-300 
                               transform hover:scale-[1.005] focus:outline-none focus:ring-4 focus:ring-indigo-300"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10m0-10l-8 4m8-4v10M4 7l-8 4 8 4m0-10l8 4m0-4v10l-8 4m-8-4v-10l8 4"></path></svg>
                    เปลี่ยน/เลือกห้องพักที่ต้องการ
                </button>
            </div>
            
            {/* Modal แสดงรายละเอียดทั่วไป */}
            <PatientDetailModal 
                detailKey={modalDetailKey} 
                alertText={alertDetail}
                onClose={closeModal} 
            />
          
            {/* Modal เลือกห้องพัก */}
            {isRoomModalOpen && <RoomSelectionModal 
                onClose={closeModal} 
                currentRoom={patientData.room}
            />}
        </div>
    );
}
