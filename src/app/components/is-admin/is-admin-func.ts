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
}