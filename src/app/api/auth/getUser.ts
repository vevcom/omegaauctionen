"use server"
import { getServerSession } from "next-auth"
import { options } from "./[...nextauth]/options"
import { prisma } from "@/app/prisma";

export default async function getUser() {
    // gets session information
    const session = await getServerSession(options);

    if(!session || !session.user?.email) {
        return null;
    }
    const user = await prisma.user.findFirst(({
        where:{email:session?.user?.email}, 
        include: {auksjonsObjekter: true,},
    }));

    if(!user){
        return null;

    }
    return user;
}