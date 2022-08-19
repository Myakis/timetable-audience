import React, { useEffect, useState } from "react";

import SelectedEvents from "../../components/SelectedEvents";
import { IOptions, options } from "../../components/SelectedEvents/selectOptions";
import TableAudience from "../../components/TableAudience";
import "./style.scss";

const Main = React.memo(() => {
  const [startTime, setStartTime] = useState<IOptions | null>(null);
  const [endTime, setEndTime] = useState<IOptions | null>(null);
  const [optionsStart, setOptionStart] = useState(options);
  const [optionsEnd, setOptionsEnd] = useState(options);

  useEffect(() => {
    if (startTime) {
      const index = optionsEnd.findIndex((item) => item.value === startTime.value);
      setOptionsEnd((prevOption) =>
        prevOption.map((item, i) => {
          if (i >= index)
            return {
              ...item,
              isDisabled: false,
            };
          return {
            ...item,
            isDisabled: true,
          };
        })
      );
    }
    if (endTime) {
      const index = optionsStart.findIndex((item) => item.value === endTime.value);
      setOptionStart((prevOption) =>
        optionsStart.map((item, i) => {
          if (i < index)
            return {
              ...item,
              isDisabled: false,
            };
          return {
            ...item,
            isDisabled: true,
          };
        })
      );
    }
  }, [startTime, endTime]);

  return (
    <div>
      <h1 className="title">Спискок мероприятий</h1>
      <div className="selected-container">
        <h3>Найти свободные аудитории</h3>
        <SelectedEvents
          setEndTime={setEndTime}
          setStartTime={setStartTime}
          option={{ start: optionsStart, end: optionsEnd }}
        />
      </div>
      <TableAudience />
    </div>
  );
});

export default Main;
