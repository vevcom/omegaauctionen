"use server"

import getUserID from "@/app/api/auth/getUserId";
import { prisma } from "@/app/prisma";
import { Study } from "@/generated/enums"
export default async function regUserCourse(studyCourse:string) {
    const userID = await getUserID();
    if (!userID) {
        return;
    }
    let studyCourseToSet;
    
    if (studyCourse=="elsys"){
        studyCourseToSet = Study.ELSYS
    }
    else if (studyCourse=="kyb"){
        studyCourseToSet = Study.KYB
    }
    else {
        studyCourseToSet = Study.OTHER
    }

    await prisma.user.update({
        where: {
          id:userID,
        },
        data: {
          studyCourse: studyCourseToSet,
        }
      })
}