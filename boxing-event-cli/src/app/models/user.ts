import {Club} from './club';

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  token?: string;
  profilePicture?: string;
  type?: IUserType;
  detail?: IBoxerDetail;
  clubs?: Club[];
}

export interface IUserType {
  id: number;
  name: string;
}

export interface IBoxerDetail {
  weight?: number;
  height?: number;
}

export enum UserTypes {
  spectator = 1,
  boxer = 2
}
