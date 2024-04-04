export interface IMenuByRoleResponse {
    idMenu: string;
    name: string;
    options: IMenuOption[];
    icon: string;
}

export interface IMenuOption {
    idOption: string;
    name: string;
    order: string;
    path: string;
    icon: string;
    flagVisible: boolean;
}