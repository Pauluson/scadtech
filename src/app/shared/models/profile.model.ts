export interface IProfile {
  _id?: string;
  image: string;
  color: string;
}
export interface IInformation {
  _id?: string;
  email: string;
  phone: string;
  tagline: string;
}
export interface IPassword {
  new: string;
  old: string;
}
