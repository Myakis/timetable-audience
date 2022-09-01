export interface IEvent {
  id: string;
  isBooking: boolean;
  name?: string;
  description?: string;
  type?: string;
  time?: string[];
}
export interface IAudience {
  id: string;
  type?: string;
  count: string;
  title: string;
}

export type ApiEvents = {
  audience: IAudience;
  events: IEvent[];
};

export type TColumns = {
  [id: string]: {
    nameData: IAudience;
    columnsTime: { columnId: string; event: IEvent }[];
  };
};
