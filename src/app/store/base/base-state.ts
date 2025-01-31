import { LoginUsuario } from "@models/custom-entities/login-usuario";

export type BaseState = {
    isOpen: boolean;
    usuario: LoginUsuario;
    token: string;
    loginError: boolean
}
