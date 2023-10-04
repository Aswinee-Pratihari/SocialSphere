import React from "react";

const Input = ({ type = "text", label, className, ...props }, ref) => {
  return <div>Input</div>;
};

export default React.forwardRef(Input);
