import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CarouselComponent = ({ carouselItems }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: (
      <ChevronRightIcon
        sx={{
          color: "black",
          marginRight: "2px",
          ":hover": { color: "#93370a" },
        }}
      />
    ),
    prevArrow: (
      <ChevronLeftIcon
        sx={{
          color: "black",
          marginLeft: "2px",
          ":hover": { color: "#93370a" },
        }}
      />
    ),
  };

  return (
    <div
      style={{
        marginLeft: "17px",
        marginRight: "17px",
        marginBottom: "22px",
        marginTop: "2px",
        position: "relative",
        maxWidth: "100%",
      }}
    >
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={item.caption} width="100%" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
