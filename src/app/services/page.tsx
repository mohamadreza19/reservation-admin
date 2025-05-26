"use client";
import { FunctionComponent } from "react";
import EmblaCarousel from "./carosel/src/js/EmblaCarousel";

interface PageProps {}
const OPTIONS = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Page: FunctionComponent<PageProps> = () => {
  return (
    <div>
      <div className="flex h-[400px] max p-9">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
    </div>
  );
};

export default Page;
