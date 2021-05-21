import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  protected BASE_URL = 'http://localhost:8082/api';
}
