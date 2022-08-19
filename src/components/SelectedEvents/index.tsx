import React, { FC } from "react";
import Select from "react-select";
import Button from "../Button";
import { colorStyles, IOptions } from "./selectOptions";
import "./style.scss";

interface IProps {
  setStartTime: (value: any) => void;
  setEndTime: (value: any) => void;
  option: {
    start: IOptions[];
    end: IOptions[];
  };
}

const SelectedEvents: FC<IProps> = ({ setEndTime, setStartTime, option }) => {
  return (
    <div className="selected-box">
      <Select
        styles={colorStyles}
        className="select"
        onChange={setStartTime}
        options={option.start}
        placeholder="Выберете начало мероприятия"
      />
      <Select
        styles={colorStyles}
        className="select"
        onChange={setEndTime}
        options={option.end}
        placeholder="Выберете окончание мероприятия"
      />
      <Button className="flex-left btn-gray">Получить аудитории</Button>
    </div>
  );
};

export default SelectedEvents;
