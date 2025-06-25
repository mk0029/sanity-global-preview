"use client";

import React, { HTMLAttributes, useMemo } from "react";
import Image from "next/image"; // Assuming Next.js environment for Image component

// Define fixed avatar size classes (width, height, font size)
const avatarSizeClasses = {
  sm: "w-8 h-8 text-xs", // 32px
  md: "w-10 h-10 text-sm", // 40px
  lg: "w-12 h-12 text-base", // 48px
  xl: "w-16 h-16 text-lg", // 64px
  "2xl": "w-24 h-24 text-xl", // 96px
};

// A palette of Tailwind background colors for dynamic avatars
const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-red-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-fuchsia-500",
];

// Helper function to deterministically generate a color based on a string (name)
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarColors.length;
  return avatarColors[index];
};

// Helper function to get initials from a name
const getInitials = (name: string): string => {
  if (!name) return "";
  const parts = name.split(" ").filter((part) => part.length > 0);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Props for the Avatar component
interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string; // Optional image URL
  alt: string; // Alt text for image, or name for initials fallback
  size?: keyof typeof avatarSizeClasses; // Size variant (e.g., 'md', 'lg')
  className?: string; // Additional custom Tailwind classes for the container
  imageClassName?: string; // Additional custom Tailwind classes for the Image element
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "md", // Default size
  className = "",
  imageClassName = "",
  ...rest // Allows passing other div attributes like onClick
}) => {
  // Memoize the initials and background color for performance
  const initials = useMemo(() => getInitials(alt), [alt]);
  const backgroundColor = useMemo(() => stringToColor(alt), [alt]);

  const sizeClasses = avatarSizeClasses[size] || avatarSizeClasses.md; // Fallback to 'md'

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 flex-grow-0 ${sizeClasses} ${className}`}
      {...rest}>
      {src ? (
        // Render image if src is provided
        <Image
          src={src}
          alt={alt}
          layout="fill" // Fill the parent div
          objectFit="cover" // Cover the area, cropping if necessary
          className={`transition-transform duration-300 group-hover:scale-105 ${imageClassName}`}
          quality={75} // Optimize image quality
        />
      ) : (
        // Render initials with dynamic background color if no src
        <span className={`font-medium text-white ${backgroundColor}`}>
          {initials}
        </span>
      )}
    </div>
  );
};

export default Avatar;
