import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialDashboardState, initialSelectedEmpresa, initialSelectedTreyectoRuta } from "./initial-dashboard";
import { computed, inject } from "@angular/core";
import { EmpresaService } from "@services/empresa.service";
import { NewEmpresa } from "@models/types/new-empresa";
import { EmpresaDTO } from "@models/DTOs/empresaDTO";
import { EquivalenciaEmpresaDvrService } from "@services/equivalencia-empresa-dvr.service";
import { EquivalenciaEmpresaValidadorService } from "@services/equivalencia-empresa-validador.service";
import { TrayectoRutaService } from "@services/trayecto-ruta.service";
import { TrayectoRuta } from "@models/DTOs/trayectoRutaDTO";
import { NewTrayectoRuta } from "@models/types/new-trayecto-ruta";

export const DashBoardStore = signalStore(
    { providedIn: 'root' },
    withState(initialDashboardState),
    withMethods(
        (store,
            empresaService = inject(EmpresaService),
            equivalenciaEmpresaValidadorService = inject(EquivalenciaEmpresaValidadorService),
            equivalenciaEmpresaDvrService = inject(EquivalenciaEmpresaDvrService),
            trayectoRutaService = inject(TrayectoRutaService)
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
            async loadVDRUnassigned(idEmpresa?: number): Promise<void> {
                const equivalenciaEmpresaDvr = await equivalenciaEmpresaDvrService.GetUnassigned(idEmpresa);
                patchState(store, { equivalenciaEmpresaDvr })
            },
            //#endregion

            //#region EquivalenciaEmpresaValidadorService
            async loadValidacionesUnsassined(idEmpresa?: number): Promise<void> {
                const equivalenciaEmpresaValidador = await equivalenciaEmpresaValidadorService.GetUnassigned(idEmpresa);
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
        })),
    withComputed((store) => ({
        // pageSizeEmpresas: computed(() => store.empresas.metadata.pageSize()),
        isSelectedEmpresa: computed(() => store.selectedEmpresa.id() > 0),
        isSelectedTrayectoRuta: computed(() => store.selectedTrayectoRuta.id() > 0)
    }))
);