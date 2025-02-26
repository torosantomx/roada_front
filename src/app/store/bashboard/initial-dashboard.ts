import { Metadata } from "@models/api/meta-data";
import { DashBoardState } from "./dash-bord-state";
import { EmpresaDTO } from "@models/DTOs/empresaDTO";
import { UnidadAutoDTO } from "@models/DTOs/unidad-auto";
import { TrayectoRutaDTO } from "@models/DTOs/trayectoRutaDTO";
import { UsuarioDTO } from "@models/DTOs/usuarioDTO";
import { initialBaseState } from "@store/base/initial-base-state";

const metadataInitital: Metadata = {
    totalCount: 0,
    pageSize: 10,
    lastId: 0,
    totalPages: 0
}

export const initialSelectedTreyectoRuta: TrayectoRutaDTO = {
    clave: "",
    descripcion: "",
    id: 0,
    asignado: false
}

export const initialSelectedEmpresa: EmpresaDTO = {
    clave: "",
    descripcion: "",
    idValidador: undefined,
    idDvr: undefined,
    validador: "",
    dvr: "",
    id: 0,
    // estatus: false
}

export const initialSelectedUnidadAuto: UnidadAutoDTO = {
    economico: "",
    idEmpresa: 0,
    id: 0,
    equivalenciaUnidadDvr: "",
    equivalenciaUnidadValidador: ""
}

export const initialSelectedUsuario: UsuarioDTO = {
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    id: 0,
    nombreUsuario: "",
    empresas: [],
    clave: ""
}

export const initialDashboardState: DashBoardState = {
    pagedEmpresas: {
        data: [],
        metadata: metadataInitital
    },
    selectedEmpresa: initialSelectedEmpresa,
    equivalenciaEmpresaDvr: [],
    equivalenciaEmpresaValidador: [],
    trayectoRuta: {
        data: [],
        metadata: metadataInitital
    },
    selectedTrayectoRuta: initialSelectedTreyectoRuta,
    equivalenciasUnidadValidador: [],
    equivalenciasUnidaDVR: [],
    selectedAutoUnidad: initialSelectedUnidadAuto,
    unidadesAutos: {
        data: [],
        metadata: metadataInitital
    },
    claves: new Set(),
    economicos: new Set(),
    rutasEmpresas: {
        data: [],
        metadata: metadataInitital
    },
    unassignedRutasByEmpresa: [],
    usuarios: {
        data: [],
        metadata: metadataInitital
    },
    selectedUsuario: initialSelectedUsuario,
    empresas: [],
    todayPagedProcesos: {
        data: [],
        metadata: metadataInitital
    },
    procesos: [],
    historyProcesos: {
        data: [],
        metadata: metadataInitital
    },
    clavesRutas: new Set(),
    clavesRutasMap: new Map(),
    unidadesMap: new Map(),
    pagedTurnos:  {
        data: [],
        metadata: metadataInitital
    }
}