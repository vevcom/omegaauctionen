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

  return "Ditt bud er plassert"
}