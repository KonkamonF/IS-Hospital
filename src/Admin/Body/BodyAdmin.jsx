import React, { useEffect, useState } from "react";

export default function BodyAdmin() {
  // Mock data ผู้ป่วย
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Somchai Prasert",
      admitStatus: "Admit", // Admit / OPD
      paymentStatus: "รอชำระ", // รอชำระ / ชำระแล้ว
      insuranceStatus: "รอส่งประกัน", // รอส่ง / ส่งแล้ว / รอตอบกลับ / อนุมัติ / ปฏิเสธ
      sentTime: null, // เวลาเริ่มส่งประกัน
    },
    {
      id: 2,
      name: "Warinya Thongdee",
      admitStatus: "OPD",
      paymentStatus: "ชำระแล้ว",
      insuranceStatus: "รอตอบกลับ",
      sentTime: new Date(new Date().getTime() - 70 * 60000), // ส่งมาแล้ว 70 นาที
    },
    {
      id: 3,
      name: "Anan Pholchai",
      admitStatus: "Admit",
      paymentStatus: "ชำระแล้ว",
      insuranceStatus: "อนุมัติ",
      sentTime: new Date(new Date().getTime() - 30 * 60000), // ส่งมาแล้ว 30 นาที
    },
  ]);

  const [time, setTime] = useState(new Date());

  // Update เวลาทุกๆ 1 นาที (หรือทุก 1 วินาทีถ้าต้องการ realtime มากขึ้น)
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛡️ Admin Dashboard</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-xl shadow">
          <thead className="bg-[#2155CD] text-white">
            <tr>
              <th className="p-3 text-left">ชื่อผู้ป่วย</th>
              <th className="p-3 text-left">การ Admit</th>
              <th className="p-3 text-left">การชำระเงิน</th>
              <th className="p-3 text-left">สถานะประกัน</th>
              <th className="p-3 text-left">เวลาที่รอ</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => {
              const waitingTime = p.sentTime ? new Date() - new Date(p.sentTime) : 0;
              const isOver1h = waitingTime > 60 * 60 * 1000; // เกิน 1 ชม.

              return (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.admitStatus}</td>
                  <td
                    className={`p-3 ${
                      p.paymentStatus === "ชำระแล้ว"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }`}
                  >
                    {p.paymentStatus}
                  </td>
                  <td
                    className={`p-3 ${
                      p.insuranceStatus.includes("รอ")
                        ? "text-yellow-600 font-semibold"
                        : p.insuranceStatus === "อนุมัติ"
                        ? "text-green-600 font-semibold"
                        : p.insuranceStatus === "ปฏิเสธ"
                        ? "text-red-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {p.insuranceStatus}
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
    </div>
  );
}
