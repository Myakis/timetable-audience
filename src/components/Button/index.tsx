import React, { FC } from "react";
import "./style.scss";

interface IProps {
  children: any;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}
const Button: FC<IProps> = ({
  children,
  className='',
  onClick = () => null,
  type = "button",
  disabled = false,
}) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
