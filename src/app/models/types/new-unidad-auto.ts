import { UnidadAutoDTO } from "@models/DTOs/unidad-auto";

export type NewUnidadAuto = Pick<UnidadAutoDTO, 'idEmpresa' | 'clave' | 'economico' | 'idEquivalenciaUnidadDrv' | 'idEquivalenciaUnidadValidador'>