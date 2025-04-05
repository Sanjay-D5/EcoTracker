import React from "react";

interface ButtonProps {
  children: React.ReactNode | string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 ${className ? className : "bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-gray-400 px-3 lg:px-4 lg:py-2 lg:rounded-lg cursor-pointer" }`}
    >
      {children}
    </button>
  );
};

export default Button;
