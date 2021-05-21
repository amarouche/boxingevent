import {User} from './user';

export class Club {
  id?: number;
  name?: string;
  email?: string;
  address?: string;
  zipCode?: string;
  users?: User[];
}
