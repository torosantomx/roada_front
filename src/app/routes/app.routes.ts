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
            empresas: CustomRoutes;
            rutas: CustomRoutes;
            unidades: CustomRoutes;
            asignacionRutas: CustomRoutes;
        };
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
                name: "asignación de rutas"
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