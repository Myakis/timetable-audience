import { ApiEvents, TColumns } from './../model/table';
import moment from "moment";
import { TIME_INTERVAL } from "../MOCK_API";
import { diffTime } from "./diffTime";

export const findIndexByTime = (interval: number, time?: string[]) => {
  if (!time) return 0;
  return interval - diffTime(time) * 2;
};

export const getTimeByIndex = (
  index: number,
  lengthEvent: number = 1,
  timeStart: string = TIME_INTERVAL[0]
) => {
  const startEventTime = moment(timeStart, "HH:mm").add(30 * index, "m");

  const timeStartEvent = startEventTime.format("HH:mm");
  const timeEndEvent = startEventTime.add(30 * lengthEvent, "m").format("HH:mm");
  return [timeStartEvent, timeEndEvent];
};

export const parsingTableByAudience = (tableData: TColumns) => {
  const data = Object.values(tableData).reduce((acc: ApiEvents[], { columnsTime, nameData }, i) => {
    const events = columnsTime.filter((item) => item.event.time).map(({ event }) => event);
    const audienceData: ApiEvents = {
      audience: nameData,
      events,
    };

    acc.push(audienceData);
    return acc;
  }, []);
  return data;
};
