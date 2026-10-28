export interface Mechanic {
    id: number;
    name: string;
    specialty: string;
    email: string;
}

export type MechanicInput = Omit<Mechanic, 'id'>;