import { EmpresaDTO } from "@models/DTOs/empresaDTO";

export type NewEmpresa = Omit<EmpresaDTO, 'id' | 'estatus'>;