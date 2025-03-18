"use server"



import getUserID from "@/app/api/auth/getUserId"
import { prisma } from "@/app/prisma"
import is_miniadmin from "../is-miniadmin/is-miniadmin"


//manual-money-registration-component. Registers amount of money made and returns how much money is made and how many of that item is sold
//This function uses an unapproved item to register amounts of money made. Stores it in current price
export default async function increment_manual_money_registration(name: string, moneyMadeOre: number,amountSold=1) {
    const dataBaseName = "DONOTAPPORVE" + name

    //checks if negative amount
    if (moneyMadeOre <= 0) {
        return false;
    }
    if (amountSold<=0){
        return false;
    }

    //checks if has mini admin privileges
    const isMiniAdmin = await is_miniadmin()
    if (!isMiniAdmin) {
        return false
    }

    //gets object
    let registerObject = await prisma.auksjonsObjekt.findFirst({
        where:{
            name:dataBaseName
        }
    })
    //creates object if it doesn't exist
    if (!registerObject){
        registerObject=  await prisma.auksjonsObjekt.create({
            data: {
                currentSaleTime: new Date("2022-03-25"), //further more prevents bidding on accidental approve
                finalSaleTime: new Date("2022-03-25"),  //further more prevents bidding on accidental approve
                description: "DONOTAPPOVE",
                name: dataBaseName,
                startPriceOre: 0,
                currentPriceOre: 0,
                approved: false,
                stock: 0
            }
        })
    } 

    //Creation error catch
    if (!registerObject){
        return false;
    }

    // increments money made(stored in currentPrice) and how many is sold (stored in stock)(for backup)
    const updateResponse = await prisma.auksjonsObjekt.update({
        where:{
            id:registerObject.id
        },
        data:{
            currentPriceOre: {increment:moneyMadeOre},
            stock : {increment:+amountSold},
            approved:false,
        }
    })

    //Updating error catch
    if (!updateResponse){
        return false
    }

    //returns money made in ore
    return {moneyMade:updateResponse.currentPriceOre,amountSold:updateResponse.stock}
}