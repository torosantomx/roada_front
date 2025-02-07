import { HttpClient } from '@angular/common/http';
import { inject} from '@angular/core';
import { environment } from '@environments/environment';

export abstract class BaseHttpService{
  constructor(controller: string) {
    this.apiUrl = `${environment.api}${controller}`;
  }
  protected http: HttpClient = inject(HttpClient);
  protected apiUrl: string;
}
