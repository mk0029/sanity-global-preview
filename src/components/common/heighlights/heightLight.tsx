"use client";
import React, { HTMLAttributes } from "react";
// Define highlight style variants
const highlightVariants = {
  // For inline code snippets or technical terms
  code: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-1 rounded",
  // For positive affirmations or successful states
  success:
    "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 px-1 rounded",
  // For warnings or cautions
  warn: "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100 px-1 rounded",
  // For errors or critical information
  error:
    "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100 px-1 rounded",
  // For general informational notes
  info: "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100 px-1 rounded",
  // A primary brand color highlight
  primary:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100 px-1 rounded",
  // A secondary/neutral highlight
  secondary:
    "bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100 px-1 rounded",
};

// Props for the Highlight component
interface HighlightProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof highlightVariants; // Type of highlight (e.g., 'code', 'success')
  className?: string; // Additional custom Tailwind classes
}

const Highlight: React.FC<HighlightProps> = ({
  variant = "primary", // Default highlight variant
  className = "",
  children,
  ...rest
}) => {
  // Get the specific classes for the chosen variant, fallback to primary if not found
  const variantClasses =
    highlightVariants[variant] || highlightVariants.primary;

  return (
    <span
      className={`inline ${variantClasses} ${className}`} // `inline` ensures it respects parent's flow
      {...rest}>
      {children}
    </span>
  );
};

export default Highlight;
