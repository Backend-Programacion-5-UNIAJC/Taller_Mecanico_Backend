import { Vehicle, vehicles} from "../data/vehicle";

let nextId =5;
export function listVehicles(): Vehicle[] {
    return vehicles;
}

export function findVehicleById(id: number): Vehicle | undefined {
    return vehicles.find(v => v.id === id);
}

export function creteVehicle (data:Omit<Vehicle, 'id'>): Vehicle {
    const newVehicle: Vehicle = {id: nextId++, ...data};
    return newVehicle
}

export function updateVehicle (id: number, data: Partial<Vehicle>): Vehicle | undefined {
    const vehicle = findVehicleById(id);
    if(!vehicle) return undefined;
    Object.assign(vehicle, data);
    return vehicle;
}

export function deleteVehicle(id: number): boolean {
    const index = vehicles.findIndex (v=> v.id === id);
    if(index === -1)return false;
    vehicles.splice(index,1);
    return true;
}