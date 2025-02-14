import { TrayectoRutaDTO } from "@models/DTOs/trayectoRutaDTO";

export type NewTrayectoRuta = Pick<TrayectoRutaDTO, 'clave' | 'descripcion'>;