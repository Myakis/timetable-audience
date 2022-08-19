import React, { FC } from "react";

interface IProps {
  nameData: {
    title: string;
    count: string;
  };
}

const AudienceBox: FC<IProps> = ({ nameData }) => {
  return (
    <div className="audience-box">
      <div className="audience">
        <p className="audience__name">{nameData.title}</p>
        <span className="audience__count">{nameData.count}</span>
      </div>
    </div>
  );
};

export default AudienceBox;
