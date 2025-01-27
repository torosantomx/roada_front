import { inject, InjectionToken } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { BaseState } from "./base-state";
import { initialBaseState } from "./initial-base-state";
import { SessionService } from "@services/session.service";
import { LoginService } from "@services/login.service";
import { Credentials } from "@models/custom-entities/credentials";


const baseStateFactory = new InjectionToken<BaseState>('roada', {
    factory: () => {
        let sessionService = inject(SessionService);
        const usuario = sessionService.usuario;
        if (usuario) {
            const loggedInState: BaseState = {
                isOpen: false,
                usuario,
                token: ""
            }
            return loggedInState
        }
        return initialBaseState;
    },
});
export const BaseStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(baseStateFactory)),
    withMethods((store, loginService = inject(LoginService)) => ({
        toggle(): void {
            patchState(store, { isOpen: !store.isOpen() })
        },

        async login(credenciales: Credentials): Promise<void> {
            const usuarioInfo = await loginService.login(credenciales);
            patchState(store, {
                usuario: usuarioInfo.usuario,
                token: usuarioInfo.token
            });
        },
        logOut(): void {
            patchState(store, () => ({
                ...initialBaseState
            }))

        }
    }))
);