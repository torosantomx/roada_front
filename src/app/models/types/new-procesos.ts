import { ProcesosDTO } from "@models/DTOs/procesosDTO";

export type NewProceso = Omit<ProcesosDTO, 'id'>