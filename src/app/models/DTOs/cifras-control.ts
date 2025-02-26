import { BaseDTO } from "./baseDTO";

export interface CifrasControlDTO extends BaseDTO {
    idProceso: number;
    fecha: string;
    estatusCarga: number;
    estatusProcesamiento: number;
    claveEmpresa: string;
    descripcionEmpresa: string;
    proceso: string;
}