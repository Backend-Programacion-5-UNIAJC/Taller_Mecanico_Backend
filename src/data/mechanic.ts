export interface Mechanic {
    id: number;
    name: string;
    specialty: string;
    email: string;
}

export const mechanics: Mechanic[] = [
    {
        id: 1,
        name: 'Carlos Garcia',
        specialty: 'Suspencion y frenos',
        email: 'carlosg@mechanic.com'
    },
    {
        id: 2,
        name: 'Javier Murillo',
        specialty: 'Electricidad',
        email: 'javiM@mechanic.com'
    },
    {
        id: 3,
        name: 'Mario figueroa',
        specialty: 'Mecanico general',
        email: 'mariofi@mechanic.com'
    }
]