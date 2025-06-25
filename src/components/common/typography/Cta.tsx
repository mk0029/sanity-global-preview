/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, MouseEventHandler } from "react";

interface CtaProps {
  as?: "button" | "a";
  children: ReactNode;
  className?: string;
  variant?:
    | "base"
    | "secondary"
    | "outline"
    | "danger"
    | "link"
    | "simpleLink"
    | "small"
    | "disabled";
  onClick?: MouseEventHandler<HTMLElement>;
  [key: string]: any; // for ...rest props
}

const Cta: React.FC<CtaProps> = ({
  as = "button",
  children,
  className = "",
  variant = "base",
  onClick = () => {},
  ...rest
}) => {
  const allowedTags = ["button", "a"];
  const Tag = allowedTags.includes(as) ? as : "button";

  const variants = {
    // Customize button UI variants
    // Primary button: Main call to action
    base:
      "px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md " +
      "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 " +
      "transition duration-300 ease-in-out",
    // Secondary button: Less emphasis than primary
    secondary:
      "px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm " +
      "hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 " +
      "transition duration-300 ease-in-out",
    // Outline button: Border only, often for secondary actions
    outline:
      "px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg " +
      "hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 " +
      "transition duration-300 ease-in-out",
    // Danger button: For destructive actions
    danger:
      "px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md " +
      "hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 " +
      "transition duration-300 ease-in-out",
    // Link button: Behaves like a button but styled like a link
    link:
      "px-4 py-2 text-blue-600 font-semibold " +
      "hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75",
    // Simple link: Just text, with underline on hover
    simpleLink:
      "text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75",
    // Small button: Compact version
    small:
      "px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-md shadow-sm " +
      "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 " +
      "transition duration-300 ease-in-out",
    // Disabled button: Non-interactive, greyed-out appearance
    disabled:
      "px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg shadow-sm cursor-not-allowed",
  };

  return (
    <Tag
      onClick={onClick}
      className={`text-white rounded-xl inline-block ${
        variants[variant] || variants.base
      } ${className}`}
      {...rest}>
      {children}
    </Tag>
  );
};

export default Cta;
