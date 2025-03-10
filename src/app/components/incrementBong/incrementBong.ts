"use server"

import getUserID from "@/app/api/auth/getUserId"
import { prisma } from "@/app/prisma"
import is_admin from "../is-admin/is-admin-func"



export default async function increment_bong() {
    const bong_name = "DONOTAPPORVEBongAUEFJNPDADJNCFSNFE"
    const moneyForBongOre = 5000

    const userID = await getUserID()
    if (!userID) {
        return false;
    }

    const isAdmin = await is_admin()
    if (!isAdmin){
        return false
    }

    let bongObject = await prisma.auksjonsObjekt.findFirst({
        where: {
            name: bong_name,
        }
    })
    if (!bongObject) {
        bongObject = await prisma.auksjonsObjekt.create({
            data: {
                currentSaleTime: new Date("2022-03-25"),
                finalSaleTime: new Date("2022-03-25"),
                description: "DONOTAPPOVE",
                name: bong_name,
                startPriceOre: moneyForBongOre,
                currentPriceOre: moneyForBongOre,
                approved: false,
                stock: 0
            }
        })
    }
    const respone = await prisma.auksjonsObjekt.update({ where: { id: bongObject.id }, data: { stock: bongObject.stock + 1 } })
    if (!respone){
        return false;
    }
    return bongObject.stock +1;
}   