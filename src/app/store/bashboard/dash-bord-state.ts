import { PagedResponse } from "@models/api/paged-response";
import { EmpresaDTO } from "@models/DTOs/empresaDTO";
import { EquivalenciaEmpresaDvrDTO } from "@models/DTOs/equivalencia-empresa-dvr";
import { EquivalenciaEmpresaValidadorDTO } from "@models/DTOs/equivalencia-empresa-validador";
import { EquivalenciaUnidadDvrDTO } from "@models/DTOs/equivalencia-unidad-dvr";
import { EquivalenciasUnidadValidadorDTO } from "@models/DTOs/equivalencias-unidad-validadorDTO";
import { TrayectoRuta } from "@models/DTOs/trayectoRutaDTO";
import { UnidadAutoDTO } from "@models/DTOs/unidad-auto";

export type DashBoardState = {
    empresas: PagedResponse<EmpresaDTO>;
    trayectoRuta: PagedResponse<TrayectoRuta>,
    selectedEmpresa: EmpresaDTO;   
    selectedTrayectoRuta: TrayectoRuta;  
    equivalenciaEmpresaDvr: Array<EquivalenciaEmpresaDvrDTO>,
    equivalenciaEmpresaValidador: Array<EquivalenciaEmpresaValidadorDTO>,
    equivalenciasUnidadValidador: Array<EquivalenciasUnidadValidadorDTO>,
    equivalenciasUnidaDVR: Array<EquivalenciaUnidadDvrDTO>,
    unidadesAutos: PagedResponse<UnidadAutoDTO>,
    selectedAutoUnidad: UnidadAutoDTO,
    claves: Set<number>,
    economicos: Set<string>
}
