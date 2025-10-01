import React, { useState } from "react";

// ข้อมูลจำลองสำหรับผู้ป่วย
const patientData = {
  name: "สมชาย ใจดี",
  patientId: "P001234",
  insuranceBalance: "50,000 บาท",
  policyInfo: "Aetna Health Plan - Silver",
  outstandingPayment: "4,500 บาท",
  room: "ห้องพิเศษ 205",
  treatmentPlan: "กายภาพบำบัด 2 ครั้ง/สัปดาห์",
  doctorDiagnosis: "กล้ามเนื้ออักเสบเรื้อรัง (Chronic Myositis)",
};

// ข้อมูลการแจ้งเตือนจำลอง
const alerts = [
  "นัดหมายหมอ: วันที่ 15 ต.ค. เวลา 10:00 น. (กรุณายืนยัน)",
  "กรมธรรม์จะหมดอายุใน 30 วัน (ต่ออายุ)",
  "มีค่ายาใหม่ 1,200 บาท (รอชำระ)",
];

// ฟังก์ชันจำลองเมื่อกดปุ่ม/กล่องข้อมูล
const handleCardClick = (sectionName) => {
  console.log(`Clicked on: ${sectionName}`);
  alert(`คุณกดที่ส่วน: ${sectionName}\n(ในระบบจริงจะนำไปหน้าแสดงรายละเอียด)`);
};

/**
 * Component ย่อยสำหรับการ์ดข้อมูลที่สามารถคลิกได้
 */
const ClickableCard = ({ title, value, detail, color, backgroundColor, onClick, id, hoveredCard, setHoveredCard }) => {
  const baseCardStyle = {
    padding: "25px",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s, box-shadow 0.3s",
    border: "1px solid #e0e0e0",
    backgroundColor: backgroundColor,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const hoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // เงาเข้มขึ้นเมื่อ Hover
  };

  return (
    <div
      style={{ ...baseCardStyle, ...(hoveredCard === id ? hoverStyle : {}) }}
      onClick={onClick}
      role="button"
      tabIndex="0"
      onMouseEnter={() => setHoveredCard(id)}
      onMouseLeave={() => setHoveredCard(null)}
      // สำหรับมือถือ: เพิ่ม active state
      onTouchStart={() => setHoveredCard(id)}
      onTouchEnd={() => setTimeout(() => setHoveredCard(null), 300)}
    >
      <h2 style={{ color: color, margin: "0 0 10px", fontSize: "1.4em" }}>{title}</h2>
      {/* ใช้ value สำหรับข้อมูลหลัก (เช่น ยอดเงิน) */}
      <p style={{ fontSize: "1.8em", fontWeight: "bold", color: color, margin: "5px 0" }}>
        {value}
      </p>
      {/* ใช้ detail สำหรับข้อมูลรองหรือข้อความกระตุ้น */}
      <p style={{ margin: "10px 0 0", color: "#777", fontSize: "0.9em" }}>
        {detail}
      </p>
      <p style={{ color: "#007bff", fontWeight: "bold", marginTop: "15px", fontSize: "0.9em" }}>
        ➡ คลิกเพื่อดูรายละเอียด
      </p>
    </div>
  );
};


/**
 * Component หลักของหน้าผู้ป่วย
 */
