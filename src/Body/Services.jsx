import React from "react";
import Header from "../Header/Header";
import h6 from "../assets/h6.png";
import h7 from "../assets/h7.png";
import h8 from "../assets/h8.png";
import h12 from "../assets/h12.png";
import h10 from "../assets/h10.png";
import h11 from "../assets/h11.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation,Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../index.css";

export default function Services() {
  return (
    <>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        loop
        autoplay={{ delay: 2000 }}
        style={{ height: "500px" , width: "80%", margin: "auto", marginTop: "50px" }}
      >
        <SwiperSlide>
          <img src={h6} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={h7} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={h8} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={h10} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={h11} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={h12} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
