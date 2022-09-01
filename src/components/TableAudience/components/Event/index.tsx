import React, { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

import "./style.scss";
import { diffTime } from "../../../../helpers/diffTime";
import { IEvent } from "../../../../model/table";

interface IProps {
  event: IEvent;
  isDragging: boolean;
  disabled?: boolean;
  dragStyle?: DraggingStyle | NotDraggingStyle;
  confirmBookingHandler: (id: string) => void;
  deleteEventHandler: (id: string) => void;
}

const EventCard: FC<IProps> = ({
  event,
  isDragging,
  disabled,
  dragStyle,
  deleteEventHandler,
  confirmBookingHandler,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [widthEl, setWidthEl] = useState(87);

  useEffect(() => {
    if (!ref) return;
    const width = ref.current!.parentElement!.parentElement!.offsetWidth;
    setWidthEl(width);
  }, [ref]);

  // Разница в часах
  const hours = diffTime(event.time);
  return (
    <div
      ref={ref}
      style={{ ...dragStyle, width: `calc(${hours}*${widthEl}px * 2 - 3 * 2 * 2px` }}
      className={cn({ disabled: disabled, "event-move": isDragging }, "event")}
    >
      <p className="event__time">{event.time?.join(" - ")}</p>
      <p className="event__name">{event.name}</p>
      <p className="event__description">{event.description}</p>
      {!event.isBooking && (
        <button
          className="gobbler event__btn "
          onClick={confirmBookingHandler.bind(null, event.id)}
        />
      )}
      <button
          className="delete event__btn event__btn-delete "
          onClick={deleteEventHandler.bind(null, event.id)}
        />
      <div className="event__side">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default EventCard;
