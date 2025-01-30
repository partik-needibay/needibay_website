"use client";
import React from "react";
import Slider from "react-slick";
import FlexBox from "@component/FlexBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <h1 style={{ textAlign: "center" }}>1</h1>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>2</h1>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>3</h1>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>4</h1>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>5</h1>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>6</h1>
      </div>
    </Slider>
  );
}
