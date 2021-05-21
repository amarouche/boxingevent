import {User} from './user';

export class Article {
  id?: number;
  title?: string;
  content?: string;
  summary?: string;
  image?: string;
  author?: User;
}
