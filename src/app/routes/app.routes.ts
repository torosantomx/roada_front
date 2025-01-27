
type Parents = 'dashboard';
type DashboardChildren = 'empresas' | 'rutas' | 'unidades';

export const AppRoutes = {
    login: 'login',
    dashboard: {
        path: 'dashboard',
        children: {
            empresas: 'empresas',
            rutas: 'rutas',
            unidades: 'unidades',
        } as Record<DashboardChildren, string>
    }
}


export function getChildRoutePath(parentPath: Parents, childRoute: DashboardChildren): string {
    const parent = AppRoutes[parentPath];
    if (!parent.hasOwnProperty('path') || !parent.hasOwnProperty('children'))
      throw new Error('This is not a valid Parent');
    const child: string = parent.children[childRoute];
    return `${parent.path}/${child}`;
  }