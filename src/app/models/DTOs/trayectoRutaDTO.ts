import { BaseDTO } from "./baseDTO";

export interface TrayectoRutaDTO extends BaseDTO {
    clave: string;
    descripcion: string;
    asignado: boolean;
}