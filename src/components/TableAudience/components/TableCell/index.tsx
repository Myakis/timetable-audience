import React, { FC } from "react";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import EventCard from "../Event";
import { IEvent } from "../../../../model/table";

interface IProps {
  event: IEvent;
  isDropDisabled: boolean;
  index: number;
  confirmBookingHandler: (id: string) => void;
  deleteEventHandler: (id: string) => void;
}

const TableCell: FC<IProps> = ({
  event,
  index,
  isDropDisabled,
  confirmBookingHandler,
  deleteEventHandler,
}) => {
  return (
    <Draggable draggableId={event.id} index={index} isDragDisabled={isDropDisabled}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              height: '100%',
              ...provided.draggableProps.style,
            }}
          >
            {event.time && (
              <EventCard
                confirmBookingHandler={confirmBookingHandler}
                deleteEventHandler={deleteEventHandler}
                event={event}
                isDragging={snapshot.isDragging}
                disabled={isDropDisabled}
              />
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export default TableCell;
