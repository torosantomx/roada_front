import { PagedResponse } from "@models/api/paged-response";
import { EmpresaDTO } from "@models/DTOs/empresaDTO";
import { EquivalenciaEmpresaDvrDTO } from "@models/DTOs/equivalencia-empresa-dvr";
import { EquivalenciaEmpresaValidadorDTO } from "@models/DTOs/equivalencia-empresa-validador";

export type DashBoardState = {
    empresas: PagedResponse<EmpresaDTO>;
    selectedEmpresa: EmpresaDTO;   
    pageSizeEmpresas: number;
    equivalenciaEmpresaDvr: Array<EquivalenciaEmpresaDvrDTO>,
    equivalenciaEmpresaValidador: Array<EquivalenciaEmpresaValidadorDTO>
}
