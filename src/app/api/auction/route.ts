import { prisma } from '@/app/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { Bid,User } from '@prisma/client';
import getUser from '../auth/getUser';

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

  const currentUser = await getUser();

  if (!currentUser) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }


  const newBid: Bid = await prisma.bid.create({

    priceOre:bidAmount,   
    bidder: currentUser,
    bidderId: currentUser.id,
    
    auctionObject: auctionObject,
    auctionItemId: objectId
  })

  const updatedObject = await prisma.auksjonsObjekt.update({
    where: { id: objectId },
    data: {
      currentSaleTime: new Date(), // Update current sale time with bid time

    },
  });

  return NextResponse.json({ message: "Bid placed successfully!" });
} 