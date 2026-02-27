'use server'

import { prisma } from "@/app/prisma"
import { Study } from "@/generated/enums"

export default async function reportedFieldOfStudy(userID:string) {
    const userData = await prisma.user.findFirst({where:{
        id:userID
    }})

    //catches errors in userLoading
    if (userData == null){
        return true    
    }
    //checks if user has reported the field of study
    if (userData.studyCourse == Study.NOTANSWERD){
        return false
    }
    return true
}