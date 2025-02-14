import { RutaEmpresaDTO } from "@models/DTOs/ruta-empresa";

export type NewRutaEmpresa = Pick<RutaEmpresaDTO, 'idEmpresa' | 'idRuta'>;