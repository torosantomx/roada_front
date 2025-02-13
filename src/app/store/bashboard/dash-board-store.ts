import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialDashboardState, initialSelectedEmpresa, initialSelectedTreyectoRuta, initialSelectedUnidadAuto } from "./initial-dashboard";
import { computed, inject } from "@angular/core";
import { EmpresaService } from "@services/empresa.service";
import { NewEmpresa } from "@models/types/new-empresa";
import { EmpresaDTO } from "@models/DTOs/empresaDTO";
import { EquivalenciaEmpresaDvrService } from "@services/equivalencia-empresa-dvr.service";
import { EquivalenciaEmpresaValidadorService } from "@services/equivalencia-empresa-validador.service";
import { TrayectoRutaService } from "@services/trayecto-ruta.service";
import { TrayectoRuta } from "@models/DTOs/trayectoRutaDTO";
import { NewTrayectoRuta } from "@models/types/new-trayecto-ruta";
import { EquivalenciasUnidadValidadorService } from "@services/equivalencias-unidad-validador.service";
import { EquivalenciaUnidadDvrService } from "@services/equivalencia-unidad-dvr.service";
import { UnidadAutoService } from "@services/unidad-auto.service";
import { NewUnidadAuto } from "@models/types/new-unidad-auto";
import { UnidadAutoDTO } from "@models/DTOs/unidad-auto";

