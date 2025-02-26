interface CustomRoutes {
    path: string;
    name: string;
}

interface AppRoutes {
    login: CustomRoutes;
    dashboard: {
        path: string;
        name: string;
        children: {
            catalgos: {
                path: string;
                name: string;
                children: {
                    empresas: CustomRoutes;
                    rutas: CustomRoutes;
                    unidades: CustomRoutes;
                    asignacionRutas: CustomRoutes;
                }
            },
            usuarios: CustomRoutes,
            procesamiento: CustomRoutes,
            turnos: CustomRoutes
        }
    };
}
export const AppRoutes: AppRoutes = {
    login: {
        path: "login",
        name: "login"
    },
    dashboard: {
        path: "dashboard",
        name: "dashboard",
        children: {
            catalgos: {
                path: 'catalogos',
                name: 'Catálogos',
                children: {
                    empresas: {
                        path: "empresas",
                        name: "empresas"
                    },
                    rutas: {
                        path: "rutas",
                        name: "rutas"
                    },
                    unidades: {
                        path: "unidades",
                        name: "unidades"
                    },
                    asignacionRutas: {
                        path: "asignacionRutas",
                        name: "Asignación de rutas"
                    }
                }
            },
            usuarios: {
                path: "usuarios",
                name: "Usuarios"
            },
            procesamiento: {
                path: "procesamiento",
                name: "Procesamiento"
            },
            turnos: {
                path: "turnos",
                name: "Turnos"
            }
        }
    }
}


// export function getChildRoutePath(parentPath: Parents, childRoute: DashboardChildren): string {
//     const parent = AppRoutes[parentPath];
//     if (!parent.hasOwnProperty('path') || !parent.hasOwnProperty('children'))
//       throw new Error('This is not a valid Parent');
//     const child: string = parent.children[childRoute];
//     return `${parent.path}/${child}`;
//   }