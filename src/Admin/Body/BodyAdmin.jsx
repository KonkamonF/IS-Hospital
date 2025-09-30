import React, { useEffect, useState } from "react";
import i3 from "../../assets/3.png";
import i4 from "../../assets/4.png";
import i5 from "../../assets/5.png";
import i6 from "../../assets/6.png";
import i7 from "../../assets/7.png";

export default function BodyAdmin() {
  // Mock data ผู้ป่วย (เพิ่ม property 'cost', 'roomNumber', และ 'insuranceProvider')
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Somchai Prasert",
      admitStatus: "Admit", // IPD
      paymentStatus: "รอชำระ",
      insuranceStatus: "รอส่งประกัน",
      sentTime: null,
      cost: 15500,
      roomNumber: "301", // NEW: เลขห้อง
      insuranceProvider: "AIA", // NEW: บริษัทประกัน
      i: i3,
    },
    {
      id: 2,
      name: "Warinya Thongdee",
      admitStatus: "OPD", // จะถูก Filter ออก
      paymentStatus: "ชำระแล้ว",
      insuranceStatus: "รอตอบกลับ",
      sentTime: new Date(new Date().getTime() - 70 * 60000), // ส่งมาแล้ว 70 นาที (เกิน 1 ชม.)
      cost: 4200,
      roomNumber: "-",
      insuranceProvider: "Allianz Ayudhya",
      i: i4,
    },
    {
      id: 3,
      name: "Anan Pholchai",
      admitStatus: "Admit", // IPD
      paymentStatus: "ชำระแล้ว",
      insuranceStatus: "อนุมัติ",
      sentTime: new Date(new Date().getTime() - 30 * 60000), // ส่งมาแล้ว 30 นาที
      cost: 87500,
      roomNumber: "410",
      insuranceProvider: "Muang Thai Life",
      i: i5,
    },
    {
      id: 4,
      name: "Chutima Sriboon",
      admitStatus: "Admit", // IPD
      paymentStatus: "รอชำระ",
      insuranceStatus: "รอตอบกลับ",
      sentTime: new Date(new Date().getTime() - 120 * 60000), // ส่งมาแล้ว 120 นาที (2 ชม.)
      cost: 45000,
      roomNumber: "205",
      insuranceProvider: "Krungthai-AXA",
      i: i6,
    },
    {
      id: 5,
      name: "Pichai Meesuk",
      admitStatus: "Admit", // IPD
      paymentStatus: "รอชำระ",
      insuranceStatus: "ปฏิเสธ",
      sentTime: new Date(new Date().getTime() - 10 * 60000),
      cost: 21000,
      roomNumber: "502",
      insuranceProvider: "Bangkok Health Insurance (TPA)",
      i: i7,
    },
    {
      id: 6,
      name: "Supaporn Dee",
      admitStatus: "Admit", // IPD
      paymentStatus: "ชำระแล้ว",
      insuranceStatus: "ส่งแล้ว",
      sentTime: new Date(new Date().getTime() - 15 * 60000),
      cost: 32000,
      roomNumber: "308",
      insuranceProvider: "Tokio Marine",
      i: i4,
    },
  ]);

  const [time, setTime] = useState(new Date());

  // Update เวลาทุกๆ 1 นาที
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // ฟังก์ชันคำนวณเวลารอประกัน
  const getWaitingTime = (sentTime) => {
    if (!sentTime) return "-";
    const diffMs = new Date() - new Date(sentTime);
    const diffMin = Math.floor(diffMs / 60000);
    return `${diffMin} นาที`;
  };

  // ฟังก์ชันจัดรูปแบบตัวเลขให้เป็นสกุลเงินบาท
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // กรองข้อมูล: แสดงเฉพาะผู้ป่วยใน (IPD)
  const ipdPatients = patients.filter((p) => p.admitStatus === "Admit");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-[#2155CD] mb-6 border-b-4 border-yellow-500 pb-2">
        🛡️ IPD Insurance Administration Dashboard
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-2xl">
        <table className="w-full border-collapse border">
          <thead className="bg-[#2155CD] text-white sticky top-0">
            <tr>
              <th className="p-3 text-left">รูป</th>
              <th className="p-3 text-left">ชื่อผู้ป่วย</th>
              <th className="p-3 text-left">เลขห้อง</th> {/* NEW */}
              <th className="p-3 text-left">บริษัทประกัน</th> {/* NEW */}
              <th className="p-3 text-left">การชำระเงิน</th>
              <th className="p-3 text-left">สถานะประกัน</th>
              <th className="p-3 text-right">ค่ารักษาพยาบาล</th>
              <th className="p-3 text-left">เวลาที่รอ</th>
            </tr>
          </thead>
          <tbody>
            {ipdPatients.map((p) => {
              const waitingTime = p.sentTime
                ? new Date() - new Date(p.sentTime)
                : 0;
              const isOver1h = waitingTime > 60 * 60 * 1000; // เกิน 1 ชม.

              return (
                <tr
                  key={p.id}
                  className="border-b bg-white hover:bg-indigo-50 transition"
                >
                  <td>
                    {" "}
                    <img src={p.i} alt="" className="w-[150px]" />
                  </td>
                  <td className="p-3 font-medium text-gray-900">{p.name}</td>

                  {/* แสดงเลขห้อง */}
                  <td className="p-3 font-bold text-indigo-600">
                    {p.roomNumber}
                  </td>

                  {/* แสดงบริษัทประกัน */}
                  <td className="p-3 text-sm text-gray-600">
                    {p.insuranceProvider}
                  </td>

                  <td
                    className={`p-3 font-semibold ${
                      p.paymentStatus === "ชำระแล้ว"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {p.paymentStatus}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      p.insuranceStatus.includes("รอ")
                        ? "text-yellow-600"
                        : p.insuranceStatus === "อนุมัติ"
                        ? "text-green-600"
                        : p.insuranceStatus === "ปฏิเสธ"
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                  >
                    {p.insuranceStatus}
                  </td>
                  {/* แสดงค่ารักษาพยาบาล */}
                  <td className="p-3 text-right font-bold text-blue-700">
                    {formatCurrency(p.cost)}
                  </td>
                  <td
                    className={`p-3 ${
                      isOver1h ? "text-red-600 font-bold" : "text-gray-700"
                    }`}
                  >
                    {getWaitingTime(p.sentTime)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer / Summary */}
      <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-[#2155CD]">
          จำนวนผู้ป่วยใน (IPD):{" "}
          <span className="text-3xl">{ipdPatients.length}</span> ราย
        </p>
      </div>
    </div>
  );
}
