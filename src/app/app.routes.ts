import { Routes } from '@angular/router';
import { LoginComponent } from '@components/login/login.component';
import { AppRoutes } from '@routes/app.routes';

export const routes: Routes = [
    { path: '', redirectTo: AppRoutes.login, pathMatch: 'full' },
    { path: AppRoutes.login, component: LoginComponent, },
    {
        path: AppRoutes.dashboard.path, loadComponent: () => import('@components/dashboard/dashboard.component').then(c => c.DashboardComponent),
        children: [
            { path: AppRoutes.dashboard.children.empresas, loadComponent: () => import('@components/dashboard/empresas/empresas.component').then(c => c.EmpresasComponent) },
            { path: AppRoutes.dashboard.children.rutas, loadComponent: () => import('@components/dashboard/rutas/rutas.component').then(c => c.RutasComponent) },
            { path: AppRoutes.dashboard.children.unidades, loadComponent: () => import('@components/dashboard/unidades/unidades.component').then(c => c.UnidadesComponent) },

        ]
    }
];
