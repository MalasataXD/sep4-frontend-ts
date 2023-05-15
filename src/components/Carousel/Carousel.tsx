import "./Carousel.css";

import React from 'react';

import { CarouselImages } from "../config";

import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';


import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function CarouselComp() {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
          {CarouselImages.map((slide) => (
            <SwiperSlide key={slide.url}>
                <img src={slide.url} alt={slide.alt}/>
            </SwiperSlide>
          ))}
        </Swiper>
      );
}

export default CarouselComp;