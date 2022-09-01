import { ApiEvents, IEvent, TColumns } from "./model/table";
import { v4 as uuidv4 } from "uuid";
import { diffTime } from "./helpers/diffTime";
import { findIndexByTime } from "./helpers/helperTable";

export const TIME_INTERVAL = ["8:00", "18:00"];
export const intervalTimes = diffTime(TIME_INTERVAL) * 2;
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
];

const API_DATA_EVENTS: ApiEvents[] = [
  {
    audience: {
      id: uuidv4(),
      title: "Уорхол",
      count: "20 мест",
    },
    events: [
      {
        id: uuidv4(),
        type: "event",
        time: ["8:00", "9:30"],
        name: "Уорхол",
        description: "Уорхол",
        isBooking: true,
      },
    ],
  },
  {
    audience: {
      id: uuidv4(),
      title: "Робототехника",
      count: "25 мест",
    },
    events: [],
  },
  {
    audience: {
      id: uuidv4(),
      title: "Да винчи",
      count: "15 мест",
    },
    events: [
      {
        id: uuidv4(),
        time: ["10:00", "11:30"],
        name: "IT news",
        description: "online конференция",
        isBooking: false,
      },
      {
        id: uuidv4(),
        time: ["13:00", "16:00"],
        name: "IT news MOCK",
        description: "online конференция",
        isBooking: true,
      },
    ],
  },
];

const eventsData: ApiEvents[] =
  JSON.parse(localStorage.getItem("tableEvents") || "null") || API_DATA_EVENTS;

export const createdTableStructure: TColumns = eventsData.reduce(
  (acc: any, { audience, events }) => {
    const columnsTime = new Array(intervalTimes)
      .fill("mock")
      .map(() => ({ columnId: uuidv4(), event: { id: uuidv4() } }));

    events.forEach((event) => {
      const indexTime = findIndexByTime(intervalTimes, [event.time![0], TIME_INTERVAL[1]]);
      const eventData = { columnId: uuidv4(), event };
      columnsTime.splice(indexTime, 1, eventData);
    });

    acc[uuidv4()] = {
      nameData: audience,
      columnsTime,
    };

    return acc;
  },
  {}
);

// ТАК ВЫГЛЯДИТ ТАБЛИЦА
// export const columnsFromBackend: TColumns = {
//   [uuidv4()]: {
//     nameData: { id: uuidv4(), type: "audience", title: "Уорхол", count: "20 мест" },
//     columnsTime: [
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//     ],
//   },
//   [uuidv4()]: {
//     nameData: { id: uuidv4(), type: "audience", title: "Да винчи", count: "15 мест" },
//     columnsTime: [
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       {
//         columnId: uuidv4(),
//         event: {
//           id: uuidv4(),
//           titleAudience: "Да винчи",
//           type: "event",
//           time: ["10:00", "12:00"],
//           name: "IT news",
//           description: "online конференция",
//         },
//       },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//       { columnId: uuidv4(), event: { id: uuidv4() } },
//     ],
//   },
// };
