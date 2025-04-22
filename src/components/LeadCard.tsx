/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import LeadCardsList from "./LeadCardsList";
import Loading from "./Loading";

interface LeadCardProps {
  data: any[];
}

const LeadCard: React.FC<LeadCardProps> = ({ data: posts }) => {
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<string>("");

  const allCardsShown = visibleCount >= posts?.length;

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
    const newCount = Math.max(3, visibleCount - 3);
    const scrollToIndex = newCount - 2;

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
    <div className="pt-20 container mx-auto px-5">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 gap-3 justify-center mb-4">
        <LeadCardsList visibleCount={visibleCount} posts={posts} />
      </div>

      {posts.length > 3 && (
        <div className="flex justify-center space-x-4">
          {visibleCount > 3 && (
            <button
              onClick={handleLessCards}
              className="bg-blue-500 rounded-lg text-white text-base py-4 px-6 border border-solid border-transparent hover:bg-white hover:text-blue-500 hover:border-blue-500 active:scale-95 active:duration-75 transition-all duration-300 ease-linear font-bold">
              {isLoading === "dec" ? <Loading /> : "Show Less"}
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
      )}
    </div>
  );
};

export default LeadCard;