export const DashBoardStore = signalStore(
    { providedIn: 'root' },
    withState(initialDashboardState),
    withMethods(
        (store,
            empresaService = inject(EmpresaService),
            equivalenciaEmpresaValidadorService = inject(EquivalenciaEmpresaValidadorService),
            equivalenciaEmpresaDvrService = inject(EquivalenciaEmpresaDvrService),
            trayectoRutaService = inject(TrayectoRutaService),
            equivalenciaUnidadDvrService = inject(EquivalenciaUnidadDvrService),
            unidadesAutosService = inject(UnidadAutoService),
            equivalenciasUnidadValidadorService = inject(EquivalenciasUnidadValidadorService),

        ) => ({
            //#region Empresas
            resetLasIdEmpresas(): void {
                patchState(store, (state) => ({
                    empresas: {
                        ...state.empresas,
                        metadata: {
                            ...state.empresas.metadata,
                            lastId: 0
                        }
                    }
                }));
            },
            setSelectedEmpresa(empresa: EmpresaDTO): void {
                patchState(store, { selectedEmpresa: empresa });
            },
            resetSelectedEmpresa(): void {
                patchState(store, { selectedEmpresa: initialSelectedEmpresa });
            },
            async loadEmpresas(search?: string, pageSize?: number, lastId?: number): Promise<void> {
                const id = lastId ?? store.empresas.metadata.lastId();
                const empresasData = await empresaService.getPagedWithSearch(id, pageSize, search);
                patchState(store, { empresas: empresasData })
            },
            async saveEmpresa(newEmpresa: NewEmpresa): Promise<void> {
                await empresaService.post(newEmpresa);
            },
            async updateEmpresa(empresa: EmpresaDTO): Promise<void> {
                const updatedEmpresa = await empresaService.put(empresa);
                const validador = store.equivalenciaEmpresaValidador().find(e => e.id == updatedEmpresa.idValidador)!.linea;
                const dvr = store.equivalenciaEmpresaDvr().find(e => e.id == updatedEmpresa.idDvr)!.parentFleet;
                updatedEmpresa.validador = validador;
                updatedEmpresa.dvr = dvr;
                patchState(store, (state) => ({
                    empresas: {
                        ...state.empresas,
                        data: state.empresas.data.map((emp) => emp.id === updatedEmpresa.id ? updatedEmpresa : emp)
                    }
                }));
            },
            async deleteEmpresa(id: number): Promise<void> {
                await empresaService.delete(id);
                const empresasData = await empresaService.getPaged(0, store.empresas.metadata.pageSize());
                patchState(store, { empresas: empresasData });
            },
            //#endregion

            //#region  EquivalenciaEmpresaDvrService
            async loadVDRUnassigned(idDvr?: number): Promise<void> {
                const equivalenciaEmpresaDvr = await equivalenciaEmpresaDvrService.GetUnassigned(idDvr);
                patchState(store, { equivalenciaEmpresaDvr })
            },
            //#endregion

            //#region EquivalenciaEmpresaValidadorService
            async loadValidacionesUnsassined(idValidador?: number): Promise<void> {
                const equivalenciaEmpresaValidador = await equivalenciaEmpresaValidadorService.GetUnassigned(idValidador);
                patchState(store, { equivalenciaEmpresaValidador })
            },
            //#endregion

            //#region TrayectoRuta
            async loadTrayectoRutas(search?: string, pageSize?: number, lastId?: number): Promise<void> {
                const id = lastId ?? store.trayectoRuta.metadata.lastId();
                const trayectoRuta = await trayectoRutaService.getPagedWithSearch(id, pageSize, search);
                patchState(store, { trayectoRuta })
            },
            async updateTrayectoRuta(trayectoRuta: TrayectoRuta): Promise<void> {
                const updatedTrayectoRuta = await trayectoRutaService.put(trayectoRuta);
                patchState(store, (state) => ({
                    trayectoRuta: {
                        ...state.trayectoRuta,
                        data: state.trayectoRuta.data.map((emp) => emp.id === updatedTrayectoRuta.id ? updatedTrayectoRuta : emp)
                    }
                }));
            },
            async saveTrayectoRuta(newEmpresa: NewTrayectoRuta): Promise<void> {
                await trayectoRutaService.post(newEmpresa);
                patchState(store, (state) => ({
                    trayectoRuta: {
                        ...state.trayectoRuta,
                        metadata: {
                            ...state.trayectoRuta.metadata,
                            lastId: 0
                        }
                    }
                }));
            },
            async deleteTrayectoRuta(id: number): Promise<void> {
                await trayectoRutaService.delete(id);
                const trayectoRuta = await trayectoRutaService.getPaged(0, store.trayectoRuta.metadata.pageSize());
                patchState(store, { trayectoRuta });
            },
            resetLasIdTrayectoRuta(): void {
                patchState(store, (state) => ({
                    trayectoRuta: {
                        ...state.trayectoRuta,
                        metadata: {
                            ...state.trayectoRuta.metadata,
                            lastId: 0
                        }
                    }
                }));
            },
            resetSelectedTrayectoRuta(): void {
                patchState(store, { selectedTrayectoRuta: initialSelectedTreyectoRuta });
            },
            setSelectedTracyectoRuta(selectedTrayectoRuta: TrayectoRuta): void {
                patchState(store, { selectedTrayectoRuta });
            },
            //#endregion

            //#region EquivalenciasUnidadValidadorService
            async getEquivalenciasUnidadValidadorUnassigned(idUnidad?: number): Promise<void> {
                const equivalenciasUnidadValidador = await equivalenciasUnidadValidadorService.GetUnassigned(idUnidad);
                patchState(store, { equivalenciasUnidadValidador });
            },
            //#endregion 

            //#region equivalenciaUnidadDvrService
            async getEquivalenciaUnidadDvrUnassigned(idUnidad?: number): Promise<void> {
                const equivalenciasUnidaDVR = await equivalenciaUnidadDvrService.GetUnassigned(idUnidad);
                patchState(store, { equivalenciasUnidaDVR });
            },
            //#endregion

            //#region unidadesAutosService
            async addUnidadAuto(newUnidadAuto: NewUnidadAuto): Promise<void> {
                await unidadesAutosService.post(newUnidadAuto);
            },
            async addRangeUnidadAuto(unidades: Array<NewUnidadAuto>): Promise<void> {
                await unidadesAutosService.addRange(unidades);
            },
            async loadUnidadesAutosPagedByEmpresa(search?: string, pageSize?: number, lastId?: number) {
                const id = lastId ?? store.unidadesAutos.metadata.lastId();
                const unidadesAutos = await unidadesAutosService.getPagedWithSearchAndEmpresa(id, pageSize, search);
                patchState(store, { unidadesAutos });
            },
            resetLasIdUnidadesAutos(): void {
                patchState(store, (state) => ({
                    unidadesAutos: {
                        ...state.unidadesAutos,
                        metadata: {
                            ...state.unidadesAutos.metadata,
                            lastId: 0
                        }
                    }
                }));
            },
            async deleteUnidadAuto(id: number): Promise<void> {
                await unidadesAutosService.delete(id);
                const unidadesAutos = await unidadesAutosService.getPagedWithSearchAndEmpresa(0, store.unidadesAutos.metadata.pageSize());
                patchState(store, { unidadesAutos });
            },
            resetSelectedUnidadAuto(): void {
                patchState(store, { selectedAutoUnidad: initialSelectedUnidadAuto });
            },
            setSelectedUnidadAuto(selectedAutoUnidad: UnidadAutoDTO): void {
                patchState(store, { selectedAutoUnidad });
            },
            async updateUnidadAuto(unidadRuta: UnidadAutoDTO): Promise<void> {
                const updatedUnidadRuta = await unidadesAutosService.put(unidadRuta);

                const dvr = store.equivalenciasUnidaDVR().find(e => e.id == updatedUnidadRuta.idEquivalenciaUnidadDrv)!.dvr;
                const validador = store.equivalenciasUnidadValidador().find(e => e.id == updatedUnidadRuta.idEquivalenciaUnidadValidador)!.validador;

                updatedUnidadRuta.equivalenciaUnidadDvr = dvr;
                updatedUnidadRuta.equivalenciaUnidadValidador = validador;
                patchState(store, (state) => ({
                    unidadesAutos: {
                        ...state.unidadesAutos,
                        data: state.unidadesAutos.data.map((uni) => uni.id === updatedUnidadRuta.id ? updatedUnidadRuta : uni)
                    }
                }));
            },
            async getClaves(): Promise<void> {
                const clavesFromdb = await unidadesAutosService.getClaves();
                const claves = new Set([...clavesFromdb]);
                patchState(store, { claves })
            },
            async getEconomicosByEmpresa(): Promise<void> {
                const economicosFromfb = await unidadesAutosService.getEconomicosByEmpresa();
                const economicos = new Set([...economicosFromfb]);
                patchState(store, { economicos })
            },

            //#endregion
        })),
    withComputed((store) => ({
        isSelectedEmpresa: computed(() => store.selectedEmpresa.id() > 0),
        isSelectedTrayectoRuta: computed(() => store.selectedTrayectoRuta.id() > 0),
        isSelectedAutoUnidad: computed(() => store.selectedAutoUnidad.id() > 0)
    }))
);