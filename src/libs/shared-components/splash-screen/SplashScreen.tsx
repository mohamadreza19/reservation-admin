"use client";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useTimeout, useToggle } from "usehooks-ts";
import { motion } from "framer-motion";
interface SplashScreenProps {}

const SplashScreen: FunctionComponent<SplashScreenProps> = () => {
  const [isVisible, toggle] = useToggle(true);
  const hide = () => {
    toggle();
    console.log("hide");
  };

  useTimeout(hide, 3000);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 flex justify-center items-center ${
        isVisible ? "block" : "!hidden pointer-events-none"
      } `}
    >
      <img
        src="/intro.gif"
        className={`w-80 h-80 object-contain transition-opacity duration-300`}
        alt="Intro"
      />
    </div>
  );
};

export default SplashScreen;
