import Select from "react-select";
import React, { FC } from "react";

import Button from "../Button";
import { colorStyles, IOptions } from "./selectOptions";
import "./style.scss";

interface IProps {
  setStartTime: (value: any) => void;
  setEndTime: (value: any) => void;
  pickAudienceHandler: () => void;
  option: {
    start: IOptions[];
    end: IOptions[];
  };
}

const SelectedEvents: FC<IProps> = ({ setEndTime, setStartTime, option, pickAudienceHandler }) => {
  return (
    <div className="selected-box">
      <Select
        styles={colorStyles}
        isClearable={true}
        className="select"
        onChange={setStartTime}
        options={option.start}
        placeholder="Выберете начало мероприятия"
      />
      <Select
        styles={colorStyles}
        className="select"
        onChange={setEndTime}
        isClearable={true}
        options={option.end}
        placeholder="Выберете окончание мероприятия"
      />
      <Button className="flex-left btn-light-blue" onClick={pickAudienceHandler}>
        Подобрать аудитории
      </Button>
    </div>
  );
};

export default SelectedEvents;
