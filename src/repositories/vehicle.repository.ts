import { Prisma } from "@prisma/client";
import {prisma} from "../lib/prisma"
import { Vehicle } from '@prisma/client';


function isNotFound( error: unknown): boolean {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025';
}
//Buscar Todos
export function findAll () {
    return prisma.vehicle.findMany({ orderBy: {id: "asc"}});
}

//Buscar Por ID
export function findById(id: number){
    return prisma.vehicle.findUnique({ where: {id}});
}

// Crear Vehiculo
export function create(data: Vehicle) {
    return prisma.vehicle.create({ data });
} 

// Actualizar Vehiculo
export async function update( id: number, data: Partial<Vehicle>) {
    try{
        return await prisma.vehicle.update({ where: {id}, data});
    }catch(error){
        if(isNotFound(error)) return null;
        throw error;
    }
}