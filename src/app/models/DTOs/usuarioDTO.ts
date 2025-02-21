import { BaseDTO } from "./baseDTO"
import { UsuarioEmpresaDTO } from "./usuario-empresaDTO";

export interface UsuarioDTO extends BaseDTO {
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    nombreUsuario: string;
    empresas: Array<UsuarioEmpresaDTO>;
    clave: string
}