import { BaseDTO } from "./baseDTO";

export interface TurnoDTO extends BaseDTO {
    idEmpresa: number;
    idUnidad: number;
    idRuta: number;
    fecha: string;
    clasificacionTurno: number;
    horaInicio: string;
    horaFin: string;
    credencial: string;
    unidad: string;
    ruta: string
}