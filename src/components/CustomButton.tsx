import React from "react";
import "./CustomButton.css";
import { IconType } from "react-icons";

interface CustomButtonProps {
  label: string;
  icon?: IconType;
  onClick?: any;
  type?: "primary" | "secondary";
}

const CustomButton = ({
  label,
  icon,
  onClick,
  type = "primary",
}: CustomButtonProps) => {
  return (
    <button onClick={onClick} className={"btn-" + type}>
      {icon && React.createElement(icon, { className: "icon" })}
      <div className="label">{label}</div>
    </button>
  );
};

export default CustomButton;
