import React, { useState } from 'react';

// --- Mock Data for demonstration ---
// ข้อมูลจำลองสำหรับแสดงรายละเอียดค่าใช้จ่ายและการประกัน (เพิ่มหลายรายการ)
const mockPatientsData = [
    {
        id: 'HN123456',
        patient: {
            name: "นายสมชาย ใจดี",
            hn: "HN123456",
            id: "145xxxxxx",
            status: "กำลังรักษา",
        },
        stay: {
            admissionDate: "2025-09-20",
            roomType: "ห้องเดี่ยวพิเศษ (VIP)",
            dailyRoomRate: 4500, // THB
            lengthOfStayDays: 7, // ระยะเวลาที่นอน (จำลอง)
        },
        costs: {
            currentIncurred: 85000, // ค่ารักษาพยาบาลทั้งหมดที่เกิดขึ้นแล้ว
            futureEstimated: 35000, // ค่ารักษาพยาบาลที่คาดว่าจะเกิดขึ้นในอนาคต
            insurancePaymentToDate: 55000, // ส่วนที่ประกันจ่ายไปแล้ว
        },
        policy: {
            provider: "บริษัท ประกันภัยร่มเย็น จำกัด",
            policyNumber: "A890-B123-C456",
            coverageType: "IPD/OPD Platinum",
            annualLimit: 150000, // วงเงินต่อปี
            roomLimitDaily: 4000, // วงเงินค่าห้องต่อวัน
            outpatientLimit: 10000,
            deductible: 5000, // ค่าเสียหายส่วนแรก (ที่ผู้ป่วยต้องจ่ายก่อน)
        }
    },
    {
        id: 'HN987654',
        patient: {
            name: "นางสาวอรุณรัตน์ สุขสบาย",
            hn: "HN987654",
            id: "210xxxxxx",
            status: "จำหน่ายแล้ว",
        },
        stay: {
            admissionDate: "2025-09-01",
            roomType: "ห้องคู่ (Standard)",
            dailyRoomRate: 2500, // THB
            lengthOfStayDays: 12, // ระยะเวลาที่นอน (จำลอง)
        },
        costs: {
            currentIncurred: 45000,
            futureEstimated: 0,
            insurancePaymentToDate: 45000, // ประกันจ่ายเต็มจำนวน
        },
        policy: {
            provider: "บริษัท กรุงเทพประกันชีวิต",
            policyNumber: "D789-E012-F345",
            coverageType: "IPD Standard",
            annualLimit: 80000,
            roomLimitDaily: 3000,
            outpatientLimit: 0,
            deductible: 1000,
        }
    },
    {
        id: 'HN001002',
        patient: {
            name: "เด็กชายพีระพงศ์ ดวงดี",
            hn: "HN001002",
            id: "505xxxxxx",
            status: "รอการอนุมัติ",
        },
        stay: {
            admissionDate: "2025-09-28",
            roomType: "ห้องสามัญ",
            dailyRoomRate: 1500,
            lengthOfStayDays: 2,
        },
        costs: {
            currentIncurred: 15000,
            futureEstimated: 10000,
            insurancePaymentToDate: 0, // ยังไม่ได้จ่าย
        },
        policy: {
            provider: "บริษัท ประกันชีวิตไทย",
            policyNumber: "G000-H111-I222",
            coverageType: "OPD/IPD Basic",
            annualLimit: 50000,
            roomLimitDaily: 2000,
            outpatientLimit: 5000,
            deductible: 2000,
        }
    }
];

// Utility function to format currency (THB)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);
};

// Utility function to calculate remaining estimated payment
const calculateRemaining = (data) => {
    const totalEstimatedCost = data.costs.currentIncurred + data.costs.futureEstimated;
    // การคำนวณแบบง่าย: ค่าใช้จ่ายรวมทั้งหมดโดยประมาณ - ส่วนที่ประกันจ่ายไปแล้ว
    const remainingToPay = totalEstimatedCost - data.costs.insurancePaymentToDate;
    return remainingToPay > 0 ? remainingToPay : 0;
};

