import { Injectable } from '@angular/core';
import { LoginUsuario } from '@models/custom-entities/login-usuario';

type SessionKey = 'token' | 'usuario'

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
    const agent = this.usuario;
    this.currentUserIsloggedIn = agent ? true : false;
  }
  private currentUserIsloggedIn: boolean = false;

  public login(agentInfo: LoginUsuario, tokenInfo: string) {
    const usuario: SessionKey = 'usuario';
    sessionStorage.setItem(usuario, JSON.stringify(agentInfo));
    const token: SessionKey = 'token'
    sessionStorage.setItem(token, JSON.stringify(tokenInfo));
    this.currentUserIsloggedIn = true;
  }

  public get usuario(): LoginUsuario | undefined {
    const usuario: SessionKey = 'usuario';
    const value = sessionStorage.getItem(usuario);
    if (value) {
      const agent: LoginUsuario = JSON.parse(value);
      return agent;
    }
    return undefined;
  }

  public logOut() {
    sessionStorage.clear();
    this.currentUserIsloggedIn = false;
  }

  public get tieneSesionIniciada(): boolean {
    return this.currentUserIsloggedIn;
  }

  public get token(): string {
    const token: SessionKey = 'token';
    const value = sessionStorage.getItem(token);
    return JSON.parse(value!);
  }
}
