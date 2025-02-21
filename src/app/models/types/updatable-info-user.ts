import { UsuarioDTO } from "@models/DTOs/usuarioDTO";

export type UpdatableInfoUser = Omit<UsuarioDTO, 'clave'>