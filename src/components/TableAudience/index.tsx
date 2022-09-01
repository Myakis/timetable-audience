import React, { FC, useState } from "react";
import { DragDropContext, DragUpdate, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";

import { diffTime } from "../../helpers/diffTime";
import { tableHead } from "../../MOCK_API";
import { IEvent, TColumns } from "../../model/table";
import AudienceBox from "./components/AudienceBox";
import "./style.scss";
import ModalEventEditor from "../../containers/Main/components/ModalEventEditor";
import { getTimeByIndex } from "../../helpers/helperTable";
import TableCell from "./components/TableCell";

interface IProps {
  columns: TColumns;
  setColumns: (columns: TColumns) => void;
  changeOpenModal: () => void;
  isOpen: boolean;
  confirmBookingHandler: (id: string) => void;
  deleteEventHandler: (id: string) => void;
  event: IEvent | null;
  setEventData: (data: { name: string; description: string }) => void;
}

const TableAudience: FC<IProps> = ({
  columns,
  setColumns,
  changeOpenModal,
  isOpen,
  confirmBookingHandler,
  deleteEventHandler,
  event,
  setEventData,
}) => {
  const [boxDisabled, setBoxDisabled] = useState<any[]>([]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const columnsNew = JSON.parse(JSON.stringify(columns));
    const [columnStartIndex] = source.droppableId.split("");
    const [columnEndIndex] = destination.droppableId.split("");
    const [columnStartId] = Object.keys(columnsNew).filter((item, i) => i === +columnStartIndex);
    const [columnEndId] = Object.keys(columnsNew).filter((item, i) => i === +columnEndIndex);

    const [currentEvent] = columnsNew[columnStartId].columnsTime.splice(source.index, 1, {
      columnId: uuidv4(),
      event: { id: uuidv4() },
    });

    const lengthEvent = diffTime(currentEvent.event.time) * 2;
    const time = getTimeByIndex(destination.index, lengthEvent);

    columnsNew[columnEndId].columnsTime.splice(destination.index, 1, {
      ...currentEvent,
      event: { ...currentEvent.event, time },
    });
    setColumns(columnsNew);
  };

  const onDragStartHandler = (result: DragUpdate) => {
    const { destination, source } = result;
    if (!destination) return null;

    const currentColumnEvent = Object.entries(columns).reduce(
      (acc: any, [_, { columnsTime }], i) => {
        const isFind = columnsTime.find((item) => i + item.columnId === source.droppableId);
        if (isFind) {
          acc = isFind;
        }

        return acc;
      },
      null
    );

    const indexTime = diffTime(currentColumnEvent?.event.time) * 2;

    const endColumnsDisabled = Object.entries(columns).reduce(
      (acc: any[], [_, { columnsTime }], i) => {
        // Конечные блоки
        const endDisabledColumns = columnsTime
          .filter((_, i) => i > columnsTime.length - indexTime)
          .map((cell) => cell.event);

        acc.push(...endDisabledColumns);
        return acc;
      },
      []
    );

    // Предотвращение заползания на другие мероприятия
    const allEvents = Object.entries(columns).reduce((acc: any, [_, { columnsTime }]) => {
      if (!columnsTime.find((item) => item.event.time)) return acc;

      const isFind2: any[] = columnsTime.reduce((accum: any[], item, i) => {
        if (item === currentColumnEvent) return accum;
        if (item.event.time) {
          const lengthEvent = diffTime(item.event.time) * 2;
          const disabledCell = columnsTime
            .filter((_, index) => index > i - indexTime && index < i + lengthEvent)
            .map((item) => item.event);

          accum.push(...disabledCell);
        }

        return accum;
      }, []);

      acc.push(...isFind2);

      return acc;
    }, []);

    if (allEvents) {
      setBoxDisabled([...allEvents, ...endColumnsDisabled]);
    }
  };

  return (
    <div className="App">
      <div className="table">
        <div className="d-flex table-head">
          {tableHead.map((time) => (
            <div key={time.id} className="d-block table-head__cell">
              {time.title}
            </div>
          ))}
        </div>
        <div style={{ justifyContent: "center", height: "100%", gap: "2rem" }}>
          <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragStartHandler}>
            {Object.entries(columns).map(([columnId, { nameData, columnsTime }], i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  <AudienceBox nameData={nameData} />
                  <div className={"cell-row"}>
                    {columnsTime.map((cell, index) => {
                      const { isBooking } = cell.event;
                      const isDisabled = boxDisabled.includes(cell.event);
                      const isDropDisabled = isBooking;

                      return (
                        <div
                          key={cell.columnId}
                          className={cn({
                            "cell-box-error": isDisabled,
                          })}
                        >
                          <Droppable
                            droppableId={i + cell.columnId}
                            key={cell.columnId}
                            direction="horizontal"
                            isDropDisabled={isDropDisabled || isDisabled}
                            ignoreContainerClipping
                          >
                            {(provided, snapshot) => {
                              return (
                                <>
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={cn(
                                      {
                                        // "cell-box-drag": snapshot.isDraggingOver,
                                      },
                                      "cell-box"
                                    )}
                                  >
                                    <TableCell
                                      confirmBookingHandler={confirmBookingHandler}
                                      deleteEventHandler={deleteEventHandler}
                                      event={cell.event}
                                      index={index}
                                      isDropDisabled={isDropDisabled || !cell.event.time}
                                    />
                                  </div>
                                </>
                              );
                            }}
                          </Droppable>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
        {isOpen && (
          <ModalEventEditor
            closeModal={changeOpenModal}
            event={event}
            setEventData={setEventData}
          />
        )}
      </div>
    </div>
  );
};

export default TableAudience;
