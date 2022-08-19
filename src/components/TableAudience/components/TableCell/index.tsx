import React, { FC } from "react";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import EventCard from "../Event";
import { IEvent } from "../../../../model/table";

interface IProps {
  provided: DroppableProvided;
  event: IEvent;
  isDropDisabled: boolean;
  index: number;
}

const TableCell: FC<IProps> = ({ provided, event, index, isDropDisabled }) => {
  return (
      <div {...provided.droppableProps} ref={provided.innerRef} className={"cell-box"}>
        <Draggable draggableId={event.id} index={index} isDragDisabled={isDropDisabled}>
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
                {event.name && (
                  <EventCard
                    event={event}
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
};

export default TableCell;
