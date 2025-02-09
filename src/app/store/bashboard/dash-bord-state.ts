import { PagedResponse } from "@models/api/paged-response";
import { EmpresaDTO } from "@models/DTOs/empresaDTO";
import { EquivalenciaEmpresaDvrDTO } from "@models/DTOs/equivalencia-empresa-dvr";
import { EquivalenciaEmpresaValidadorDTO } from "@models/DTOs/equivalencia-empresa-validador";
import { TrayectoRuta } from "@models/DTOs/trayectoRutaDTO";

export type DashBoardState = {
    empresas: PagedResponse<EmpresaDTO>;
    trayectoRuta: PagedResponse<TrayectoRuta>,
    selectedEmpresa: EmpresaDTO;   
    selectedTrayectoRuta: TrayectoRuta;  
    pageSizeEmpresas: number;
    equivalenciaEmpresaDvr: Array<EquivalenciaEmpresaDvrDTO>,
    equivalenciaEmpresaValidador: Array<EquivalenciaEmpresaValidadorDTO>
}
