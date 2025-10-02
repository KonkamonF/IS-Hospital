import React, { useState, useMemo, useEffect } from 'react';

// --- Mock Data for demonstration (Updated to include 8 providers) ---
// ข้อมูลจำลองสำหรับแสดงรายละเอียดค่าใช้จ่ายและการประกัน (เพิ่มหลายรายการและอัปเดตบริษัทประกันเป็น 8 แห่ง)
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
            currentIncurred: 145000, // ค่ารักษาพยาบาลทั้งหมดที่เกิดขึ้นแล้ว
            futureEstimated: 35000, // ค่ารักษาพยาบาลที่คาดว่าจะเกิดขึ้นในอนาคต
            insurancePaymentToDate: 135000, // ส่วนที่ประกันจ่ายไปแล้ว
        },
        policy: {
            provider: "AIA", // UPDATED
            policyNumber: "A890-B123-C456",
            coverageType: "IPD/OPD Platinum",
            annualLimit: 150000, // วงเงินต่อปี
            roomLimitDaily: 4000, // วงเงินค่าห้องต่อวัน
            outpatientLimit: 10000,
            deductible: 0, // ค่าเสียหายส่วนแรก (ที่ผู้ป่วยต้องจ่ายก่อน)
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
            provider: "Allianz Ayudhya", // UPDATED
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
            provider: "Muang Thai Life", // UPDATED
            policyNumber: "G000-H111-I222",
            coverageType: "OPD/IPD Basic",
            annualLimit: 50000,
            roomLimitDaily: 2000,
            outpatientLimit: 5000,
            deductible: 2000,
        }
    },
    {
        id: 'HN001003',
        patient: {
            name: "นางสาวสมหญิง รุ่งเรือง",
            hn: "HN001003",
            id: "505xxxxxx",
            status: "กำลังรักษา",
        },
        stay: {
            admissionDate: "2025-10-01",
            roomType: "ห้องเดี่ยวพิเศษ",
            dailyRoomRate: 4000,
            lengthOfStayDays: 1,
        },
        costs: {
            currentIncurred: 8000,
            futureEstimated: 5000,
            insurancePaymentToDate: 0, 
        },
        policy: {
            provider: "Tokio Marine", // UPDATED
            policyNumber: "J333-K444-L555",
            coverageType: "IPD Standard",
            annualLimit: 120000,
            roomLimitDaily: 4000,
            outpatientLimit: 0,
            deductible: 1000,
        }
    },
    // --- NEW PATIENTS ADDED FOR THE REMAINING 4 PROVIDERS ---
    {
        id: 'HN555666',
        patient: {
            name: "นายธนากร เก่งมาก",
            hn: "HN555666",
            id: "333xxxxxx",
            status: "กำลังรักษา",
        },
        stay: {
            admissionDate: "2025-10-02",
            roomType: "ห้องเดี่ยว (Standard)",
            dailyRoomRate: 3000,
            lengthOfStayDays: 1,
        },
        costs: {
            currentIncurred: 12000,
            futureEstimated: 20000,
            insurancePaymentToDate: 0, 
        },
        policy: {
            provider: "Krungthai-AXA", // NEW PROVIDER
            policyNumber: "KTA-1010-2025",
            coverageType: "IPD Gold",
            annualLimit: 200000,
            roomLimitDaily: 3500,
            outpatientLimit: 5000,
            deductible: 0, // No deductible
        }
    },
    {
        id: 'HN777888',
        patient: {
            name: "นางวารุณี ร่ำรวย",
            hn: "HN777888",
            id: "444xxxxxx",
            status: "จำหน่ายแล้ว",
        },
        stay: {
            admissionDate: "2025-08-15",
            roomType: "ห้อง VIP",
            dailyRoomRate: 6000,
            lengthOfStayDays: 5,
        },
        costs: {
            currentIncurred: 65000,
            futureEstimated: 0,
            insurancePaymentToDate: 60000, 
        },
        policy: {
            provider: "Thai Life", // NEW PROVIDER
            policyNumber: "TL-999-777",
            coverageType: "IPD/OPD Supreme",
            annualLimit: 300000,
            roomLimitDaily: 5000,
            outpatientLimit: 15000,
            deductible: 10000, 
        }
    },
    {
        id: 'HN000111',
        patient: {
            name: "ด.ญ. จุฑาทิพย์ ชื่นใจ",
            hn: "HN000111",
            id: "600xxxxxx",
            status: "รอการอนุมัติ",
        },
        stay: {
            admissionDate: "2025-09-25",
            roomType: "ห้องสามัญ",
            dailyRoomRate: 1500,
            lengthOfStayDays: 8,
        },
        costs: {
            currentIncurred: 32000,
            futureEstimated: 5000,
            insurancePaymentToDate: 15000, 
        },
        policy: {
            provider: "Bangkok Health Insurance (TPA)", // NEW PROVIDER (TPA)
            policyNumber: "BHI-TPA-001",
            coverageType: "TPA Managed",
            annualLimit: 100000,
            roomLimitDaily: 2500,
            outpatientLimit: 0,
            deductible: 0,
        }
    },
    {
        id: 'HN321789',
        patient: {
            name: "นายมานะ มั่นคง",
            hn: "HN321789",
            id: "111xxxxxx",
            status: "กำลังรักษา",
        },
        stay: {
            admissionDate: "2025-10-03",
            roomType: "ห้องเดี่ยวพิเศษ",
            dailyRoomRate: 4000,
            lengthOfStayDays: 1,
        },
        costs: {
            currentIncurred: 5000,
            futureEstimated: 15000,
            insurancePaymentToDate: 0, 
        },
        policy: {
            provider: "Dhipaya Life Insurance (TPA)", // NEW PROVIDER (TPA)
            policyNumber: "DL-TPA-999",
            coverageType: "IPD Basic",
            annualLimit: 75000,
            roomLimitDaily: 3000,
            outpatientLimit: 0,
            deductible: 500,
        }
    },
];

