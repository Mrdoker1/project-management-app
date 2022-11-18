import { IAuthInfo } from './IAuthInfo';

export interface IUser extends IAuthInfo {
  _id: string;
  name: string;
}
