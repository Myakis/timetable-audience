import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EmptyBlock from "../../components/EmptyBlock";

import SelectedEvents from "../../components/SelectedEvents";
import { IOptions, options } from "../../components/SelectedEvents/selectOptions";
import TableAudience from "../../components/TableAudience";
import { diffTime } from "../../helpers/diffTime";
import { parsingTableByAudience } from "../../helpers/helperTable";
import { TIME_INTERVAL, createdTableStructure } from "../../MOCK_API";
import { IEvent, TColumns } from "../../model/table";
import "./style.scss";

const Main = React.memo(() => {
  const [columns, setColumns] = useState(createdTableStructure);
  const [audienceIsEmpty, setAudienceIsEmpty] = useState(false);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [eventData, setEventData] = useState<{
    name: string;
    description: string;
    id?: string;
  } | null>(null);

  const [startTime, setStartTime] = useState<IOptions | null>(null);
  const [endTime, setEndTime] = useState<IOptions | null>(null);
  const [optionsStart, setOptionStart] = useState(options);
  const [optionsEnd, setOptionsEnd] = useState(options);

  const pickAudienceHandler = () => {
    if (!startTime || !endTime) return;
    setEventData(null);
    const time = [startTime.value, endTime.value];
    const lengthEvent = diffTime(time) * 2;
    const indexStart = diffTime([TIME_INTERVAL[0], time[0]]) * 2;
    const indexEnd = indexStart + lengthEvent;

    const isFreeAudience = Object.entries(columns)
      .filter(([_, { columnsTime }]) => {
        const prevEvent = columnsTime
          .filter((_, i) => indexStart >= i)
          .reverse()
          .find(({ event }) => event.time);
        const lengthPrevEvent = diffTime(prevEvent?.event.time) * 2;
        const isFree = columnsTime.filter(
          (_, i) => i >= indexStart - lengthPrevEvent && i <= indexEnd
        );
        const fullFree = isFree.every((item) => !item.event.time);

        if (fullFree) return true;
        return false;
      })
      .map((item) => item[0]);

    if (!isFreeAudience.length) {
      setAudienceIsEmpty(true);
      return;
    }
    setAudienceIsEmpty(false);

    setColumns((prev) => {
      prev[isFreeAudience[0]].columnsTime.splice(indexStart, 1, {
        columnId: uuidv4(),
        event: {
          id: uuidv4(),
          isBooking: false,
          description: "",
          name: "",
          time,
        },
      });
      return { ...prev };
    });
  };

  const changeOpenModal = () => {
    setOpen((prev) => !prev);
  };

  const findEventById = (id: string) => {
    const event = Object.values(columns).reduce((acc: any, { columnsTime }) => {
      const currentEvent = columnsTime.find(({ event }) => event.id === id);
      if (currentEvent) {
        acc = currentEvent.event;
      }
      return acc;
    }, null);
    return event;
  };

  const confirm = (id: string | undefined, name: string, description: string) => {
    const columnsUpdate = Object.values(columns).reduce(
      (acc: TColumns, { columnsTime, nameData }) => {
        const columnsTimeModify = columnsTime.map((item) => {
          if (item.event.id !== id) return item;
          return {
            ...item,
            event: { ...item.event, isBooking: true, name, description },
          };
        });

        acc[uuidv4()] = {
          nameData,
          columnsTime: columnsTimeModify,
        };
        return acc;
      },
      {}
    );

    return { ...columnsUpdate };
  };

  const confirmBookingHandler = (id: string) => {
    setEventData({ id, name: "", description: "" });
    changeOpenModal();
    setEvent(findEventById(id));
  };

  const deleteEventHandler = (id: string) => {
    const columnsUpdate = Object.values(columns).reduce(
      (acc: TColumns, { columnsTime, nameData }) => {
        const columnsTimeModify = columnsTime.map((item) => {
          if (item.event.id !== id) return item;
          return {
            ...item,
            event: { id: uuidv4(), isBooking: false },
          };
        });

        acc[uuidv4()] = {
          nameData,
          columnsTime: columnsTimeModify,
        };
        return acc;
      },
      {}
    );
    setColumns(columnsUpdate);
  };

  useEffect(() => {
    if (eventData?.name && eventData?.id) {
      setColumns(confirm(eventData.id, eventData.name, eventData.description));
    }
  }, [eventData]);

  useEffect(() => {
    const data = parsingTableByAudience(columns);
    localStorage.setItem("tableEvents", JSON.stringify(data));
  }, [columns]);

  useEffect(() => {
    if (startTime) {
      const index = optionsEnd.findIndex((item) => item.value === startTime.value);
      setOptionsEnd((prevOption) =>
        prevOption.map((item, i) => {
          if (i > index)
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
    if (!startTime && !endTime) {
      setAudienceIsEmpty(false);
    }
  }, [startTime, endTime]);

  return (
    <div>
      <h1 className="title">Список мероприятий</h1>
      <div className="selected-container">
        <h3 className="selected__title">
          Найти свободные аудитории
          {startTime?.value && endTime?.value && (
            <span>Длительность: {diffTime([startTime?.value, endTime?.value])}ч</span>
          )}
        </h3>

        <SelectedEvents
          pickAudienceHandler={pickAudienceHandler}
          setEndTime={setEndTime}
          setStartTime={setStartTime}
          option={{ start: optionsStart, end: optionsEnd }}
        />
      </div>
      {audienceIsEmpty && (
        <EmptyBlock
          title="Нет подходящих аудиторий, попробуйте изменить время"
          position="center"
          size="xl"
        />
      )}
      {!audienceIsEmpty && (
        <TableAudience
          event={event}
          columns={columns}
          setColumns={setColumns}
          changeOpenModal={changeOpenModal}
          isOpen={isOpen}
          confirmBookingHandler={confirmBookingHandler}
          deleteEventHandler={deleteEventHandler}
          setEventData={setEventData}
        />
      )}
    </div>
  );
});

export default Main;
