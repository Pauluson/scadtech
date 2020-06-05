export interface IFeedback {
  _id?: string;
  created?: string;
  surname: string;
  name: string;
  middleName: string;
  phone: string;
  email: string;
  text: string;
  unread: boolean;
}

export interface IAllFeedbacks {
  count: number;
  data: IFeedback[];
}
