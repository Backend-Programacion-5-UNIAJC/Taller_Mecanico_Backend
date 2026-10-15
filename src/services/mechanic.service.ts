import { Mechanic, mechanics } from "../data/mechanic";

let nextId = 5;

export function listMechanics(): Mechanic[] {
    return mechanics
}

export function findMechanicById(id: number): Mechanic | undefined {
    return mechanics.find( c => c.id === id);
}

export function createMechanic(data: Omit<Mechanic, 'id' >): Mechanic {
    const newMechanic: Mechanic = { id: nextId++, ...data};
    mechanics.push(newMechanic);
    return newMechanic
}

export function updateMechanic(id: number, data: Partial<Mechanic>): Mechanic | undefined {
    const mechanic = findMechanicById(id);
    if (!mechanic) return undefined;
    Object.assign(mechanic, data);
    return mechanic;
}

export function deleteMechanic(id: number): boolean {
    const index = mechanics.findIndex(c => c.id === id);
    if (index === -1) return false;
    mechanics.splice(index,1);
    return true;
}