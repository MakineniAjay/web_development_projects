import React from "react";
import Slider from "react-slick";

import ava01 from "../../../assets/images/ava-1.jpg";
import ava02 from "../../../assets/images/ava-2.jpg";
import ava03 from "../../../assets/images/ava-3.jpg";

import "../../../styles/slider.css";

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <p className="review__text">
          "My wife has been trying to get me here for months. It is awesome he loves the Pizza at Pizza Galore !! We got that and a slice of pizza and split it down the middle. 
          It was amazing and soo much food we had left overs. 
          However we must not have had enough, we live in Patna but are headed back right now to introduce my son to some of this deliciousness."
        </p>
        <div className=" slider__content d-flex align-items-center gap-3 ">
          <img src={ava01} alt="avatar" className=" rounded" />
          <h6>Mahanthy</h6>
        </div>
      </div>
      <div>
        <p className="review__text">
          "If you like thin crust traditional New York style pizza, then you're gonna love this place! Crust is perfect, (we always ask for well done), and sauce is good and not too heavy. 
          You always know you're going to get a good pizza when you order from these guys."
        </p>
        <div className="slider__content d-flex align-items-center gap-3 ">
          <img src={ava02} alt="avatar" className=" rounded" />
          <h6>Battu Samhitha</h6>
        </div>
      </div>
      <div>
        <p className="review__text">
          "Pizza, good stuff. Would eat here again. Definitely try the root beer on tap.  Stromboli is very good.  I really like the aesthetics of the place, really cool vibe.  
          Bathrooms are clean and there is a changing table in a spot where moms or dads can access it and that really speaks to me."
        </p>
        <div className="slider__content d-flex align-items-center gap-3 ">
          <img src={ava03} alt="avatar" className=" rounded" />
          <h6>Santhu Kumar</h6>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialSlider;
