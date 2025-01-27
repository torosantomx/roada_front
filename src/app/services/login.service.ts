import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Credentials } from '@models/custom-entities/credentials';
import { LoginUsuarioInfo } from '@models/custom-entities/login-usuario-info';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() {
    this.apiUrl = `${environment.api}Login`;
  }

  private http: HttpClient = inject(HttpClient);
  private apiUrl: string;

  public login(credenciales: Credentials): Promise<LoginUsuarioInfo>{
    return lastValueFrom(this.http.post<LoginUsuarioInfo>(this.apiUrl, credenciales));
  }
}
