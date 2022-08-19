import moment from "moment";

export const diffTime = (time: string[] | undefined) => {
  if (!time) return 0;
  const startEventTime = moment(time[0], "HH:mm");
  const endEventTime = moment(time[1], "HH:mm");
  return endEventTime.diff(startEventTime, "m") / 60;
};
