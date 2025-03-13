"use server"

import getUserID from "@/app/api/auth/getUserId"
import { prisma } from "@/app/prisma"
import is_miniadmin from "../is-miniadmin/is-miniadmin"


//This function uses an unapproved item to register amounts of money made fromm lodd(beermile)
//it uses stock for this
export default async function increment_lodd_sold(amount:number) {
    // The statistics of the site would be ruined if these items are approved. Hence we have chosen to call it "DONOTAPPROVE"
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
    const isAdmin = await is_miniadmin()
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


    const newMoneyAmount = loddObject.stock + moneyForLoddOre*amount;

    //uses stock to store money made
    const respone = await prisma.auksjonsObjekt.update({ where: { id: loddObject.id }, data: { stock: newMoneyAmount } })
    if (!respone){
        return false;
    }
    //returns number of lodd sold
    return (newMoneyAmount/moneyForLoddOre).toFixed(0);
}   