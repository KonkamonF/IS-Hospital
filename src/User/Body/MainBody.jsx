import React from "react";
import Logo from "../../assets/LogononBG.png";

export default function MainBody() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-blue-600">
            Real-time Fax Claim Service
          </h1>
          <p className="text-gray-600">
            Our product offers a Real-time Fax Claim Service, sending treatment
            and billing details directly to insurance providers. This speeds up
            claim approval, reduces paperwork, and shortens patient waiting
            times.
          </p>
          <img src={Logo} alt="" />
        </div>
        {/* Introduction */}
        {/* <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">
            เกี่ยวกับเรา
          </h2>
          <p className="text-gray-700 leading-relaxed">
            โรงพยาบาลของเรามุ่งมั่นในการให้บริการทางการแพทย์อย่างครบวงจร
            ด้วยมาตรฐานระดับสากล ครอบคลุมทั้งการตรวจรักษา ป้องกันโรค
            การฟื้นฟูสุขภาพ และการดูแลผู้ป่วยแบบองค์รวม
            เพื่อสร้างความมั่นใจให้แก่ผู้รับบริการทุกท่าน
          </p>
        </div>

   
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              การตรวจรักษา
            </h3>
            <p className="text-gray-700 leading-relaxed">
              ให้บริการตรวจวินิจฉัยโรคทั่วไปและเฉพาะทาง
              โดยทีมแพทย์ผู้เชี่ยวชาญในแต่ละสาขา
              พร้อมเครื่องมือทางการแพทย์ที่ทันสมัยและแม่นยำ
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              การผ่าตัดและหัตถการ
            </h3>
            <p className="text-gray-700 leading-relaxed">
              ศูนย์ผ่าตัดที่ได้มาตรฐานความปลอดภัยระดับสากล
              รองรับทั้งการผ่าตัดเล็กและใหญ่ โดยทีมแพทย์ศัลยกรรมผู้มีประสบการณ์
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              การดูแลผู้ป่วยใน
            </h3>
            <p className="text-gray-700 leading-relaxed">
              ห้องพักผู้ป่วยที่สะดวกสบาย พร้อมการดูแลจากทีมพยาบาลตลอด 24 ชั่วโมง
              เพื่อให้ผู้ป่วยและครอบครัวได้รับการบริการที่อบอุ่นและปลอดภัย
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              โปรแกรมตรวจสุขภาพ
            </h3>
            <p className="text-gray-700 leading-relaxed">
              โปรแกรมตรวจสุขภาพที่ครอบคลุมและหลากหลาย เหมาะสมตามวัยและความเสี่ยง
              เพื่อการป้องกันโรคและส่งเสริมสุขภาพในระยะยาว
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
