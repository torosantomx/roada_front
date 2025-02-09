import { EmpresaDTO } from "@models/DTOs/empresaDTO";

export interface LoginUsuario { 
    nombre: string;
    // apellidoPaterno: string;
    // apellidoMaterno?: string;
    isAdmin: boolean;
    empresas: Array<EmpresaDTO>
}