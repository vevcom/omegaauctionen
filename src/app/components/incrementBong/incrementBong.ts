"use server"

import getUserID from "@/app/api/auth/getUserId"
import { prisma } from "@/app/prisma"
import is_miniAdmin from "../is-miniAdmin/is-miniAdmin"


//This function uses an unapproved item to registrer amounts of bongs sold
//it uses stock for this
export default async function increment_bong() {
    //DONOTAPPROVE beacause the statisics would be ruind if approved and the item is not ment to be bid on
    const bong_name = "DONOTAPPORVEBong"
    const moneyForBongOre = 5000 //TODO Get acctual price

    //Checks if logged in
    const userID = await getUserID()
    if (!userID) {
        return false;
    }

    //Checks if user has mini admin accsess
    const isAdmin = await is_miniAdmin()
    if (!isAdmin){
        return false
    }

    //Gets bong object
    let bongObject = await prisma.auksjonsObjekt.findFirst({
        where: {
            name: bong_name, // IF SOMEONE NAMES THERI AUCTION ITEM THIS, ill be mad
        }
    })
    //makes bong object if there is non
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
    //uses stock to store amount of bongs sold
    const respone = await prisma.auksjonsObjekt.update({ where: { id: bongObject.id }, data: { stock: bongObject.stock + 1 } })
    if (!respone){
        return false;
    }
    //returns number of bongs sold
    return bongObject.stock +1;
}   