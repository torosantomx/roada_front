import { UsuarioDTO } from "@models/DTOs/usuarioDTO";

export type NewUsuario = Omit<UsuarioDTO, 'id'>
