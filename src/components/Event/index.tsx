import React, { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import moment from "moment";
import "./style.scss";

interface IProps {
  event: {
    time?: string[];
    name?: string;
    description?: string;
  };
  isDragging: boolean;
  disabled?: boolean;
  dragStyle?: DraggingStyle | NotDraggingStyle;
}

const EventCard: FC<IProps> = ({ event, isDragging, disabled, dragStyle }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [widthEl, setWidthEl] = useState(80);

  useEffect(() => {
    if (!ref) return;
    const width =
      ref.current!.parentElement!.offsetWidth + ref.current!.parentElement!.offsetLeft * 2;
    setWidthEl(width);
  }, [ref]);

  const startEventTime = moment(event.time![0], "HH:mm");
  const endEventTime = moment(event.time![1], "HH:mm");
  // Разница в часах
  const hours = endEventTime.diff(startEventTime, "m") / 60;

  return (
    <div
      ref={ref}
      style={{ ...dragStyle, width: `calc(${hours}*${widthEl}px * 2 - 5px` }}
      className={cn({ disabled: disabled, "event-move": isDragging }, "event")}
    >
      <p className="event__time">{event.time?.join("-")}</p>
      <p className="event__name">{event.name}</p>
      <p className="event__description">{event.description}</p>
      <div className="event__side">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default EventCard;
