"use server"
import getUserID from "@/app/api/auth/getUserId";
import { prisma } from "@/app/prisma";
import { get_current_price } from "@/services/auctionObject/actions";
import { AuksjonsObjekt } from "@/generated/client"
import { auctionStart, isAuctionOpenForItem, isAuctionStarted } from "@/app/timeCheck/timeCheck";

export default async function placeBid(object: AuksjonsObjekt, bidAmount: number) {
  const AuctionObjectPriceCheck = await get_current_price(object.id)
  if (!AuctionObjectPriceCheck) {
    return "Finner ikke auksjons objektet";
  }
  if (AuctionObjectPriceCheck >= bidAmount) {
    return "Beklager men det ser ut som noen har byd samtidig som deg og høyre";
  }

  const userID = await getUserID()
  if (!userID) {
    return "kunne ikke hente bruker";
  }


  //edge case catch for time
  const currentSaleTime = object.currentSaleTime
  if (!isAuctionOpenForItem(object)) {
    return "Budrunden er over"
  }
  if (!isAuctionStarted()) {
    return "Budrunden har ikke startet"
  }

  const finalSaleTime = object.finalSaleTime
  const newTime = new Date(Date.now() + 5 * 60 *1000)

  let newTimeToSet = currentSaleTime;

  if (newTime > currentSaleTime) {
    newTimeToSet = newTime
    if (newTime > finalSaleTime) {
      newTimeToSet = finalSaleTime
    }
  }



  await prisma.bid.create({
    data: {
      price: bidAmount,
      bidder: {
        connect: { id: userID }
      },
      auctionObject: {
        connect: { id: object.id }
      },
    }
  })

  await prisma.auksjonsObjekt.update({
    where: {
      id: object.id,
    },
    data: {
      currentSaleTime: newTimeToSet,
    }
  })
  return "Ditt bud er plassert"
}