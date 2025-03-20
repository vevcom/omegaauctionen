"use server"

import { prisma } from "@/app/prisma"
import { AuksjonsObjektType } from "@prisma/client"


function sortDictByValue(dict:{[key:string]:number}) {
    return Object.keys(dict)
      .sort((a, b) => dict[b] - dict[a])
      .reduce((acc:{[key:string]:number}, key) => {
        acc[key] = dict[key];
        return acc;
      }, {});
  }

export default async function get_biggest_spenders() {
    const topThreeBiggestSpenders:{name:string,spent:number}[] =[]
    const biggestSpenders:{[key:string]:number} ={}

    const biggestSpenderData = await prisma.auksjonsObjekt.findMany({
        where:{
            approved:true,
            type:AuksjonsObjektType.AUKSJON
        },
        select:{
            bids:{
                orderBy:{
                    priceOre:"desc",
                },
                take:1,
                select:{
                    priceOre:true,
                    bidder:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })


    for (let i = 0; i < biggestSpenderData.length; i++) {
        const data = biggestSpenderData[i]
        if (!data) { continue; }
        if (!data.bids[0]||!data.bids[0].bidder.name||!data.bids[0].priceOre) { continue; }
        const currentBidPrice = data.bids[0].priceOre
        const currentBidder = data.bids[0].bidder.name
        if (!biggestSpenders[currentBidder]){
            biggestSpenders[currentBidder] = currentBidPrice
        }
        else {
            biggestSpenders[currentBidder] += currentBidPrice
        }
    }


    const capeData = await prisma.auksjonsObjekt.findMany({
        where:{
            approved:true,
            type:AuksjonsObjektType.SALG
        },
        select:{
            bids:{
                select:{
                    priceOre:true,
                    bidder:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })



    for (let i = 0; i < capeData.length; i++) {
        const data = capeData[i]
        if (!data) { continue; }
        if (!data.bids[i]||!data.bids[i].bidder.name||!data.bids[i].priceOre) { continue; }
        const currentBidPrice = data.bids[i].priceOre
        const currentBidder = data.bids[i].bidder.name
        if (!biggestSpenders[currentBidder]){
            biggestSpenders[currentBidder] = currentBidPrice
        }
        else {
            biggestSpenders[currentBidder] += currentBidPrice
        }
    }


    const biggestSpendersSorted = sortDictByValue(biggestSpenders)
    for(let i = 0;i<3;i++){
        const personNameByIndex = Object.keys(biggestSpendersSorted)[i]
        const formattedPerson = {name:personNameByIndex,spent:biggestSpendersSorted[personNameByIndex]}
        topThreeBiggestSpenders.push(formattedPerson)
    }
    return topThreeBiggestSpenders
}