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
    const topTenBiggestSpenders:{name:string,spent:number}[] =[]
    const biggestSpenders:{[key:string]:number} ={}

    const biggestSpenderData = await prisma.auksjonsObjekt.findMany({
        where:{
            approved:true,
            type:AuksjonsObjektType.AUKSJON
        },
        select:{
            bids:{
                orderBy:{
                    price:"desc",
                },
                take:1,
                select:{
                    price:true,
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
        if (!data.bids[0]||!data.bids[0].bidder.name||!data.bids[0].price) { continue; }
        const currentBidPrice = data.bids[0].price
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
                    price:true,
                    bidder:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })



    const liveBud = await prisma.auksjonsObjekt.findFirst({
        where:{
            name:"DO_NOT_APPROVE_LIVE_BIDS",
            approved:false,
        },
        select:{
            bids:{
                select:{
                    price:true,
                    bidder:{
                        select:{
                            name:true
                        }
                    }
                }
            },
    
        }
    })

    if (liveBud?.bids){
        liveBud.bids.forEach((bid) => {
            const bidderName = bid.bidder.name
            const biddingPrice = bid.price
    
            // Legger sammen nåverende sum for en bruker og prisen til budet
            // Hvis brukeren ikke har noe sum fra før av bruk 0
            biggestSpenders[bidderName] = (biggestSpenders[bidderName] ?? 0) + biddingPrice
        })
    }

    for (let i = 0; i < capeData.length; i++) {
        const data = capeData[i]
        if (!data) { continue; }
        if (!data.bids[i]||!data.bids[i].bidder.name||!data.bids[i].price) { continue; }
        const currentBidPrice = data.bids[i].price
        const currentBidder = data.bids[i].bidder.name
        if (!biggestSpenders[currentBidder]){
            biggestSpenders[currentBidder] = currentBidPrice
        }
        else {
            biggestSpenders[currentBidder] += currentBidPrice
        }
    }


    const biggestSpendersSorted = sortDictByValue(biggestSpenders)
    for(let i = 0;i<10;i++){
        const personNameByIndex = Object.keys(biggestSpendersSorted)[i]
        const formattedPerson = {name:personNameByIndex,spent:biggestSpendersSorted[personNameByIndex]}
        topTenBiggestSpenders.push(formattedPerson)
    }
    return topTenBiggestSpenders
}