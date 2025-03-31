export enum NavigationType {
    ADMIN = "admin",
    MANAGE = "manage",
    CLIENT = "client"
}
export interface NavigationTypeData {
    admin: NavbarProps[];
    client: NavbarProps[];
    manage: NavbarProps[];
}
export interface NavbarProps {
    id: number;
    prefixIcon?: any;
    leadingIcon?: any;
    title: string;
    href?: string;
    subMenu?: NavbarProps[];
   
}
