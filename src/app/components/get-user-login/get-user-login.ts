"use server"

import getUserID from "@/app/api/auth/getUserId"

export async function is_logged_in(){
    const userData = await getUserID()
    if (!userData) return false;
    return true
}