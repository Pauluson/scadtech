export interface IContact {
  _id?: string;
  name: string;
  image: string;
  numbers: string;
  addresses: string;
  faxes: string;
  emails: string;
}

export interface IAllContacts {
  count: number;
  data: IContact[];
}
