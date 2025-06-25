"use client";
import React from "react";
import { ReactNode, HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "a";
  children: ReactNode;
  className?: string;
  variant?: "body" | "small" | "base";
}

const Text = ({
  as = "p", // default to <p>
  children,
  className = "",
  variant = "base",
  ...rest // collect all other props
}: TextProps) => {
  const allowedTags = ["p", "span", "a"];
  const Tag = allowedTags.includes(as) ? as : "p";

  const variants = {
    // Lead paragraph: Larger for introductory text
    base: "text-lg sm:text-xl md:text-2xl leading-relaxed",
    // Body paragraph: Standard text for most content
    body: "text-base sm:text-lg leading-normal",
    // Small paragraph: For meta-information, captions, or less prominent text
    small: "text-sm sm:text-base leading-snug",
  };

  return (
    <Tag
      className={`text-white ${
        variants[variant] || variants.base
      } ${className}`}
      {...rest}>
      {children}
    </Tag>
  );
};

export default Text;
