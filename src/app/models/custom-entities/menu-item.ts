export type SubMenuItem = Omit<MenuItem, 'icon' | 'children'>

export interface MenuItem {
    icon: string;
    label: string;
    route: string;
    onlyAdmin?: boolean;
    children?: Array<SubMenuItem>
}
