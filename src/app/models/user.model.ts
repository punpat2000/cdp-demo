export interface User {
    userId?: string,
    displayName: string,
    email: string,
    role: UserRoles
}

export interface UserRoles {
    admin?: boolean,
    editor?: boolean,
    sales?: boolean,
    accountant?: boolean,
    unspecified?: boolean
}