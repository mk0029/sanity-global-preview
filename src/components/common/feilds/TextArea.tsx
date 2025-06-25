"use client";
import React, {
  TextareaHTMLAttributes,
  useRef,
  useEffect,
  useState,
} from "react";

// Define textarea style variants
const textareaVariants = {
  // Default textarea style: Standard look and feel
  default:
    "block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "transition duration-200 ease-in-out resize-none", // resize-none prevents manual resizing

  // Outline textarea style: Border only
  outline:
    "block w-full px-4 py-2 text-gray-800 bg-transparent border-2 border-gray-300 rounded-md " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "transition duration-200 ease-in-out resize-none",

  // Filled textarea style: With a light background color
  filled:
    "block w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "transition duration-200 ease-in-out resize-none",

  // Error state styling (to be combined with other variants)
  error: "border-red-500 focus:ring-red-500", // Red border and ring for error
};

// Define label style variants (can reuse from Input if desired, or define specifically)
const labelVariants = {
  normal: "block text-sm font-medium text-gray-700 mb-1",
};

// Props for the TextArea component
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; // Optional label text
  error?: string; // Optional error message
  variant?: keyof typeof textareaVariants; // Type for textarea visual variants
  labelVariant?: keyof typeof labelVariants; // Type for label visual variants
  className?: string; // Additional classes for the textarea element
  containerClassName?: string; // Additional classes for the overall container
  autoResize?: boolean; // New prop: Enable/disable auto-resizing
  maxHeight?: string; // New prop: Max height before scrolling (e.g., '200px', '10rem')
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  variant = "default",
  labelVariant = "normal",
  className = "",
  containerClassName = "",
  autoResize = false, // Default to no auto-resize
  maxHeight, // Max height for auto-resize
  id,
  value, // Take value prop explicitly for auto-resize effect
  onChange, // Take onChange prop explicitly for auto-resize effect
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = useState(value || ""); // Manage internal state for auto-resize

  // Generate a unique ID if not provided, essential for label-textarea association
  const textareaId =
    id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

  // Effect for auto-resizing
  useEffect(() => {
    if (textareaRef.current && autoResize) {
      // Reset height to 'auto' to correctly calculate scrollHeight
      textareaRef.current.style.height = "auto";
      // Set height based on scrollHeight
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";

      // Apply max-height if provided
      if (maxHeight) {
        textareaRef.current.style.maxHeight = maxHeight;
        textareaRef.current.style.overflowY = "auto"; // Ensure scrollbar appears if max height is hit
      } else {
        textareaRef.current.style.overflowY = "hidden"; // Hide scrollbar if not limited by max height
      }
    }
  }, [currentValue, autoResize, maxHeight]); // Re-run when text changes, or autoResize/maxHeight props change

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value); // Update internal state
    if (onChange) {
      onChange(e); // Pass the event to the original onChange handler
    }
  };

  const hasError = !!error;

  // Combine base textarea variant classes with error classes if an error exists
  const textareaClasses = `${textareaVariants[variant]} ${hasError ? textareaVariants.error : ""} ${className}`;

  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label htmlFor={textareaId} className={labelVariants[labelVariant]}>
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        ref={textareaRef} // Attach ref to textarea
        className={textareaClasses}
        value={currentValue} // Use internal state
        onChange={handleTextareaChange} // Use internal change handler
        rows={autoResize ? 1 : rest.rows || 3} // Start with 1 row if auto-resizing, else default or given rows
        {...rest}
      />

      {hasError && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextArea;
