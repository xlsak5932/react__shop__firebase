// import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slide.css";

const Slide = () => {
  return (
    <div>
      <div className="slide__box">
        <Carousel
          showArrows={true}
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          showThumbs={false}
        >
          <div>
            <img src="/banner1.jpg" />
          </div>
          <div>
            <img src="/banner2.jpg" />
          </div>
          <div>
            <img src="/banner3.jpg" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Slide;
