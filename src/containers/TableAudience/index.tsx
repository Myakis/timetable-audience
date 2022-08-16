import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import EventCard from "../../components/Event";
import { columnsFromBackend, tableHead } from "../../MOCK_API";
import "./style.scss";

const TableAudience = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

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
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([columnId, columnData], i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  <div className="audience-box">
                    <div className="audience">
                      <p className="audience__name">{columnData.nameData.title}</p>
                      <span className="audience__count">{columnData.nameData.count}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex" }} className={"cell-row"}>
                    {columnData.columnsTime.map((cell, index) => {
                      const isDropDisabled = cell.event.name === "Уорхол";
                      return (
                        <div key={cell.columnId}>
                          <Droppable
                            droppableId={i + cell.columnId}
                            key={cell.columnId}
                            direction="horizontal"
                            isDropDisabled={isDropDisabled}
                            ignoreContainerClipping
                          >
                            {(provided, snapshot) => {
                              return (
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