export default function Patient() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // สไตล์รวมสำหรับ Dashboard ใช้ Grid เพื่อให้ Responsive
  const dashboardContainerStyle = {
    // ใช้ auto-fit และ minmax เพื่อให้ Card จัดเรียงเป็นคอลัมน์เดียวบนหน้าจอเล็ก และหลายคอลัมน์บนหน้าจอใหญ่
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
    gap: "25px",
    padding: "20px 10px", // ลด padding แนวราบสำหรับหน้าจอเล็ก
    backgroundColor: "#f4f7f9",
    fontFamily: "Kanit, Arial, sans-serif", 
    minHeight: "100vh",
  };

  // สไตล์สำหรับ Alert Card (กินพื้นที่เต็มความกว้าง)
  const alertCardStyle = {
    gridColumn: "1 / -1", // ขยายให้เต็ม Grid
    backgroundColor: "#fff8e1",
    border: "1px solid #ffd740",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  };

  // สไตล์สำหรับ Header
  const headerStyle = {
    gridColumn: "1 / -1", // ขยายให้เต็ม Grid
    marginBottom: "10px",
    paddingBottom: "15px",
    borderBottom: "3px solid #007bff",
    color: "#333",
    paddingLeft: "10px", // เพิ่ม padding ให้ดูดีขึ้น
  };

  const alertListStyle = {
    listStyleType: "none",
    padding: "0",
    margin: 0,
  };

  const alertItemStyle = {
    backgroundColor: "#ffe0b2",
    color: "#ff8f00",
    padding: "12px",
    marginBottom: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    borderLeft: "4px solid #ff9800",
    transition: 'background-color 0.2s',
  };


  return (
    <div style={dashboardContainerStyle}>
      {/* 1. Header ผู้ป่วย */}
      <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: "1.8em" }}>🏥 ข้อมูลผู้ป่วย</h1>
        <p style={{ margin: "5px 0 0", color: "#555", fontSize: "1.1em" }}>
          **คุณ{patientData.name}** | รหัส: **{patientData.patientId}**
        </p>
      </div>

      {/* 2. การแจ้งเตือนสำคัญ (Alerts) - ส่วนที่กดได้ */}
      <div style={alertCardStyle}>
        <h2 style={{ color: "#e53935", margin: "0 0 15px", fontSize: "1.4em" }}>
          🚨 การแจ้งเตือนสำคัญ
        </h2>
        <ul style={alertListStyle}>
          {alerts.map((alert, index) => (
            <li
              key={index}
              style={alertItemStyle}
              onClick={() => handleCardClick(`การแจ้งเตือน: ${alert}`)}
              role="button"
              tabIndex="0"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff3e0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffe0b2'}
            >
              {alert}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. ยอดค่าชำระ (เน้นสีแดง) - ส่วนที่กดได้ */}
      <ClickableCard
        title="ยอดค่าชำระคงค้าง"
        value={patientData.outstandingPayment}
        detail="กรุณาชำระก่อนวันที่ 30 ต.ค."
        color="#c62828"
        backgroundColor="#ffebee"
        onClick={() => handleCardClick("ยอดค่าชำระ")}
        hoveredCard={hoveredCard}
        setHoveredCard={setHoveredCard}
        id="payment"
      />

      {/* 4. ยอดเงินประกัน & ข้อมูลกรรมธรรม์ - ส่วนที่กดได้ */}
      <ClickableCard
        title="ยอดเงินประกันคงเหลือ"
        value={patientData.insuranceBalance}
        detail={`กรมธรรม์: ${patientData.policyInfo}`}
        color="#1b5e20"
        backgroundColor="#e8f5e9"
        onClick={() => handleCardClick("ข้อมูลประกันและกรมธรรม์")}
        hoveredCard={hoveredCard}
        setHoveredCard={setHoveredCard}
        id="insurance"
      />
      
      {/* 5. คำวินิจฉัยหมอล่าสุด - ส่วนที่กดได้ */}
      <ClickableCard
        title="คำวินิจฉัยหมอ"
        value={patientData.doctorDiagnosis}
        detail="คลิกเพื่อดูผลการตรวจ, ใบสั่งยา และประวัติการรักษา"
        color="#0277bd"
        backgroundColor="#e1f5fe"
        onClick={() => handleCardClick("คำวินิจฉัยหมอ")}
        hoveredCard={hoveredCard}
        setHoveredCard={setHoveredCard}
        id="diagnosis"
      />

      {/* 6. ห้องพักและแผนการรักษา - ส่วนที่กดได้ */}
      <ClickableCard
        title="ห้องพัก & แผนการรักษา"
        value={`ห้อง: ${patientData.room}`}
        detail={`แผน: ${patientData.treatmentPlan}`}
        color="#6a1b9a"
        backgroundColor="#f3e5f5"
        onClick={() => handleCardClick("ห้องพักและแผนการรักษา")}
        hoveredCard={hoveredCard}
        setHoveredCard={setHoveredCard}
        id="treatment"
      />
    </div>
  );
}