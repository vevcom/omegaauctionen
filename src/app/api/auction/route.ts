import { prisma } from '@/app/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { Bid,User } from '@prisma/client';
import getUser from '../auth/getUser';

export async function GET (objectId:number) {
  
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
  
export async function POST (request: NextRequest) {

  const {bidAmount,objectId} = await request.json();
  // console.log("Received data: ",request.json());

  if (!bidAmount || !objectId) {
  return NextResponse.json({ error: "Invalid bid data." },{status:400});
  }

  const auctionObject = await prisma.auksjonsObjekt.findUnique({
    where: { id: objectId },
    select:{
      id:true,
      bids:true,
      currentPriceOre:true,
    }
  });
  if (!auctionObject) {
    
    return NextResponse.json({ error: "Auction object not found." }, { status: 404 });
  }
  
  
  if (bidAmount <= auctionObject.currentPriceOre) {
    return NextResponse.json({ error: "Bid must be higher than current price." }, { status: 400 });
  }

  //Create new bid with price, UserId and auctonObjectId, add to auctionObject Bids[]
  const currentUser = await getUser();

  if (!currentUser) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }


  const newBid: Bid = await prisma.bid.create({
    data: {
      priceOre:bidAmount,
      bidderId: currentUser.id,
      auctionItemId: auctionObject.id
    }
  })

  const updatedObject = await prisma.auksjonsObjekt.update({
    where: { id: objectId },
    data: {
      currentSaleTime: new Date(),
      currentPriceOre:bidAmount,
      bids:{connect:[{bidId:newBid.bidId}]},

    },
  });

  return NextResponse.json({ message: "Bid placed successfully!" },{status:200});
} 