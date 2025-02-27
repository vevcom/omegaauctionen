"use server"

import getUser from "@/app/api/auth/getUser"
import { prisma } from "@/app/prisma"


export default async function is_admin() {
    const userData = await getUser()
    if (userData) {
        if (userData.isAdmin) {
            return true
        }
    }
    return false
    // const userID = await getUserID()
    // console.log(userID)
    // if (userID) {
    //     const userData = await prisma.user.findFirst({
    //         where:
    //         {
    //             id: userID,
    //         },
    //     })
    //     console.log(userData)
    //     if (userData) {
    //         if (userData.isAdmin) {
    //             setLoadAdminPage(true)
    //         }
    //     }
    // }
}