"use server"
import { getServerSession } from "next-auth"
import { options } from "./[...nextauth]/options"
import { prisma } from "@/app/prisma";

export default async function getUser() {
    // gets session information
    const session = await getServerSession(options);
    if(!session) {
        return false;
    }
    
    const user = await prisma.user.findFirst(({where:{email:session?.user?.email}}));
    if(!user){
        return false
    }
    return user;
}