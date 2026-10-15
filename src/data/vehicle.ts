export interface Vehicle {
    id: number;
    plate: string;
    brand: string;
    model: string;
    ownerName: string
}

export const vehicles: Vehicle[] =[
    {
        id: 1,
        plate: 'IYW308',
        brand: 'Chevrolet Beat',
        model: '2019',
        ownerName: 'Edward Fernandez'
    },
    {
        id: 2,
        plate: 'IIP124',
        brand: 'Chevrolet Spark GT',
        model: '2016',
        ownerName: 'Camilo Astudillo'
    },
    {
        id: 3,
        plate: 'WVE023',
        brand: 'Suzuki Swift',
        model: '2026',
        ownerName: 'Dayana Castro'
    },
    {
        id: 4,
        plate: 'HMI134',
        brand: 'Toyota TXL',
        model: '2022',
        ownerName: 'Luis Castro'
    }
]