import { BaseState } from "./base-state";

export const initialBaseState: BaseState = {
    isOpen: false,
    usuario: {
        nombre: "",
        isAdmin: false,
        empresas: [],
    },
    token: "",
    isMobile: false,
    loginError: false
}