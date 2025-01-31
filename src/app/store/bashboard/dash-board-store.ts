import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialDashboardState, initialSelectedEmpresa } from "./initial-dashboard";
import { computed, inject } from "@angular/core";
import { EmpresaService } from "@services/empresa.service";
import { NewEmpresa } from "@models/types/new-empresa";
import { EmpresaDTO } from "@models/DTOs/empresaDTO";

export const DashBoardStore = signalStore(
    { providedIn: 'root' },
    withState(initialDashboardState),
    withMethods(
        (store,
            empresaService = inject(EmpresaService)
        ) => ({
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
            async loadEmpresas(pageSize?: number, lastId?: number): Promise<void> {
                const id = lastId ?? store.empresas.metadata.lastId();
                const empresasData = await empresaService.getPaged(id, pageSize);
                patchState(store, { empresas: empresasData })
            },
            async saveEmpresa(newEmpresa: NewEmpresa): Promise<void> {
                await empresaService.post(newEmpresa);
            },
            async updateEmpresa(empresa: EmpresaDTO): Promise<void> {
                const updatedEmpresa = await empresaService.put(empresa);
                patchState(store, (state) => ({
                    empresas: {
                        ...state.empresas,
                        data: state.empresas.data.map((emp) => emp.id === updatedEmpresa.id ? updatedEmpresa : emp)
                    }
                }));
            },
            async deleteEmpresa(id: number): Promise<void> {
                await empresaService.delete(id);

                // if (store.empresas.metadata.totalPages() <= 1) {
                //     patchState(store, (state) => ({
                //         empresas: {
                //             metadata: {
                //                 ...state.empresas.metadata,
                //                 totalCount: state.empresas.metadata.totalCount - 1
                //             },
                //             data: state.empresas.data.filter((emp) => emp.id !== id)
                //         }
                //     }));
                // }
                // else {
                const empresasData = await empresaService.getPaged(0, store.empresas.metadata.pageSize());
                patchState(store, { empresas: empresasData });
                // }

            }
        })),
    withComputed((store) => ({
        pageSizeEmpresas: computed(() => store.empresas.metadata.pageSize()),
        isSelectedEmpresa: computed(() => store.selectedEmpresa.id() > 0)
    }))
);