import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialDashboardState, initialSelectedEmpresa, initialSelectedTreyectoRuta, initialSelectedUnidadAuto, initialSelectedUsuario } from "./initial-dashboard";
import { computed, inject } from "@angular/core";
import { EmpresaService } from "@services/empresa.service";
import { NewEmpresa } from "@models/types/new-empresa";
import { EmpresaDTO } from "@models/DTOs/empresaDTO";
import { EquivalenciaEmpresaDvrService } from "@services/equivalencia-empresa-dvr.service";
import { EquivalenciaEmpresaValidadorService } from "@services/equivalencia-empresa-validador.service";
import { TrayectoRutaService } from "@services/trayecto-ruta.service";
import { NewTrayectoRuta } from "@models/types/new-trayecto-ruta";
import { EquivalenciasUnidadValidadorService } from "@services/equivalencias-unidad-validador.service";
import { EquivalenciaUnidadDvrService } from "@services/equivalencia-unidad-dvr.service";
import { UnidadAutoService } from "@services/unidad-auto.service";
import { NewUnidadAuto } from "@models/types/new-unidad-auto";
import { UnidadAutoDTO } from "@models/DTOs/unidad-auto";
import { RutaEmpresaService } from "@services/ruta-empresa.service";
import { TrayectoRutaDTO } from "@models/DTOs/trayectoRutaDTO";
import { NewRutaEmpresa } from "@models/types/new-ruta-empresa";
import { UsuarioService } from "@services/usuario.service";
import { UsuarioDTO } from "@models/DTOs/usuarioDTO";
import { PasswordChangedInfo } from "@models/custom-entities/password-changed-info";
import { UpdatableInfoUser } from "@models/types/updatable-info-user";
import { NewUsuario } from "@models/types/new-usuario";
import { CifrasControlService } from "@services/cifras-control.service";
import { ProcesosService } from "@services/procesos.service";
import { CifrasControlDTO } from "@models/DTOs/cifras-control";
import { TurnoService } from "@services/turno.service";
import { NewTurno } from "@models/types/new-turno";

