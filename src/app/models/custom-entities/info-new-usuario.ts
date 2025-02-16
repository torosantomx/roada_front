import { NewUsuario } from "@models/types/new-usuario";

export interface InfoNewUsuario extends NewUsuario {
    clave: string;
    empresas: Array<number>
}