// --- Main Component ---
export default function Insurance() {
    // กำหนดสถานะเริ่มต้นให้แสดงข้อมูลผู้ป่วยคนแรกใน Mock Data
    const [selectedPatientId, setSelectedPatientId] = useState(mockPatientsData[0].id);
    
    // หาข้อมูลของผู้ป่วยที่ถูกเลือก
    const selectedData = mockPatientsData.find(p => p.id === selectedPatientId);

    // ถ้าหาไม่เจอ ให้แสดงข้อความแจ้งเตือน (กรณีข้อมูลมีปัญหา)
    if (!selectedData) {
        return <div className="p-8 text-center text-red-500 font-bold">ไม่พบข้อมูลผู้ป่วยที่เลือก</div>;
    }

    const { patient, stay, costs, policy } = selectedData;
    const totalEstimatedCost = costs.currentIncurred + costs.futureEstimated;
    const remainingEstimatedPayment = calculateRemaining(selectedData);
    const totalInsuranceCoverageUsed = costs.insurancePaymentToDate;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
            <h1 className="text-3xl font-extrabold text-[#2155CD] mb-6 border-b pb-3">
                ข้อมูลประกันและค่ารักษาพยาบาล (Insurance & Billing)
            </h1>

            {/* Patient Selector and Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* --- COLUMN 1: Patient List (1/4 width on large screens) --- */}
                <div className="lg:col-span-1">
                    <PatientList 
                        patients={mockPatientsData.map(p => p.patient)} 
                        selectedId={selectedPatientId} 
                        onSelectPatient={setSelectedPatientId}
                    />
                </div>

                {/* --- COLUMN 2: Patient Data Display (3/4 width on large screens) --- */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {/* Patient and Stay Summary Card */}
                    <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border-l-4 border-[#2155CD]">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลผู้ป่วยและการเข้ารักษา</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <InfoCard title="ชื่อผู้ป่วย" value={patient.name} icon="👤" />
                            <InfoCard title="HN" value={patient.hn} icon="🆔" />
                            <InfoCard title="วันที่เข้ารักษา" value={stay.admissionDate} icon="📅" />
                            <InfoCard 
                                title="สถานะ" 
                                value={patient.status} 
                                icon="🏥" 
                                colorClass={patient.status === 'กำลังรักษา' ? 'text-green-600 font-bold' : patient.status === 'รอการอนุมัติ' ? 'text-yellow-600 font-bold' : 'text-gray-600 font-bold'} 
                            />
                        </div>
                    </div>

                    {/* Cost Overview and Comparison Grid (Responsive Layout) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* === COLUMN 2.1: COST SUMMARY & STAY DETAILS (2/3 width) === */}
                        <div className="lg:col-span-2 space-y-6">
                                
                            {/* Current and Future Costs */}
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">ค่ารักษาพยาบาล (Treatment Costs)</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <CostCard 
                                    title="ค่ารักษาปัจจุบัน (สะสม)" 
                                    amount={costs.currentIncurred} 
                                    description="Total costs incurred to date." 
                                    color="bg-red-50 text-red-700"
                                />
                                <CostCard 
                                    title="ค่ารักษาในอนาคต (โดยประมาณ)" 
                                    amount={costs.futureEstimated} 
                                    description="Estimated costs based on doctor's plan." 
                                    color="bg-yellow-50 text-yellow-700"
                                />
                                <CostCard 
                                    title="รวมค่ารักษาโดยประมาณ" 
                                    amount={totalEstimatedCost} 
                                    description="Current + Future Estimate." 
                                    color="bg-indigo-50 text-indigo-700"
                                />
                                </div>
                            </div>

                            {/* Stay Details */}
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">รายละเอียดการเข้าพัก</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InfoCard title="วันที่เข้ารักษา" value={stay.admissionDate} icon="🗓️" />
                                    <InfoCard title="ระยะเวลาที่นอน" value={`${stay.lengthOfStayDays} วัน`} icon="⏳" />
                                    <InfoCard 
                                        title="ค่าห้องพัก/วัน" 
                                        value={formatCurrency(stay.dailyRoomRate)} 
                                        icon="🛌" 
                                        description={stay.roomType}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* === COLUMN 2.2: POLICY COMPARISON & BALANCE (1/3 width) === */}
                        <div className="lg:col-span-1 space-y-6">
                            
                            {/* Policy Information (กรมธรรม์) */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-[#2155CD]/20">
                                <h2 className="text-xl font-semibold text-[#2155CD] mb-4">ข้อมูลกรมธรรม์</h2>
                                <PolicyDetail label="บริษัทประกัน" value={policy.provider} />
                                <PolicyDetail label="เลขที่กรมธรรม์" value={policy.policyNumber} />
                                <PolicyDetail label="ประเภทความคุ้มครอง" value={policy.coverageType} />
                                <PolicyDetail label="วงเงินต่อปี (Annual Limit)" value={policy.annualLimit} isCurrency />
                                <PolicyDetail label="วงเงินค่าห้อง/วัน" value={policy.roomLimitDaily} isCurrency />
                                <PolicyDetail label="ค่าเสียหายส่วนแรก (Deductible)" value={policy.deductible} isCurrency />
                            </div>

                            {/* Balance/Payment Status (ยอดชำระ) */}
                            <div className={`p-6 rounded-xl shadow-2xl transition-all duration-300 
                                ${remainingEstimatedPayment > 0 ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
                            >
                                <h3 className="text-2xl font-bold mb-2">สรุปยอดที่ต้องชำระ (ประมาณ)</h3>
                                <div className="text-5xl font-extrabold mb-4">
                                    {formatCurrency(remainingEstimatedPayment)}
                                </div>
                                <p className="text-sm font-light">
                                    *ยอดนี้คือค่าใช้จ่ายทั้งหมดโดยประมาณที่ผู้ป่วยต้องรับผิดชอบ 
                                    (อาจมีการเปลี่ยนแปลงตามเงื่อนไขกรมธรรม์จริง)
                                </p>
                                <div className='mt-4 pt-4 border-t border-white/50'>
                                    <p className="text-lg font-semibold">
                                        ยอดรวมที่ประกันจ่ายแล้ว: {formatCurrency(totalInsuranceCoverageUsed)}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}


// --- Reusable Components (Modified/New) ---

// Component for the Patient List
const PatientList = ({ patients, selectedId, onSelectPatient }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg h-full sticky top-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">รายชื่อผู้ป่วย</h2>
        <div className="space-y-2">
            {patients.map((p) => (
                <div
                    key={p.hn}
                    className={`p-3 rounded-lg cursor-pointer transition duration-150 ease-in-out 
                                ${p.hn === selectedId 
                                    ? 'bg-[#2155CD] text-white shadow-md' 
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`
                                }
                    onClick={() => onSelectPatient(p.hn)}
                >
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className={`text-xs ${p.hn === selectedId ? 'text-white/80' : 'text-gray-500'}`}>HN: {p.hn}</p>
                </div>
            ))}
        </div>
    </div>
);


const InfoCard = ({ title, value, icon, description, colorClass = 'text-gray-900' }) => (
    <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
            <p className="text-xs text-gray-500">{title}</p>
            <p className={`text-md font-medium ${colorClass}`}>{value}</p>
            {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
        </div>
    </div>
);

const CostCard = ({ title, amount, description, color }) => {
    // ใช้ฟังก์ชัน formatCurrency จากด้านบน
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className={`${color} p-5 rounded-xl border border-current transition transform hover:scale-[1.02] cursor-default`}>
            <p className="text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-extrabold">{formatCurrency(amount)}</p>
            <p className="text-xs mt-2 opacity-80">{description}</p>
        </div>
    );
}

const PolicyDetail = ({ label, value, isCurrency = false }) => {
    // ใช้ฟังก์ชัน formatCurrency จากด้านบน
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="flex justify-between py-2 border-b last:border-b-0 text-sm">
            <span className="text-gray-600">{label}</span>
            <span className={`font-semibold ${isCurrency ? 'text-green-700' : 'text-gray-900'}`}>
                {isCurrency ? formatCurrency(value) : value}
            </span>
        </div>
    );
};