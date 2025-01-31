import { PagedResponse } from "@models/custom-entities/paged-response"
import { EmpresaDTO } from "@models/DTOs/empresaDTO";

export type DashBoardState = {
    empresas: PagedResponse<EmpresaDTO>;
    selectedEmpresa: EmpresaDTO;   
    pageSizeEmpresas: number;
}
