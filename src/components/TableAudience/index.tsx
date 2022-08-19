import React, { useState } from "react";
import { DragDropContext, Draggable, DragStart, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import EventCard from "./components/Event";
import { diffTime } from "../../helpers/diffTime";
import { columnsFromBackend2 as columnsFromBackend, tableHead } from "../../MOCK_API";
import { IEvent } from "../../model/table";
import AudienceBox from "./components/AudienceBox";
import "./style.scss";

const TableAudience = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const cellDisabled = (columnsTime: { columnId: string; event: IEvent }[]) => {
    const event = columnsTime
      .map((item, index) => ({
        startIndex: index,
        event: item.event,
        endIndex: index + diffTime(item.event.time) * 2,
      }))
      .filter(({ event }) => event.name);

    const disabled = columnsTime
      .filter((item, index) => {
        const diff = event.filter((events) => {
          if (events.startIndex <= index && index < events.endIndex) return true;
          return false;
        });

        if (diff.length !== 0) return true;
      })
      .map((item) => item.event);
    return disabled;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const columnsNew = { ...columns };
    const { source, destination } = result;
    const [columnStartIndex] = source.droppableId.split("");
    const [columnEndIndex] = destination.droppableId.split("");
    const [columnStartId] = Object.keys(columnsNew).filter((item, i) => i === +columnStartIndex);
    const [columnEndId] = Object.keys(columnsNew).filter((item, i) => i === +columnEndIndex);

    const [currentEvent] = columnsNew[columnStartId].columnsTime.splice(source.index, 1, {
      columnId: uuidv4(),
      event: { id: uuidv4() },
    });

    columnsNew[columnEndId].columnsTime.splice(destination.index, 1, currentEvent);
    setColumns(columnsNew);
  };

  const onDragStartHandler = (result: DragStart) => {};

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
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStartHandler}>
            {Object.entries(columns).map(([columnId, { nameData, columnsTime }], i) => {
              const disabled = cellDisabled(columnsTime);
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
                      const { name } = cell.event;
                      const isDisabled = disabled.includes(cell.event);
                      const isDropDisabled = name === "Уорхол";

                      return (
                        <div key={cell.columnId}>
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
                                    className={"cell-box"}
                                  >
                                    <Draggable
                                      draggableId={cell.event.id}
                                      index={index}
                                      isDragDisabled={isDropDisabled}
                                    >
                                      {(provided, snapshot) => {
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              userSelect: "none",
                                              ...provided.draggableProps.style,
                                            }}
                                          >
                                            {cell.event.name && (
                                              <EventCard
                                                event={cell.event}
                                                isDragging={snapshot.isDragging}
                                                disabled={isDropDisabled}
                                              />
                                            )}
                                          </div>
                                        );
                                      }}
                                    </Draggable>
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
      </div>
    </div>
  );
};

export default TableAudience;

// Проверить есть ли на строке еще одно событие
// если его нет, то запрещать ставить на длину данного события от конца до конца
//
//
//
//
//
