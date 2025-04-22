"use client";
import React, { useState } from "react";
import { LEAD_CARD_DATA_LIST } from "@/utils/helper";
import Link from "next/link";
import Loading from "./Loading";

interface LeadCardData {
  title: string;
  description: string;
  bgImage: string;
}

const LeadCard: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<string>("");

  const allCardsShown = visibleCount >= LEAD_CARD_DATA_LIST.length;

  const handleAddCards = () => {
    const scrollToIndex = visibleCount + 1;

    setIsLoading("inc");
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoading("");

      setTimeout(() => {
        const el = document.getElementById(`${scrollToIndex}-th-card`);
        if (el) {
          const yOffset = -24;
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }, 3000);
  };

  const handleLessCards = () => {
    const newCount = Math.max(3, visibleCount - 3); // never go below 3
    const scrollToIndex = newCount - 2; // point to the card that will remain visible

    setIsLoading("dec");
    setTimeout(() => {
      setVisibleCount(newCount);
      setIsLoading("");

      const el = document.getElementById(`${scrollToIndex}-th-card`);
      if (el) {
        const yOffset = -24;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 1000);
  };

  return (
    <div className="pt-20 container mx-auto">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 gap-3 justify-center">
        {LEAD_CARD_DATA_LIST.map((obj: LeadCardData, i: number) => {
          const IsCardVisible = i + 1 <= visibleCount;

          return (
            <div
              key={i}
              id={i % 3 === 0 ? `${i + 1}-th-card` : undefined}
              style={{ maxHeight: IsCardVisible ? "550px" : "0px" }}
              className={`overflow-hidden transition-all ease-linear duration-300 rounded-md ${
                IsCardVisible ? "" : "pointer-events-none opacity-0"
              } hover:shadow-[0_0_20px_0_rgba(0,0,0,0.3)]`}>
              <Link
                href={`/card/${obj?.title?.toLowerCase()?.replace(/ /g, "-") || "404"}`}
                className={`${obj.bgImage} bg-full !bg-no-repeat w-full lg:max-w-[440px] 2xl:max-w-full min-h-[551px] relative xl:p-7 p-5 flex group`}>
                <div className="flex items-end mx-auto">
                  <div className="md:min-h-[320px] min-h-[250px] max-w-[382px] w-full bg-white rounded-3xl xl:p-[35px_28px_29px_28px] p-4 flex flex-col justify-between group-hover:scale-105 overflow-hidden transition-all ease-linear duration-300">
                    <div>
                      <p className="ff_maison font-semibold text-base leading-[20px] text-[#00AFB5] uppercase md:pb-4 pb-3">
                        lead-gen
                      </p>
                      <h2 className="font-light md:text-[30px] text-lg leading-[100%] text-black md:mb-4 mb-2 line-clamp-2 pb-0.5">
                        {obj.title}
                      </h2>
                      <p className="font-normal md:text-[15px] leading-[20px] md:text-xl text-base text-black line-clamp-3">
                        {obj.description}
                      </p>
                    </div>
                    <div>
                      <button className="cursor-pointer font-semibold md:text-base text-sm leading-[20px] text-black relative group">
                        <span className="inline-block transition-all ease-linear duration-300 w-0 h-px bg-black bottom-0 left-0 absolute group-hover:w-full"></span>
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center space-x-4">
        {visibleCount > 3 && (
          <button
            onClick={handleLessCards}
            className="bg-blue-500 rounded-lg text-white text-base py-4 px-6 border border-solid border-transparent hover:bg-white hover:text-blue-500 hover:border-blue-500 active:scale-95 active:duration-75 transition-all duration-300 ease-linear font-bold">
            {isLoading === "dec" ? <Loading /> : "Show Less"}{" "}
          </button>
        )}
        {!allCardsShown && (
          <button
            onClick={handleAddCards}
            className="bg-blue-500 rounded-lg text-white text-base py-4 px-6 border border-solid border-transparent hover:bg-white hover:text-blue-500 hover:border-blue-500 active:scale-95 active:duration-75 transition-all duration-300 ease-linear font-bold">
            {isLoading === "inc" ? <Loading /> : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LeadCard;
