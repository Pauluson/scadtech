export interface IPartners {
  _id?: string;
  name: string;
  image: string;
  description: string;
  file: string;
  originalName: string;
}
export interface IAllPartners {
  count: number;
  data: IPartners[];
}
