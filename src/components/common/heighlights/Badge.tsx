"use client";
import React, { HTMLAttributes } from "react";
// Define base badge styling (padding, font size, border-radius) based on size
const baseSizeClasses = {
  small: "px-2 py-0.5 text-xs rounded-md",
  medium: "px-2.5 py-0.5 text-sm rounded-md",
  large: "px-3 py-1 text-base rounded-lg",
};

// Define badge color/type variants for solid, outline, and soft styles
const badgeTypeVariants = {
  // Primary (e.g., Blue)
  primary: {
    solid: "bg-blue-600 text-white",
    outline: "border border-blue-500 text-blue-700",
    soft: "bg-blue-100 text-blue-700",
  },
  // Secondary (e.g., Gray)
  secondary: {
    solid: "bg-gray-600 text-white",
    outline: "border border-gray-500 text-gray-700",
    soft: "bg-gray-100 text-gray-700",
  },
  // Success (e.g., Green)
  success: {
    solid: "bg-green-600 text-white",
    outline: "border border-green-500 text-green-700",
    soft: "bg-green-100 text-green-700",
  },
  // Warning (e.g., Yellow/Orange)
  warning: {
    solid: "bg-yellow-500 text-white", // Darker text for better contrast on yellow
    outline: "border border-yellow-500 text-yellow-700",
    soft: "bg-yellow-100 text-yellow-700",
  },
  // Danger (e.g., Red)
  danger: {
    solid: "bg-red-600 text-white",
    outline: "border border-red-500 text-red-700",
    soft: "bg-red-100 text-red-700",
  },
  // Info (e.g., Cyan/Teal)
  info: {
    solid: "bg-cyan-600 text-white",
    outline: "border border-cyan-500 text-cyan-700",
    soft: "bg-cyan-100 text-cyan-700",
  },
};

// Define props for the Badge component
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  type?: keyof typeof badgeTypeVariants; // Color/intent type (e.g., 'primary', 'success')
  size?: keyof typeof baseSizeClasses; // Size (e.g., 'small', 'medium', 'large')
  variant?: "solid" | "outline" | "soft"; // Visual style (e.g., 'solid', 'outline', 'soft')
  className?: string; // Additional custom Tailwind classes
}

const Badge: React.FC<BadgeProps> = ({
  type = "primary", // Default type
  size = "medium", // Default size
  variant = "solid", // Default visual variant
  className = "",
  children,
  ...rest
}) => {
  // Get size-specific classes
  const sizeClasses = baseSizeClasses[size] || baseSizeClasses.medium;

  // Get type and variant-specific classes
  const typeVariantClasses =
    badgeTypeVariants[type]?.[variant] || badgeTypeVariants.primary.solid; // Fallback to primary solid

  return (
    <span
      className={`inline-flex items-center font-medium ${sizeClasses} ${typeVariantClasses} ${className}`}
      {...rest}>
      {children}
    </span>
  );
};

export default Badge;
