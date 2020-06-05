export interface IAbout {
  _id?: string;
  title: string;
  content: string;
}

export interface IValue {
  _id?: string;
  image: string;
  name: string;
  description: string;
}
export interface IHistoryEvent {
  _id?: string;
  year: string;
  caption: string;
  description: string;
}

export interface IAllHistoryEvents {
  count: number;
  data: IHistoryEvent[];
}
export interface IAllValues {
  count: number;
  data: IValue[];
}
