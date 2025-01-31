import { BaseDTO } from "./baseDTO";

export interface EmpresaDTO extends BaseDTO {
    clave: string;
    nombreDes: string;
    linea: string;
    parentFleet: string;
}