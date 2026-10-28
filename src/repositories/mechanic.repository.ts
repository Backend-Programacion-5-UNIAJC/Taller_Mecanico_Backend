import { Prisma } from "@prisma/client";
import {prisma} from "../lib/prisma"
import { Mechanic, MechanicInput} from "../models/mechanic.model"

function isNotFound( error: unknown): boolean {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025';
}
export function findAll () {
    return prisma.course.findMany({ orderBy: {id: "asc"}});
}

export function findById(id: number){
    return prisma.course.findUnique({ where: {id}});
}

export function create(data: MechanicInput) {
    return prisma.course.create({ data });
} 

export async function update( id: number, data: Partial<MechanicInput>) {
    try{
        return await prisma.course.update({ where: {id}, data});
    }catch(error){
        if(isNotFound(error)) return null;
        throw error;
    }
}