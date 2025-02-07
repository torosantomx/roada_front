import { BaseDTO } from "./baseDTO";

export interface EmpresaDTO extends BaseDTO {
    clave: string;
    descripcion: string;
    idValidador?: number;
    idDvr?: number;
    validador: string;
    dvr: string;
}