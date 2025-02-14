import { Injectable } from '@angular/core';
import { LoginUsuario } from '@models/custom-entities/login-usuario';

type SessionKey = 'token' | 'empresa' | 'nombre'

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
    const agent = this.usuario;
    this.currentUserIsloggedIn = agent ? true : false;
    this.empresaSet = this.empresa ? true : false;
    this.hasAdminRool = agent ? agent.isAdmin : false;
  }
  private currentUserIsloggedIn: boolean = false;
  private empresaSet: boolean = false;
  private hasAdminRool: boolean = false;

  public login(agentInfo: LoginUsuario, tokenInfo: string) {
    const nombre: SessionKey = 'nombre';
    sessionStorage.setItem(nombre, `${agentInfo.nombre}`);
    const token: SessionKey = 'token'
    sessionStorage.setItem(token, JSON.stringify(tokenInfo));
    this.hasAdminRool = this.usuario ? this.usuario.isAdmin : false;
    this.currentUserIsloggedIn = true;
  }

  public setEmpresa(idEmpresa: number): void {
    const empresa: SessionKey = 'empresa';
    sessionStorage.setItem(empresa, JSON.stringify(idEmpresa));
    this.empresaSet = true;
  }

  public get nombre(): string {
    const nombre: SessionKey = 'nombre';
    return sessionStorage.getItem(nombre)!;
  }
  public get usuario(): LoginUsuario | undefined {
    const token = this.token;
    if (!token) return undefined;

    const decoded = this.decodeToken(token);
    if (!decoded) return undefined;

    return {
      nombre: this.nombre,
      isAdmin: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Admin',
      empresas: this.normalizeKeys(JSON.parse(decoded.empresas)) // Normalizar claves
    };
  }

  public get empresa(): number {
    const empresa: SessionKey = 'empresa';
    const value = sessionStorage.getItem(empresa)!;
    const idEmpresa: number = JSON.parse(value);
    return idEmpresa;

  }

  public logOut() {
    sessionStorage.clear();
    this.currentUserIsloggedIn = false;
  }

  public get isLoggedIn(): boolean {
    return this.currentUserIsloggedIn;
  }

  public get isEmpresaSelected(): boolean {
    return this.empresaSet;
  }

  public get isAdmin(): boolean {
    return this.hasAdminRool;
  }

  public get token(): string {
    const token: SessionKey = 'token';
    const value = sessionStorage.getItem(token);
    return JSON.parse(value!);
  }

  private decodeToken(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  }
  private normalizeKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.normalizeKeys(item));
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj).reduce((acc, key) => {
        const newKey = key.charAt(0).toLowerCase() + key.slice(1); // Convertir primera letra a minúscula
        acc[newKey] = this.normalizeKeys(obj[key]); // Llamada recursiva por si hay objetos anidados
        return acc;
      }, {} as any);
    }
    return obj;
  }
}
