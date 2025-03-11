"use server"

import getUserID from "@/app/api/auth/getUserId"
import { prisma } from "@/app/prisma"
import is_miniAdmin from "../is-miniAdmin/is-miniAdmin"


//This function uses an unapproved item to registrer amounts of "lodd" sold (beermile)
//it uses stock for this
export default async function increment_lodd_sold(amount:number) {
    //DONOTAPPROVE beacause the statisics would be ruind if approved and the item is not ment to be bid on
    const lodd_name = "DONOTAPPORVELodd"
    const moneyForLoddOre = 5000 //TODO Get acctual price

    if (amount<=0){
        return false
    }

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
    let loddObject = await prisma.auksjonsObjekt.findFirst({
        where: {
            name: lodd_name, // IF SOMEONE NAMES THERI AUCTION ITEM THIS, ill be mad
        }
    })
    //makes bong object if there is non
    if (!loddObject) {
        loddObject = await prisma.auksjonsObjekt.create({
            data: {
                currentSaleTime: new Date("2022-03-25"),
                finalSaleTime: new Date("2022-03-25"),
                description: "DONOTAPPOVE",
                name: lodd_name,
                startPriceOre: moneyForLoddOre,
                currentPriceOre: moneyForLoddOre,
                approved: false,
                stock: 0
            }
        })
    }
    //uses stock to store amount of bongs sold
    const respone = await prisma.auksjonsObjekt.update({ where: { id: loddObject.id }, data: { stock: loddObject.stock + amount } })
    if (!respone){
        return false;
    }
    //returns number of bongs sold
    return loddObject.stock +amount;
}   