import { EmpresaDTO } from "@models/DTOs/empresaDTO";

export type NewEmpresa = Pick<EmpresaDTO, 'clave' | 'descripcion' | 'idValidador' | 'idDvr'>;