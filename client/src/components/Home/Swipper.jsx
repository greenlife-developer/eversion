import { useState, useEffect } from "react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper";
import reviews from "../../customerReview";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRef } from "react";

export default () => {
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth <= 425) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, A11y]}
      spaceBetween={15}
      slidesPerView={isMobile ? 1 : 3}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {reviews.map((review, id) => {
        return (
          <SwiperSlide>
            <div className="reviews">
              <span>{review.star}</span>
              <h6 className="container">{review.message}</h6>
              <img src={review.img} alt="" />
            </div>
          </SwiperSlide>
        );
      })}
      ...
    </Swiper>
  );
};
