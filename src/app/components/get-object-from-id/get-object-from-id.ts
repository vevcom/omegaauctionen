"use server"

import { prisma } from "@/app/prisma";

export default async function getObjectById(id:number) {
    const object = await prisma.auksjonsObjekt.findFirst({
        where:{
            id:id,
            approved: true,
        }
    })
    if (!object){
        return;
    }
    return object
}