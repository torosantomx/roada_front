import { BaseDTO } from "./baseDTO";

export interface UnidadAutoDTO extends BaseDTO {
    clave?: number;
    economico: string;
    idEmpresa: number;
    idEquivalenciaUnidadDrv?: number;
    idEquivalenciaUnidadValidador?: number;
    equivalenciaUnidadDvr: string;
    equivalenciaUnidadValidador: string;
}