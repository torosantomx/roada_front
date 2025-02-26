import { PagedResponse } from "@models/api/paged-response";
import { CifrasControlDTO } from "@models/DTOs/cifras-control";
import { EmpresaDTO } from "@models/DTOs/empresaDTO";
import { EquivalenciaEmpresaDvrDTO } from "@models/DTOs/equivalencia-empresa-dvr";
import { EquivalenciaEmpresaValidadorDTO } from "@models/DTOs/equivalencia-empresa-validador";
import { EquivalenciaUnidadDvrDTO } from "@models/DTOs/equivalencia-unidad-dvr";
import { EquivalenciasUnidadValidadorDTO } from "@models/DTOs/equivalencias-unidad-validadorDTO";
import { ProcesosDTO } from "@models/DTOs/procesosDTO";
import { RutaEmpresaDTO } from "@models/DTOs/ruta-empresa";
import { TrayectoRutaDTO } from "@models/DTOs/trayectoRutaDTO";
import { TurnoDTO } from "@models/DTOs/turnoDTO";
import { UnidadAutoDTO } from "@models/DTOs/unidad-auto";
import { UsuarioDTO } from "@models/DTOs/usuarioDTO";

export type DashBoardState = {
    pagedEmpresas: PagedResponse<EmpresaDTO>;
    selectedEmpresa: EmpresaDTO;   
    empresas: Array<EmpresaDTO>,
    selectedTrayectoRuta: TrayectoRutaDTO,
    trayectoRuta: PagedResponse<TrayectoRutaDTO>,
    unassignedRutasByEmpresa: Array<TrayectoRutaDTO>,
    equivalenciaEmpresaDvr: Array<EquivalenciaEmpresaDvrDTO>,
    equivalenciaEmpresaValidador: Array<EquivalenciaEmpresaValidadorDTO>,
    equivalenciasUnidadValidador: Array<EquivalenciasUnidadValidadorDTO>,
    equivalenciasUnidaDVR: Array<EquivalenciaUnidadDvrDTO>,
    unidadesAutos: PagedResponse<UnidadAutoDTO>,
    unidadesMap: Map<string, number>,
    selectedAutoUnidad: UnidadAutoDTO,
    claves: Set<number>,
    clavesRutas: Set<string>,
    clavesRutasMap: Map<string, number>,
    economicos: Set<string>,
    rutasEmpresas: PagedResponse<RutaEmpresaDTO>,
    usuarios: PagedResponse<UsuarioDTO>,
    selectedUsuario: UsuarioDTO,
    todayPagedProcesos: PagedResponse<CifrasControlDTO>,
    procesos: Array<ProcesosDTO>,
    historyProcesos: PagedResponse<CifrasControlDTO>,
    pagedTurnos: PagedResponse<TurnoDTO>
}
