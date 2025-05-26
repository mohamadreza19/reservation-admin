import { SwiperOptions, Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
import "swiper/css";
import { FC, useEffect, useMemo, useRef } from "react";

const Each = () => (
  <div className="w-full h-full border border-solid overflow-hidden border-outline-variant rounded-2xl">
    <img
      className="w-full h-full border-2 border-solid border-white rounded-2xl"
      src={"https://picsum.photos/200/300"}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-transparent"></div>
  </div>
);
const Sidler: FC<SwiperOptions> = () => {
  const ref = useRef<SwiperType>(null);

  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={16}
        slidesPerView={3.5}
        onSwiper={(swiper) => (ref.current = swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Each />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Each />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Each />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Each />
        </SwiperSlide>
        ...
      </Swiper>
    </>
  );
};

export default Sidler;
