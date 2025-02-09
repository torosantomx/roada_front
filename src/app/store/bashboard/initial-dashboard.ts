import { Metadata } from "@models/api/meta-data";
import { DashBoardState } from "./dash-bord-state";
import { environment } from "@environments/environment";
import { EmpresaDTO } from "@models/DTOs/empresaDTO";

export const metadataInitital: Metadata = {
    totalCount: 0,
    pageSize: 0,
    lastId: 0,
    totalPages: 0
}

export const initialSelectedTreyectoRuta = {
    clave: "",
    descripcion: "",
    id: 0,
    estatus: false
}

export const initialSelectedEmpresa: EmpresaDTO = {
    clave: "",
    descripcion: "",
    idValidador: undefined,
    idDvr: undefined,
    validador: "",
    dvr: "",
    id: 0,
    estatus: false
}


export const initialDashboardState: DashBoardState = {
    empresas: {
        data: [],
        metadata: metadataInitital
    },
    pageSizeEmpresas: environment.pagination.defaultPageSize,
    selectedEmpresa: initialSelectedEmpresa,
    equivalenciaEmpresaDvr: [],
    equivalenciaEmpresaValidador: [],
    trayectoRuta: {
        data: [],
        metadata: metadataInitital
    },
    selectedTrayectoRuta: initialSelectedTreyectoRuta
}