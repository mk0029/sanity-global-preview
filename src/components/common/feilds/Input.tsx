"use client";
import React, { InputHTMLAttributes, useState } from "react";

// Define input style variants
const inputVariants = {
  // Default input style: Standard look and feel
  default:
    "block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "transition duration-200 ease-in-out",

  // Outline input style: Border only, useful for secondary forms
  outline:
    "block w-full px-4 py-2 text-gray-800 bg-transparent border-2 border-gray-300 rounded-md " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "transition duration-200 ease-in-out",

  // Filled input style: With a light background color
  filled:
    "block w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "transition duration-200 ease-in-out",

  // Error state styling (to be combined with other variants)
  error: "border-red-500 focus:ring-red-500", // Red border and ring for error
};

// Define label style variants
const labelVariants = {
  // Normal label: Standard block label above the input
  normal: "block text-sm font-medium text-gray-700 mb-1",

  // Google Forms-style floating label: Label inside input, moves up on focus/fill
  google:
    "absolute left-4 transition-all duration-200 ease-in-out pointer-events-none " +
    "text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 " +
    "peer-focus:top-3 peer-focus:text-xs peer-focus:-translate-y-0 " +
    "peer-valid:top-3 peer-valid:text-xs peer-valid:-translate-y-0", // peer-valid for pre-filled inputs
};

// Props for the Input component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label text
  error?: string; // Optional error message
  variant?: keyof typeof inputVariants; // Type for input visual variants
  labelVariant?: keyof typeof labelVariants; // Type for label visual variants
  className?: string; // Additional classes for the input element
  containerClassName?: string; // Additional classes for the overall container
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = "default", // Default input style
  labelVariant = "normal", // Default label style
  className = "",
  containerClassName = "",
  id, // Destructure id to ensure it's passed to input
  ...rest // Rest of HTML input attributes like type, name, value, onChange etc.
}) => {
  // Generate a unique ID if not provided, essential for label-input association
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  // Determine if the input has a value (for Google Forms-style label)
  const [hasValue, setHasValue] = useState(
    Boolean(rest.value || rest.defaultValue)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(Boolean(e.target.value));
    if (rest.onChange) {
      rest.onChange(e); // Pass the event to the original onChange handler
    }
  };

  const isGoogleLabel = labelVariant === "google";
  const hasError = !!error;

  // Combine base input variant classes with error classes if an error exists
  const inputClasses = `${inputVariants[variant]} ${hasError ? inputVariants.error : ""} ${className}`;

  return (
    <div
      className={`relative ${isGoogleLabel ? "pt-6" : ""} ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`${labelVariants[labelVariant]} ${isGoogleLabel && (hasValue || hasError) ? "peer-valid" : ""}`}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`${inputClasses} ${isGoogleLabel ? "peer" : ""} ${hasValue ? "valid" : ""}`} // Add 'peer' for Google style, 'valid' to trigger label move
        {...rest}
        onChange={handleInputChange}
        // If Google style label, make sure placeholder is present to trigger peer-placeholder-shown
        placeholder={
          isGoogleLabel && !rest.placeholder ? " " : rest.placeholder
        }
      />

      {hasError && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
