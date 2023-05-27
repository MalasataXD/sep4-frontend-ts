import "./Carousel.css";

import React from 'react';

import { CarouselImages } from "../config";

import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay"

function CarouselComp() {
    return (
        <div className="carousel-container-wrapper">
            <div className="carousel-container">
                <Swiper className="swiper"
                    modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    centeredSlides={false}
                    centerInsufficientSlides={true}
                    autoplay={{delay: 5000}}
                    loop={true}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {CarouselImages.map((slide) => (
                        // Loop through images defined in the config file
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