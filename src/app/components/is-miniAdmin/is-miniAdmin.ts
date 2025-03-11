"use server"

import getUserID from "@/app/api/auth/getUserId"
import { prisma } from "@/app/prisma"


export default async function is_miniAdmin() {
    //gets user info and determins if user has miniAdmin accsess. Returns true if user has miniAdmin or admin accsess

    const userID = await getUserID()
    if (!userID) {
        return false;
    }
    const user = await prisma.user.findFirst({ where: { id: userID } })

    if (!user){
        return false;
    }

    if (user.isMiniAdmin){
        return true;
    }

    if (user.isAdmin){
        return true;
    }
    return false
}