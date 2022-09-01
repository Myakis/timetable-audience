import React, { FC } from "react";
import cn from "classnames";

import "./style.scss";

interface IProps {
  title: string;
  className?: string;
  position?: "center";
  size?: "xl";
}

const EmptyBlock: FC<IProps> = ({ title, className, position, size }) => {
  return (
    <div>
      <div className="empty-box">
        <div
          className={cn(
            { "empty-xl": size === "xl", "empty-center": position === "center" },
            `empty ${className}`
          )}
        />
      </div>
      <div className="subtitle">{title}</div>
    </div>
  );
};

export default EmptyBlock;
