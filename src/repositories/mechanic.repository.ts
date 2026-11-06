import { Prisma } from "@prisma/client";
import {prisma} from "../lib/prisma"
import { Mechanic } from '@prisma/client';


function isNotFound( error: unknown): boolean {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025';
}
export function findAll () {
    return prisma.mechanic.findMany({ orderBy: {id: "asc"}});
}

export function findById(id: number){
    return prisma.mechanic.findUnique({ where: {id}});
}

export function create(data: Mechanic) {
    return prisma.mechanic.create({ data });
} 

export async function update( id: number, data: Partial<Mechanic>) {
    try{
        return await prisma.mechanic.update({ where: {id}, data});
    }catch(error){
        if(isNotFound(error)) return null;
        throw error;
    }
}