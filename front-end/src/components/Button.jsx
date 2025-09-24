import React from "react";

const Button = ({ children, variant = "solid", size = "md", className = "", onClick }) => {
  const base = "rounded-md font-medium transition-colors duration-200 focus:outline-none";

  const variants = {
    solid: "bg-primary text-white hover:bg-primary-dark",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "bg-transparent text-primary hover:text-primary-dark"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
    icon: "p-2"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
