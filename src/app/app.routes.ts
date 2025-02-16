import { Routes } from '@angular/router';
import { LoginComponent } from '@components/login/login.component';
import { isAdminGuard } from '@guards/is-admin.guard';
import { isLoggedInGuard } from '@guards/is-logged-in.guard';
import { isNotLoggedInGuard } from '@guards/is-not-logged-in.guard';
import { AppRoutes } from '@routes/app.routes';

export const routes: Routes = [
    { path: '', redirectTo: AppRoutes.login.path, pathMatch: 'full' },
    { path: AppRoutes.login.path, component: LoginComponent, canActivate: [isNotLoggedInGuard] },
    {
        path: AppRoutes.dashboard.path,
        loadComponent: () => import('@components/dashboard/dashboard.component').then(c => c.DashboardComponent),
        canActivate: [isLoggedInGuard],
        children: [
            {
                path: AppRoutes.dashboard.children.catalgos.path,
                children: [
                    {
                        path: AppRoutes.dashboard.children.catalgos.children.empresas.path,
                        loadComponent: () => import('@components/dashboard/catalogos/empresas/empresas.component').then(c => c.EmpresasComponent),
                        canActivate: [isAdminGuard]
                    },
                    {
                        path: AppRoutes.dashboard.children.catalgos.children.rutas.path,
                        loadComponent: () => import('@components/dashboard/catalogos/rutas/rutas.component').then(c => c.RutasComponent),
                        canActivate: [isAdminGuard]
                    },
                    {
                        path: AppRoutes.dashboard.children.catalgos.children.unidades.path,
                        loadComponent: () => import('@components/dashboard/catalogos/unidades/unidades.component').then(c => c.UnidadesComponent)
                    },
                    {
                        path: AppRoutes.dashboard.children.catalgos.children.asignacionRutas.path,
                        loadComponent: () => import('@components/dashboard/catalogos/asignacion-rutas/asignacion-rutas.component').then(c => c.AsignacionRutasComponent)
                    }
                ]
            },
            {
                path: AppRoutes.dashboard.children.usuarios.path,
                loadComponent: () => import('@components/dashboard/usuarios/usuarios.component').then(c => c.UsuariosComponent)
            }
        ]
    }
];
