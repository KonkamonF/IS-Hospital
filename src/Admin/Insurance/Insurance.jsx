import React from 'react'

// Mock Data for demonstration
// ข้อมูลจำลองสำหรับแสดงรายละเอียดค่าใช้จ่ายและการประกัน
const mockData = {
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
};

// Utility function to format currency (THB)
const formatCurrency = (amount) => {
  // ฟังก์ชันสำหรับจัดรูปแบบตัวเลขให้เป็นสกุลเงินบาท
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);
};

// Utility function to calculate remaining estimated payment
const calculateRemaining = (data) => {
    const totalEstimatedCost = data.costs.currentIncurred + data.costs.futureEstimated;
    
    // การคำนวณแบบง่าย: ค่าใช้จ่ายรวมทั้งหมดโดยประมาณ - ส่วนที่ประกันจ่ายไปแล้ว
    // ในการใช้งานจริง จะต้องมี logic ที่ซับซ้อนตามเงื่อนไขวงเงินค่าห้อง, วงเงินรวม, และ deductible
    const remainingToPay = totalEstimatedCost - data.costs.insurancePaymentToDate; 

    // ไม่ให้ค่าที่ต้องจ่ายติดลบ
    return remainingToPay > 0 ? remainingToPay : 0;
};


export default function Insurance() {
  const { patient, stay, costs, policy } = mockData;
  const totalEstimatedCost = costs.currentIncurred + costs.futureEstimated;
  const remainingEstimatedPayment = calculateRemaining(mockData);
  const totalInsuranceCoverageUsed = costs.insurancePaymentToDate;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-extrabold text-[#2155CD] mb-6 border-b pb-3">
        ข้อมูลประกันและค่ารักษาพยาบาล (Insurance & Billing)
      </h1>

      {/* Patient and Stay Summary Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border-l-4 border-[#2155CD]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลผู้ป่วยและการเข้ารักษา</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <InfoCard title="ชื่อผู้ป่วย" value={patient.name} icon="👤" />
          <InfoCard title="HN" value={patient.hn} icon="🆔" />
          <InfoCard title="วันที่เข้ารักษา" value={stay.admissionDate} icon="📅" />
          <InfoCard title="สถานะ" value={patient.status} icon="🏥" colorClass="text-green-600 font-bold" />
        </div>
      </div>

      {/* Cost Overview and Comparison Grid (Responsive Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* === COLUMN 1: COST SUMMARY & STAY DETAILS (2/3 width on large screens) === */}
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
                <InfoCard 
                    title="วันที่เข้ารักษา" 
                    value={stay.admissionDate} 
                    icon="🗓️" 
                />
                <InfoCard 
                    title="ระยะเวลาที่นอน" 
                    value={`${stay.lengthOfStayDays} วัน`} 
                    icon="⏳" 
                />
                <InfoCard 
                    title="ค่าห้องพัก/วัน" 
                    value={formatCurrency(stay.dailyRoomRate)} 
                    icon="🛌" 
                    description={stay.roomType}
                />
            </div>
          </div>

        </div>

        {/* === COLUMN 2: POLICY COMPARISON & BALANCE (1/3 width on large screens) === */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Policy Information (กรมธรรม์) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#2155CD]/20">
            <h2 className="text-xl font-semibold text-[#2155CD] mb-4">ข้อมูลกรมธรรม์</h2>
            <PolicyDetail label="บริษัทประกัน" value={policy.provider} />
            <PolicyDetail label="เลขที่กรมธรรม์" value={policy.policyNumber} />
            <PolicyDetail label="ประเภทความคุ้มครอง" value={policy.coverageType} />
            <PolicyDetail label="วงเงินต่อปี (Annual Limit)" value={formatCurrency(policy.annualLimit)} isCurrency />
            <PolicyDetail label="วงเงินค่าห้อง/วัน" value={formatCurrency(policy.roomLimitDaily)} isCurrency />
            <PolicyDetail label="ค่าเสียหายส่วนแรก (Deductible)" value={formatCurrency(policy.deductible)} isCurrency />
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
  );
}

// Reusable Components
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
