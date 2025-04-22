import React from "react";

const Loading = ({ text = "Loading..." }) => {
  return text.split("").map((text, index) => {
    return (
      <span
        style={{ animationDelay: `${index + 1}9ms` }}
        key={index}
        className="inline-block tracking-wide animate-pulse">
        {text}
      </span>
    );
  });
};

export default Loading;
