"use server"

import { prisma } from "@/app/prisma"


export async function deleteFunc(objectId:number) {
    const response = await prisma.auksjonsObjekt.delete({where: {
        id:objectId,
    }})
    return [response,true]
}