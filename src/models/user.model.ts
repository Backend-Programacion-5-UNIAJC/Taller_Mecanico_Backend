export type Role = 'ADMIN' | 'MECHANIC' | 'CLIENT'

export interface AuthUser {
    id: number;
    role: Role;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}