"use server"
import { prisma } from "../../prisma"


export async function deleteAllItems() {
    await prisma.auksjonsObjekt.deleteMany({})
}