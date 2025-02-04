import { prisma } from '@/app/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { Bid } from '@prisma/client';

export const GET = async (objectId:number) => {
  const object = await prisma.auksjonsObjekt.findUnique({
    where: { id: objectId },
    select:{
      name:true,
      description:true,
      bids:true,
      approved:true}
});

  if (object==null || !object.approved) {
    return NextResponse.json({ data:null },{ status:500 });
  }
  else {
    return NextResponse.json({ data: object },{ status:200 });
  }
};

export const POST = async (request: NextRequest) => {
  const {bidAmount,objectId} = await request.json();

  if (!bidAmount || !objectId) {
    return NextResponse.json({ error: "Invalid bid data." }, { status: 400 });
  }

  const auctionObject = await prisma.auksjonsObjekt.findUnique({
    where: { id: objectId },
    select:{bids:true}
  });

  if (!auctionObject) {
    return NextResponse.json({ error: "Auction object not found." }, { status: 404 });
  }


  if (bidAmount <= auctionObject.bids) {
    return NextResponse.json({ error: "Bid must be higher than current price." }, { status: 400 });
  }

  //Create new bid with price, User, UserId, auctionObject and auctonObjectId, add to auctionObject Bids[]

  const newBid: Bid = await prisma.bid.create({

    priceOre:bidAmount,   
    bidder User @relation(fields: [bidderId],references: [id]),
    bidderId String,
    
    auksjonsObjekt: auctionObject,
    auctionItemId: objectId
  })

  const updatedObject = await prisma.auksjonsObjekt.update({
    where: { id: objectId },
    data: {
      currentSaleTime: new Date(), // Update current sale time with bid time

    },
  });

  return NextResponse.json({ message: "Bid placed successfully!" });
} catch (error) {
  console.error("Error processing bid:", error);
  return NextResponse.json({ error: "Failed to place bid." }, { status: 500 });
};