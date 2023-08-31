import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselComponent = ({ carouselItems }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      {carouselItems.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt={item.caption} />
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComponent;
