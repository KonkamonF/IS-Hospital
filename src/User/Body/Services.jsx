import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Info, CheckCircle, Home, ClipboardList } from 'lucide-react';

// ✅ Import รูปจาก assets
import h6 from "../../assets/h6.png";
import h7 from "../../assets/h7.png";
import h8 from "../../assets/h8.png";
import h12 from "../../assets/h12.png";
import h10 from "../../assets/h10.png";
import h11 from "../../assets/h11.png";

// --- Helper Function for Consistent HTML Structure (Generate the Full Details HTML) ---
const generateFullDetailsHtml = (title, roomPrice, nursePrice, hospitalPrice, amenities) => {
    // Helper for amenities list
    const amenityListHtml = amenities.map(item => 
        `<li class="flex items-center text-sm sm:text-base"><svg class="w-4 h-4 mr-2 text-green-500 fill-green-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z"/></svg>${item}</li>`
    ).join('');

    // The core detailed HTML structure
    return `
        <h3 class="text-xl sm:text-2xl font-bold mb-4 text-indigo-700 flex items-center">
            รายละเอียดค่าบริการ: ${title}
        </h3>
        <ul class="list-none space-y-3 mb-8 p-4 sm:p-6 bg-indigo-50 rounded-xl border border-indigo-200">
            <li class="flex flex-col sm:flex-row justify-between font-semibold text-gray-800 border-b pb-2 sm:pb-0 sm:border-b-0">
                <span class="text-lg text-indigo-800">ค่าห้อง + ค่าอาหาร:</span>
                <span class="text-xl font-extrabold text-indigo-600">${roomPrice} บาท</span>
            </li>
            <li class="flex flex-col sm:flex-row justify-between text-gray-600 border-b pb-2 sm:pb-0 sm:border-b-0">
                <span class="text-base sm:text-lg text-gray-700">ค่าบริการพยาบาล:</span>
                <span class="font-medium">${nursePrice} บาท</span>
            </li>
            <li class="flex flex-col sm:flex-row justify-between text-gray-600">
                <span class="text-base sm:text-lg text-gray-700">ค่าบริการโรงพยาบาล:</span>
                <span class="font-medium">${hospitalPrice} บาท</span>
            </li>
        </ul>
        
        <h4 class="font-bold mt-4 mb-3 text-xl text-gray-700 flex items-center border-b pb-2">
            สิ่งอำนวยความสะดวกในห้อง
        </h4>
        <ul class="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-gray-700">
            ${amenityListHtml}
        </ul>

        <h4 class="font-bold mt-8 mb-3 text-xl text-gray-700 flex items-center border-b pb-2">
            หลักการคิดค่าบริการ
        </h4>
        <ul class="list-disc ml-6 space-y-2 text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <li>ไม่เกิน 12 ชั่วโมง &rarr; คิดครึ่งวัน</li>
            <li>12&ndash;24 ชั่วโมง &rarr; คิด 1 วัน</li>
            <li>เกินกว่า 24 ชั่วโมง &rarr; เศษวัน &lt; 12 ชม. คิดครึ่งวัน</li>
            <li>สามารถขยายเวลาใช้ห้องเพิ่มได้อีก 2 ชั่วโมง (นับจากเวลาชำระ)</li>
        </ul>
    `;
};


