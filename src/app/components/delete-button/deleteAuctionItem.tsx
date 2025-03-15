"use server"

import { prisma } from "@/app/prisma"
import is_admin from "../is-admin/is-admin-func"


export async function deleteFunc(objectId:number) {
    const isAdmin = await is_admin()
    if(!isAdmin){
        return ["not admin",false];
    }
    const response = await prisma.auksjonsObjekt.update({
        where:{
            id:objectId,
        },
        data:{
            approved:false
        }
    })
    return [response,true]
}