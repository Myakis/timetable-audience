import { IEvent, TColumns } from "./model/table";
import { v4 as uuidv4 } from "uuid";
import { diffTime } from "./helpers/diffTime";

export const tableHead = [
  { id: uuidv4(), type: "audience", title: "Аудитория" },
  { id: uuidv4(), type: "time", title: "8:00" },
  { id: uuidv4(), type: "time", title: "9:00" },
  { id: uuidv4(), type: "time", title: "10:00" },
  { id: uuidv4(), type: "time", title: "11:00" },
  { id: uuidv4(), type: "time", title: "12:00" },
  { id: uuidv4(), type: "time", title: "13:00" },
  { id: uuidv4(), type: "time", title: "14:00" },
  { id: uuidv4(), type: "time", title: "15:00" },
  { id: uuidv4(), type: "time", title: "16:00" },
  { id: uuidv4(), type: "time", title: "17:00" },
  { id: uuidv4(), type: "time", title: "18:00" },
];

const eventsData: IEvent[] = [
  {
    id: uuidv4(),
    type: "event",
    time: ["8:00", "9:30"],
    titleAudience: "Уорхол",
    name: "Уорхол",
    description: "Уорхол",
  },
  {
    id: uuidv4(),
    titleAudience: "Да винчи",
    type: "event",
    time: ["10:00", "12:00"],
    name: "IT news",
    description: "online конференция",
  },
  {
    id: uuidv4(),
    titleAudience: "Да винчи",
    type: "event",
    time: ["8:00", "10:00"],
    name: "IT news",
    description: "online конференция",
  },
];

export const columnsFromBackend: TColumns = {
  [uuidv4()]: {
    nameData: { id: uuidv4(), type: "audience", title: "Уорхол", count: "20 мест" },
    columnsTime: [
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
    ],
  },
  [uuidv4()]: {
    nameData: { id: uuidv4(), type: "audience", title: "Да винчи", count: "15 мест" },
    columnsTime: [
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
      { columnId: uuidv4(), event: { id: uuidv4() } },
    ],
  },
};

const findIndexTime = (interval: number, time?: string[]) => {
  if (!time) return 0;
  return interval - diffTime(time) * 2;
};

const transform = (columns: TColumns, events: IEvent[]): TColumns => {
  const intervalTimes = diffTime(["8:00", "18:00"]) * 2;
  const columnData = Object.entries(columns);
  const eventsNew = events.reduce((target: TColumns, event) => {
    const indexTime = findIndexTime(intervalTimes, [event.time![0], "18:00"]);

    columnData.forEach(([colKey, colVal]) => {
      if (colVal.nameData.title === event.titleAudience) {
        colVal.columnsTime.splice(indexTime, 1, {
          columnId: uuidv4(),
          event: event,
        });
        target[colKey] = {
          nameData: colVal.nameData,
          columnsTime: colVal.columnsTime,
        };
      } else {
        target[colKey] = {
          nameData: colVal.nameData,
          columnsTime: colVal.columnsTime,
        };
      }
    });

    return target;
  }, {});

  return eventsNew;
};
export const columnsFromBackend2 = transform(columnsFromBackend, eventsData);
