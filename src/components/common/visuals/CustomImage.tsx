"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const CustomImage = ({
  src,
  alt,
  height,
  width,
  className,
}: {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
}) => {
  const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!height || !width) {
      if (parentRef.current) {
        const parentRect = parentRef.current.getBoundingClientRect();
        setParentHeight(parentRect.height);
        setParentWidth(parentRect.width);
      }
    }
  }, []);
  const aspectRatio =
    parentHeight || (height && parentWidth) || width
      ? `${parentWidth || width}/${parentHeight || height}`
      : "16/9";
  return (
    <div
      ref={parentRef}
      style={{ aspectRatio: aspectRatio }}
      className={`${className} relative w-full h-full rounded overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        sizes="100vw"
        fill
        quality={99}
        className="absolute top-0 left-0 h-full w-full transition-all ease-linear duration-300 group-hover:scale-105 shadow-[0_0_10px_rgba(255,255,255)_inner] object-cover object-center"
      />
    </div>
  );
};

export default CustomImage;
