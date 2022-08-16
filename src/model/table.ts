export interface IEvent {
  id: string;
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

export type TColumns = {
  [id: string]: {
    nameData: IAudience;
    columnsTime: { columnId: string; event: IEvent }[];
  };
};
