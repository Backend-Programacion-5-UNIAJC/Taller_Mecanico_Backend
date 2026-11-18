import { Mechanic, mechanics } from "./mechanic";
import { Vehicle, vehicles } from "./vehicle";

export interface ServiceOrder {
    id: number;
    vehicle: Vehicle;
    mechanic: Mechanic;
    description: string;
    fecha: Date;
    estado: "Pendiente" | "En proceso" | "Completada";
}

export const serviceOrdes: ServiceOrder[] = [
    {
        id: 1,
        vehicle: vehicles[0],
        mechanic: mechanics[0],
        description: 'Se realiza un cambio de frenos y revision de suspension',
        fecha: new Date(),
        estado: 'Pendiente'
    },
    {
        id: 2,
        vehicle: vehicles[2],
        mechanic: mechanics[1],
        description: 'Se realiza una inspeccion a la iluminacion del vehiculo',
        fecha: new Date(),
        estado: 'Pendiente'
    }
]