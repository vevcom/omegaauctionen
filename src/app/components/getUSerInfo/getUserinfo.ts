"use server"

import { prisma } from "@/app/prisma";




export default async function get_user_info(userID:string) {
    const userInfo = await prisma.user.findFirst({
        where:{
            id:userID,
        },
        select:{
            name:true,
            email:true,
            studyCourse:true,
        }

    }) 
    if (userInfo){
        return userInfo
    }
    return;
}