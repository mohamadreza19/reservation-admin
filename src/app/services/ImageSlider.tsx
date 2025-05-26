// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
import "swiper/css";
import { useEffect, useMemo, useRef } from "react";
import { Swiper, Swiper as SwiperType } from "swiper/types";
import Sidler from "./swiper/Slider";

const Each = () => (
  <div className="w-full h-full border border-solid overflow-hidden border-outline-variant rounded-2xl">
    <img
      className="w-full h-full border-2 border-solid border-white rounded-2xl"
      src={"https://picsum.photos/200/300"}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-transparent"></div>
  </div>
);

export default () => {
  const ref = useRef<SwiperType>(null);

  const onSwiper = (swiper: Swiper) => (ref.current = swiper);

  useEffect(() => {
    console.log(ref.current);
  }, [ref.current]);
  return <></>;
};