// Utility function to format currency (THB)
const formatCurrency = (amount) => {
    // Handling null/undefined/non-numeric values gracefully
    if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
    
    return new Intl.NumberFormat('th-TH', { 
        style: 'currency', 
        currency: 'THB', 
        minimumFractionDigits: 0 
    }).format(amount);
};

// Utility function to calculate remaining estimated payment
const calculateRemaining = (data) => {
    // Total cost (Current Incurred + Future Estimated)
    const totalEstimatedCost = data.costs.currentIncurred + data.costs.futureEstimated; 
    
    // Simple Calculation: Total Estimated Cost - Already Paid by Insurance
    const remainingToPay = totalEstimatedCost - data.costs.insurancePaymentToDate;
    
    // The patient must at least pay the deductible, but here we use the simpler calculation for dashboard clarity
    return remainingToPay > 0 ? remainingToPay : 0;
};

// --- Main Component ---
export default function Insurance() {
    // ดึงรายชื่อบริษัทประกันที่ไม่ซ้ำกัน
    const uniqueProviders = useMemo(() => {
        const providers = mockPatientsData.map(p => p.policy.provider);
        return ['ทั้งหมด', ...new Set(providers)].sort();
    }, []);

    // State สำหรับการกรองและผู้ป่วยที่ถูกเลือก
    const [selectedProvider, setSelectedProvider] = useState('ทั้งหมด');
    // ตั้งค่าผู้ป่วยเริ่มต้นเป็นคนแรกในรายการ
    const [selectedPatientId, setSelectedPatientId] = useState(mockPatientsData.length > 0 ? mockPatientsData[0].id : null);

    // 1. กรองรายชื่อผู้ป่วยตามบริษัทประกันที่เลือก
    const filteredPatients = useMemo(() => {
        if (selectedProvider === 'ทั้งหมด') {
            return mockPatientsData;
        }
        return mockPatientsData.filter(p => p.policy.provider === selectedProvider);
    }, [selectedProvider]);

    // 2. อัปเดตผู้ป่วยที่เลือกให้เป็นคนแรกในรายการที่ถูกกรอง หากผู้ป่วยเดิมไม่อยู่ในรายการ
    useEffect(() => {
        const isSelectedPatientInFilteredList = filteredPatients.some(p => p.id === selectedPatientId);
        
        if (!isSelectedPatientInFilteredList && filteredPatients.length > 0) {
            setSelectedPatientId(filteredPatients[0].id);
        } else if (filteredPatients.length === 0) {
            // กรณีไม่มีผู้ป่วยในบริษัทที่เลือก
            setSelectedPatientId(null); 
        }
    }, [filteredPatients, selectedPatientId]);


    // หาข้อมูลของผู้ป่วยที่ถูกเลือก
    const selectedData = mockPatientsData.find(p => p.id === selectedPatientId);

    // ถ้าหาไม่เจอ ให้แสดงข้อความแจ้งเตือน (กรณีข้อมูลถูกกรองจนหมด)
    if (!selectedData && selectedPatientId !== null) {
        // This case should ideally not happen if data is consistent, but acts as a safeguard
        console.error("Selected patient ID not found in mock data.");
        // Attempt to reset to the first filtered patient if one exists
        if (filteredPatients.length > 0) {
            setSelectedPatientId(filteredPatients[0].id);
        } else {
             // Fallback for empty list after filter
             return (
                <div className="p-8 sm:p-10 bg-gray-50 min-h-screen font-sans">
                    <h1 className="text-3xl font-extrabold text-[#2155CD] mb-6 border-b pb-3">
                        ข้อมูลประกันและค่ารักษาพยาบาล (Insurance & Billing)
                    </h1>
                    <ProviderFilter 
                        providers={uniqueProviders} 
                        selectedProvider={selectedProvider} 
                        onChange={setSelectedProvider}
                    />
                    <div className="mt-8 p-10 text-center bg-white rounded-xl shadow-lg border-l-4 border-yellow-500">
                        <p className="text-xl font-bold text-gray-700">
                            ⚠️ ไม่พบข้อมูลผู้ป่วยสำหรับบริษัทประกัน "{selectedProvider}"
                        </p>
                        <p className="text-sm text-gray-500 mt-2">โปรดเลือกบริษัทประกันอื่น หรือ "ทั้งหมด"</p>
                    </div>
                </div>
            );
        }
        return null; // Render nothing momentarily while state updates
    } 
    
    // Case where selectedData is null because the filtered list is empty (handled by the block above)
    if (!selectedData) {
        return (
            <div className="p-8 sm:p-10 bg-gray-50 min-h-screen font-sans">
                <h1 className="text-3xl font-extrabold text-[#2155CD] mb-6 border-b pb-3">
                    ข้อมูลประกันและค่ารักษาพยาบาล (Insurance & Billing)
                </h1>
                <ProviderFilter 
                    providers={uniqueProviders} 
                    selectedProvider={selectedProvider} 
                    onChange={setSelectedProvider}
                />
                <div className="mt-8 p-10 text-center bg-white rounded-xl shadow-lg border-l-4 border-yellow-500">
                    <p className="text-xl font-bold text-gray-700">
                        ⚠️ ไม่พบข้อมูลผู้ป่วยสำหรับบริษัทประกัน "{selectedProvider}"
                    </p>
                    <p className="text-sm text-gray-500 mt-2">โปรดเลือกบริษัทประกันอื่น หรือ "ทั้งหมด"</p>
                </div>
            </div>
        );
    }


    const { patient, stay, costs, policy } = selectedData;
    const totalEstimatedCost = costs.currentIncurred + costs.futureEstimated;
    const remainingEstimatedPayment = calculateRemaining(selectedData);
    const totalInsuranceCoverageUsed = costs.insurancePaymentToDate;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
            {/* Tailwind CSS Script for Inter Font and styling */}
            <script src="https://cdn.tailwindcss.com"></script>
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
            `}} />
            
            <h1 className="text-3xl font-extrabold text-[#2155CD] mb-6 border-b pb-3">
                ข้อมูลประกันและค่ารักษาพยาบาล (Insurance & Billing)
            </h1>

            {/* Provider Filter */}
            <div className='mb-6'>
                <ProviderFilter 
                    providers={uniqueProviders} 
                    selectedProvider={selectedProvider} 
                    onChange={setSelectedProvider}
                />
            </div>

            {/* Patient Selector and Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* --- COLUMN 1: Patient List (1/4 width on large screens) --- */}
                <div className="lg:col-span-1">
                    <PatientList 
                        patients={filteredPatients.map(p => ({ ...p.patient, provider: p.policy.provider, id: p.id }))} 
                        selectedId={selectedPatientId} 
                        onSelectPatient={setSelectedPatientId}
                        patientData={mockPatientsData} // Pass full data for cross-referencing
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


// --- Reusable Components ---

// Component for the Insurance Provider Filter Dropdown
const ProviderFilter = ({ providers, selectedProvider, onChange }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <label htmlFor="provider-filter" className="text-lg font-semibold text-gray-700 whitespace-nowrap">
            กรองตามบริษัทประกัน:
        </label>
        <div className='relative w-full sm:w-64'>
            <select
                id="provider-filter"
                value={selectedProvider}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2155CD] focus:border-[#2155CD] appearance-none transition duration-150 ease-in-out text-gray-800 font-medium"
            >
                {providers.map((provider) => (
                    <option key={provider} value={provider}>
                        {provider}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
        <p className='text-sm text-gray-500'>แสดงผู้ป่วยภายใต้กรมธรรม์ของ "{selectedProvider}"</p>
    </div>
);


// Component for the Patient List
const PatientList = ({ patients, selectedId, onSelectPatient }) => {

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg h-full sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">รายชื่อผู้ป่วย</h2>
            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
                {patients.length > 0 ? (
                    patients.map((p) => (
                        <div
                            key={p.id}
                            className={`p-3 rounded-lg cursor-pointer transition duration-150 ease-in-out 
                                        ${p.id === selectedId 
                                            ? 'bg-[#2155CD] text-white shadow-md ring-2 ring-offset-2 ring-[#2155CD]' 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`
                                        }
                            onClick={() => onSelectPatient(p.id)}
                        >
                            <p className="font-semibold text-sm truncate">{p.name}</p>
                            <p className={`text-xs ${p.id === selectedId ? 'text-white/80' : 'text-gray-500'}`}>HN: {p.hn}</p>
                            <p className={`text-xs font-light italic ${p.id === selectedId ? 'text-white/70' : 'text-gray-400'}`}>
                                บริษัท: {p.provider}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4 text-gray-500">
                        <p>ไม่พบผู้ป่วยในรายการที่กรอง</p>
                    </div>
                )}
            </div>
        </div>
    );
};


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
        if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
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
        if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
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