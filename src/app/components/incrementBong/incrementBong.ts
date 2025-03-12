"use server"

import getUserID from "@/app/api/auth/getUserId"
import { prisma } from "@/app/prisma"
import is_miniadmin from "../is-miniadmin/is-miniadmin"


//This function uses an unapproved item to register amounts of money made from bongs in ore
//it uses stock for this
export default async function increment_bong() {
    // The statistics of the site would be ruined if these items are approved. Hence we have chosen to call it "DONOTAPPROVE"
    const bong_name = "DONOTAPPORVEBong"
    const moneyForBongOre = 5000 //TODO Get acctual price

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

    const newMoneyAmount = bongObject.stock + moneyForBongOre;

    //uses stock to store amount of money made
    const respone = await prisma.auksjonsObjekt.update({ where: { id: bongObject.id }, data: { stock: newMoneyAmount } })
    if (!respone){
        return false;
    }
    //returns number of bongs sold
    return (newMoneyAmount/moneyForBongOre).toFixed(0);
}   