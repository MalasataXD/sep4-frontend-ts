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
        <div className="carousel-container-wrapper">
            <div className="carousel-container">
                <Swiper className="swiper"
                    modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    centeredSlides={false}
                    centerInsufficientSlides={true}
                    autoHeight={false}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {CarouselImages.map((slide) => (
                        <SwiperSlide className="swiper-slide" key={slide.url}>
                            <img className="carousel-image" src={slide.url} alt={slide.alt}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default CarouselComp;