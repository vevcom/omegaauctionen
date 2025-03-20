"use server"
import getUserID from "@/app/api/auth/getUserId";
import { prisma } from "@/app/prisma";
import { AuksjonsObjekt, AuksjonsObjektType } from "@prisma/client";

export default async function placeBid(object: AuksjonsObjekt, bidAmountInOre: number) {
  const AuctionObjectPriceCheck = await prisma.auksjonsObjekt.findFirst({
    where: {
      id: object.id
    },
    select: {
      currentPriceOre: true,
    }
  })
  if (!AuctionObjectPriceCheck) {
    return "Finner ikke auksjons objektet";
  }
  if (AuctionObjectPriceCheck.currentPriceOre >= bidAmountInOre) {
    return "Beklager men det ser ut som noen har byd samtidig som deg og høyre";
  }

  const userID = await getUserID()
  if (!userID) {
    return "kunne ikke hente bruker";
  }


  //edge case catch for time
  const now = new Date()
  const openingDate = new Date("2025-03-20T11:00:00.000Z")
  const currentSaleTime = object.currentSaleTime
  // if (now > currentSaleTime) {
  //   return "Budrunden er over"
  // }
  // if (now < openingDate) {
  //   return "Budrunden har ikke startet"
  // }

  const finalSaleTime = object.finalSaleTime
  const newTime = new Date(now.getTime() + 5 * 1000 * 60)

  let newTimeToSet = currentSaleTime;

  if (newTime > currentSaleTime) {
    newTimeToSet = newTime
    if (newTime > finalSaleTime) {
      newTimeToSet = finalSaleTime
    }
  }



  await prisma.bid.create({
    data: {
      priceOre: bidAmountInOre,
      bidder: {
        connect: { id: userID }
      },
      auctionObject: {
        connect: { id: object.id }
      }
    }
  })

  await prisma.auksjonsObjekt.update({
    where: {
      id: object.id,
    },
    data: {
      currentPriceOre: bidAmountInOre,
      currentSaleTime: newTimeToSet,
    }
  })
  return "Ditt bud er plassert"
}