export const DashBoardStore = signalStore(
    { providedIn: 'root' },
    withState(initialDashboardState),
    withMethods(
        (store,
            empresaService = inject(EmpresaService),
            equivalenciaEmpresaValidadorService = inject(EquivalenciaEmpresaValidadorService),
            equivalenciaEmpresaDvrService = inject(EquivalenciaEmpresaDvrService),
            trayectoRutaService = inject(TrayectoRutaService),
            rutaEmpresaService = inject(RutaEmpresaService),
            equivalenciaUnidadDvrService = inject(EquivalenciaUnidadDvrService),
            unidadesAutosService = inject(UnidadAutoService),
            equivalenciasUnidadValidadorService = inject(EquivalenciasUnidadValidadorService),
            usuarioService = inject(UsuarioService),
            cifrasControlService = inject(CifrasControlService),
            procesosService = inject(ProcesosService),
            turnoService = inject(TurnoService)
        ) => ({
            //#region Empresas
            resetLasIdEmpresas(): void {
                patchState(store, (state) => ({
                    pagedEmpresas: {
                        ...state.pagedEmpresas,
                        metadata: {
                            ...state.pagedEmpresas.metadata,
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
                const id = lastId ?? store.pagedEmpresas.metadata.lastId();
                const empresasData = await empresaService.getPagedWithSearch(id, pageSize, search);
                patchState(store, { pagedEmpresas: empresasData })
            },
            async loadAllEmpresas(): Promise<void> {
                const empresas = await empresaService.getAll();
                patchState(store, { empresas })
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
                    pagedEmpresas: {
                        ...state.pagedEmpresas,
                        data: state.pagedEmpresas.data.map((emp) => emp.id === updatedEmpresa.id ? updatedEmpresa : emp)
                    }
                }));
            },
            async deleteEmpresa(id: number): Promise<void> {
                await empresaService.delete(id);
                const empresasData = await empresaService.getPaged(0, store.pagedEmpresas.metadata.pageSize());
                patchState(store, { pagedEmpresas: empresasData });
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
            async updateTrayectoRuta(trayectoRuta: TrayectoRutaDTO): Promise<void> {
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
            setSelectedTracyectoRuta(selectedTrayectoRuta: TrayectoRutaDTO): void {
                patchState(store, { selectedTrayectoRuta });
            },
            async getUnassignedRutasByEmpresa(): Promise<void> {
                const unassignedRutasByEmpresa = await trayectoRutaService.getUnassignedTrayectoRutaByEmpresa();
                patchState(store, { unassignedRutasByEmpresa });
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
            async getUnidadesByEmpresa(): Promise<void> {
                const unidades = await unidadesAutosService.getAllByEmpresa();
                const economicos = new Set([...unidades.map(u => u.economico)]);

                const unidadesMap = new Map<string, number>();

                unidades.forEach(unidad => {
                    unidadesMap.set(unidad.economico, unidad.id);
                });
                patchState(store, () => ({
                    economicos,
                    unidadesMap
                }))

            },
            //#endregion

            //#region RutaEmpresaService
            async getRutasEmpresaByEmpresa(pageSize?: number, lastId?: number) {
                const id = lastId ?? store.rutasEmpresas.metadata.lastId();
                const rutasEmpresas = await rutaEmpresaService.GetPagedByEmpresa(id, pageSize);
                patchState(store, { rutasEmpresas })
            },

            resetLasIdRutasEmpresa(): void {
                patchState(store, (state) => ({
                    rutasEmpresas: {
                        ...state.rutasEmpresas,
                        metadata: {
                            ...state.rutasEmpresas.metadata,
                            lastId: 0
                        }
                    }
                }));
            },
            async saveRutaEmpresa(newRutaEmpresa: NewRutaEmpresa): Promise<void> {
                await rutaEmpresaService.post(newRutaEmpresa);
            },
            async deleteRutaEmpresa(id: number): Promise<void> {
                await rutaEmpresaService.delete(id);
                const rutasEmpresas = await rutaEmpresaService.GetPagedByEmpresa();
                patchState(store, { rutasEmpresas })
            },
            async getClavesRutasByEmpresa() {
                const clavesFromDb = await rutaEmpresaService.GetAllByEmpresa();
                const clavesRutas = new Set([...clavesFromDb.map(c => c.claveTrayectoRuta)]);
                const clavesRutasMap = new Map<string, number>();
                clavesFromDb.forEach(claves => {
                    clavesRutasMap.set(claves.claveTrayectoRuta, claves.idRuta);
                });
                patchState(store, (state) => ({
                    clavesRutas,
                    clavesRutasMap
                }));
            },
            //#endregion

            //#region usuarioService
            async loadUsuarios(search?: string, pageSize?: number, lastId?: number): Promise<void> {
                const id = lastId ?? store.usuarios.metadata.lastId();
                const usuarios = await usuarioService.getPagedWithSearch(id, pageSize, search);
                patchState(store, { usuarios })
            },
            resetLasIdUsuarios(): void {
                patchState(store, (state) => ({
                    usuarios: {
                        ...state.usuarios,
                        metadata: {
                            ...state.usuarios.metadata,
                            lastId: 0
                        }
                    }
                }));
            },
            async deleteUsuario(id: number): Promise<void> {
                await usuarioService.delete(id);
                const usuarios = await usuarioService.getPaged(0, store.usuarios.metadata.pageSize());
                patchState(store, { usuarios })
            },
            setSelectedUsuario(selectedUsuario: UsuarioDTO): void {
                patchState(store, { selectedUsuario });
            },
            resetSelectedUsuario(): void {
                patchState(store, { selectedUsuario: initialSelectedUsuario });
            },
            async registerUsuario(info: NewUsuario): Promise<void> {
                await usuarioService.registerUser(info);
            },
            async changePassword(password: string): Promise<void> {
                const infoPassword: PasswordChangedInfo = {
                    id: store.selectedUsuario().id,
                    password
                }
                await usuarioService.changePassword(infoPassword);
            },
            async changeUserInfo(updatableInfoUser: UpdatableInfoUser): Promise<void> {
                const updatedUser = await usuarioService.changeDataUser(updatableInfoUser);

                patchState(store, (state) => ({
                    usuarios: {
                        ...state.usuarios,
                        data: state.usuarios.data.map((u) => u.id === updatedUser.id ? updatedUser : u)
                    }
                }));
            },
            //#endregion

            //#region cifrasControlService
            async loadProcesosPagedByEmpresa(date: string, lastId?: number, pageSize?: number,): Promise<void> {
                const todayPagedProcesos = await cifrasControlService.getPagedByEmpresa(lastId, pageSize, date)
                patchState(store, { todayPagedProcesos })
            },
            async loadProcesosHistoryByEmpresa(lastId?: number, pageSize?: number, idProceso?: number, date?: string): Promise<void> {
                const historyProcesos = await cifrasControlService.getPagedByEmpresa(lastId, pageSize, date, idProceso)
                patchState(store, { historyProcesos })
            },
            resetLastIdHistoryProcesos() {
                patchState(store, (state) => ({
                    historyProcesos: {
                        ...state.historyProcesos,
                        metadata: {
                            ...state.historyProcesos.metadata,
                            lastId: 0
                        }
                    }
                }));
            },
            resetLastIdTodayProcesos() {
                patchState(store, (state) => ({
                    todayPagedProcesos: {
                        ...state.todayPagedProcesos,
                        metadata: {
                            ...state.todayPagedProcesos.metadata,
                            lastId: 0
                        }
                    }
                }));
            },
            async reprocess(cifra: CifrasControlDTO): Promise<void> {
                const updatedCifra = await cifrasControlService.reProcess(cifra);
                patchState(store, (state) => ({
                    historyProcesos: {
                        ...state.historyProcesos,
                        data: state.historyProcesos.data.map((p) => p.id === updatedCifra.id ? updatedCifra : p)
                    }
                }));
            },
            //#endregion

            //#region procesosService
            async loadProcesos() {
                const procesos = await procesosService.getAll();
                patchState(store, { procesos })
            },
            //#endregion  

            //#region turnoService
            async createTurnos(turnos: Array<NewTurno>): Promise<void> {
                const newTurnos = await turnoService.addRange(turnos);
            },
            async loadTurnos(lastId?: number, pageSize?: number, date?: string): Promise<void> {
                const pagedTurnos = await turnoService.getPagedByDate(lastId, pageSize, date);
                patchState(store, { pagedTurnos });
            },
            async eraseTurnos(date: string) {
                await turnoService.eraseTurnos(date);
            }
            //#endregion

        })),
    withComputed((store) => ({
        isSelectedEmpresa: computed(() => store.selectedEmpresa.id() > 0),
        isSelectedTrayectoRuta: computed(() => store.selectedTrayectoRuta.id() > 0),
        isSelectedAutoUnidad: computed(() => store.selectedAutoUnidad.id() > 0),
        isSelectedUsuario: computed(() => store.selectedUsuario().id > 0)
    }))
);