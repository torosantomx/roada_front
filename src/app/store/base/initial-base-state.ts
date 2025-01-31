import { BaseState } from "./base-state";

export const initialBaseState: BaseState = {
    isOpen: false,
    usuario: {
        nombre: "",
        apellidoPaterno: ""
    },
    token: "",
    loginError: false
}