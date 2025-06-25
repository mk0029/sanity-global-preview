/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  [key: string]: any;
};

const Heading = ({
  as = "h2", // default to h2
  children,
  className = "",
  variant,
  ...rest // dummy click handler
}: HeadingProps) => {
  const allowedTags = ["h1", "h2", "h3", "h4", "h5", "h6"];

  // fallback to h2 if invalid tag
  const Tag = allowedTags.includes(as) ? as : "h2";
  // Customize heading style variants
  const variants = {
    // H1: Largest and most prominent
    h1: "text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl",
    // H2: Major section titles
    h2: "text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl",
    // H3: Subsection titles
    h3: "text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl",
    // H4: Smaller sub-headings
    h4: "text-xl font-medium sm:text-2xl md:text-3xl lg:text-4xl",
    // H5: Even smaller headings, often for lists or minor sections
    h5: "text-lg font-normal sm:text-xl md:text-2xl lg:text-3xl",
    // H6: Smallest heading, often for minor details or captions
    h6: "text-base font-normal sm:text-lg md:text-xl lg:text-2xl",
  };
  return (
    <Tag
      className={`text-black ${variants[variant || as] || variants.h1} ${className}`}
      {...rest}>
      {children}
    </Tag>
  );
};

export default Heading;