// --- Data for all 5 rooms ---
const ROOM_DATA = [
  {
    title: "Ward 5I (Deluxe)",
    detailsCard: "ค่าห้อง + อาหาร: 17,550 ฿ | พยาบาล: 4,200 ฿ | บริการ รพ.: 3,000 ฿ | สิ่งอำนวยความสะดวก: เตียง, โซฟา, WiFi, ทีวี, ตู้เย็น, ไมโครเวฟ ฯลฯ",
    detailsPopup: "ห้อง 5I (Deluxe) — 17,550 บาท (รวมอาหาร), บริการพยาบาล 4,200 บาท, บริการโรงพยาบาล 3,000 บาท",
    detailsFullHTML: generateFullDetailsHtml("Ward 5I (Deluxe)", "17,550", "4,200", "3,000", ["เตียงผู้ป่วย", "โซฟาสำหรับญาติ", "ห้องน้ำภายใน", "ตู้เย็น", "อินเทอร์เน็ต WiFi", "ทีวี", "ไมโครเวฟ"]),
    imageUrl: h6,
  },
  {
    title: "Ward 4A (Standard)",
    detailsCard: "ค่าห้อง + อาหาร: 8,500 ฿ | พยาบาล: 2,500 ฿ | บริการ รพ.: 2,000 ฿ | สิ่งอำนวยความสะดวก: เตียง, ห้องน้ำภายใน, ตู้เย็น, ทีวี",
    detailsPopup: "ห้อง 4A (Standard) — 8,500 บาท (รวมอาหาร), บริการพยาบาล 2,500 บาท, บริการโรงพยาบาล 2,000 บาท",
    detailsFullHTML: generateFullDetailsHtml("Ward 4A (Standard)", "8,500", "2,500", "2,000", ["เตียงผู้ป่วย", "ห้องน้ำภายใน", "ตู้เย็น", "ทีวี"]),
    imageUrl: h7,
  },
  {
    title: "VIP Suite (Luxury)",
    detailsCard: "ค่าห้อง + อาหาร: 35,000 ฿ | พยาบาล: 6,000 ฿ | บริการ รพ.: 5,000 ฿ | สิ่งอำนวยความสะดวก: ห้องรับแขก, ครัวเล็ก, อ่างอาบน้ำ, WiFi, ทีวี 2 เครื่อง",
    detailsPopup: "VIP Suite (Luxury) — 35,000 บาท (รวมอาหาร), บริการพยาบาล 6,000 บาท, บริการโรงพยาบาล 5,000 บาท",
    detailsFullHTML: generateFullDetailsHtml("VIP Suite (Luxury)", "35,000", "6,000", "5,000", ["เตียงผู้ป่วยระดับพรีเมียม", "ห้องรับแขกแยก", "ห้องครัวขนาดเล็ก", "อ่างอาบน้ำ", "อินเทอร์เน็ต WiFi", "ทีวี 2 เครื่อง", "ไมโครเวฟ/กาต้มน้ำ"]),
    imageUrl: h8,
  },
  {
    title: "Semi-Private (Superior)",
    detailsCard: "ค่าห้อง + อาหาร: 12,000 ฿ | พยาบาล: 3,500 ฿ | บริการ รพ.: 2,500 ฿ | สิ่งอำนวยความสะดวก: เตียงผู้ป่วย, โซฟา, ห้องน้ำรวม, WiFi, ทีวี",
    detailsPopup: "ห้อง Semi-Private — 12,000 บาท (รวมอาหาร), บริการพยาบาล 3,500 บาท, บริการโรงพยาบาล 2,500 บาท",
    detailsFullHTML: generateFullDetailsHtml("Semi-Private (Superior)", "12,000", "3,500", "2,500", ["เตียงผู้ป่วย", "โซฟาสำหรับญาติ", "ห้องน้ำภายใน (แชร์)", "ตู้เย็น (แชร์)", "อินเทอร์เน็ต WiFi", "ทีวี"]),
    imageUrl: h12,
  },
  {
    title: "Pediatric Ward (Child)",
    detailsCard: "ค่าห้อง + อาหาร: 7,000 ฿ | พยาบาล: 2,800 ฿ | บริการ รพ.: 1,800 ฿ | สิ่งอำนวยความสะดวก: เตียงเด็ก, โซฟาสำหรับผู้ปกครอง, ของเล่น",
    detailsPopup: "ห้อง Pediatric Ward — 7,000 บาท (รวมอาหาร), บริการพยาบาล 2,800 บาท, บริการโรงพยาบาล 1,800 บาท",
    detailsFullHTML: generateFullDetailsHtml("Pediatric Ward (Child)", "7,000", "2,800", "1,800", ["เตียงสำหรับเด็ก", "โซฟา/เตียงเสริมสำหรับผู้ปกครอง", "ห้องน้ำภายใน", "ตู้เย็นเล็ก", "ทีวีพร้อมช่องการ์ตูน", "มุมของเล่น"]),
    imageUrl: h10,
  },
  {
    title: "VIP Family Room",
    detailsCard: "ค่าห้อง + อาหาร: 25,000 ฿ | พยาบาล: 5,000 ฿ | บริการ รพ.: 4,000 ฿ | สิ่งอำนวยความสะดวก: ห้องนั่งเล่น, ครัวเล็ก, 2 เตียง",
    detailsPopup: "VIP Family Room — 25,000 บาท (รวมอาหาร), บริการพยาบาล 5,000 บาท, บริการโรงพยาบาล 4,000 บาท",
    detailsFullHTML: generateFullDetailsHtml("VIP Family Room", "25,000", "5,000", "4,000", ["เตียงผู้ป่วย 2 เตียง", "ห้องนั่งเล่น", "ครัวขนาดเล็ก", "ห้องน้ำส่วนตัว", "WiFi", "ทีวี"]),
    imageUrl: h11,
  },
];



export default function Serives() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = ROOM_DATA.length; 
  const delay = 4000; // Autoplay delay
  
  const currentRoom = ROOM_DATA[currentSlide];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, delay);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-['Inter',_sans-serif]">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <header className="p-6 sm:p-8 bg-[#e3ecff] ">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-center tracking-wide">
              ข้อมูลห้องพักพิเศษ
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-center mt-1 opacity-90">
              {currentRoom.title}
            </h2>
        </header>

        {/* Custom Slider */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {ROOM_DATA.map((room, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={room.imageUrl}
                alt={room.title}
                className="w-full h-full object-cover"
              />
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-700" 
                  style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                />
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 sm:p-4 rounded-full transition duration-300 z-20 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6"/>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 sm:p-4 rounded-full transition duration-300 z-20 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6"/>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* Quick Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-blue-50 border-l-4 border-blue-500 rounded-xl shadow-md">
            <Info className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0 mr-0 sm:mr-4 mb-2 sm:mb-0" />
            <p className="text-sm sm:text-base font-medium text-gray-800">
              <span className="font-bold text-blue-700">แจ้งเตือน (Quick Info):</span> {currentRoom.detailsPopup}
            </p>
          </div>

          {/* Card */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-inner">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-3 border-b pb-2">
              สรุปข้อมูลเบื้องต้น (Quick Card)
            </h2>
            <p className="text-sm sm:text-lg font-medium leading-relaxed">
              {currentRoom.detailsCard}
            </p>
          </div>

          {/* Full Details */}
          <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-lg">
            <div 
              dangerouslySetInnerHTML={{ __html: currentRoom.detailsFullHTML }}
              className="prose max-w-none text-base"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
