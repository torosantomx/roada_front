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
        path: AppRoutes.dashboard.path, loadComponent: () => import('@components/dashboard/dashboard.component').then(c => c.DashboardComponent),
        canActivate: [isLoggedInGuard],
        children: [
            {
                path: AppRoutes.dashboard.children.empresas.path, loadComponent: () => import('@components/dashboard/empresas/empresas.component').then(c => c.EmpresasComponent),
                canActivate: [isAdminGuard]
            },
            {
                path: AppRoutes.dashboard.children.rutas.path,
                loadComponent: () => import('@components/dashboard/rutas/rutas.component').then(c => c.RutasComponent),
                canActivate: [isAdminGuard]
            },
            { path: AppRoutes.dashboard.children.unidades.path, loadComponent: () => import('@components/dashboard/unidades/unidades.component').then(c => c.UnidadesComponent) },
            { path: AppRoutes.dashboard.children.asignacionRutas.path, loadComponent: () => import('@components/dashboard/asignacion-rutas/asignacion-rutas.component').then(c => c.AsignacionRutasComponent) }

        ]
    }
];
