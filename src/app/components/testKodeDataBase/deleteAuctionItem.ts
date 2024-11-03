"use server"
import { prisma } from "../../prisma"


export async function deleteAllItems() { //TODO Slett denne filen før deploment
    await prisma.auksjonsObjekt.deleteMany({})
}