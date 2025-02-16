import { BaseDTO } from "./baseDTO"

export interface UsuarioDTO extends BaseDTO {
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    clave: string
}