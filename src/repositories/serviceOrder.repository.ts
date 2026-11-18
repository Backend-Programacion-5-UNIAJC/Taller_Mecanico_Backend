import { Prisma } from "@prisma/client";
import {prisma} from "../lib/prisma"
import { ServiceOrderInput} from "../models/serviceOrder.model"

function isNotFound( error: unknown): boolean {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025';
}
export function findAll () {
    return prisma.serviceOrder.findMany({ orderBy: {id: "asc"}});
}

export function findById(id: number){
    return prisma.serviceOrder.findUnique({ where: {id}});
}

export function create(data: ServiceOrderInput) {
    return prisma.serviceOrder.create({ data });
} 

export async function update( id: number, data: Partial<ServiceOrderInput>) {
    try{
        return await prisma.serviceOrder.update({ where: {id}, data});
    }catch(error){
        if(isNotFound(error)) return null;
        throw error;
    }
}
 
export async function remove(id: number): Promise<boolean> {
    try{
        await prisma.serviceOrder.delete({ where: {id}});
        return true;
    } catch (error){
        if(isNotFound(error)) return false;
        throw error;
    }
}

//el curso junto con el usuario dueño (el userId de su instructor).
export function findWithOwner(id: number) {
return prisma.serviceOrder.findUnique({
where: { id },
include: { mechanic: { select: { userId: true } } },
});
}

