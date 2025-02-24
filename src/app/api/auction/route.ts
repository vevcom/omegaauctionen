import { prisma } from '@/app/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { Bid,User } from '@prisma/client';
import getUser from '../auth/getUser';

export async function GET (objectId:number) {
  /*GET-function to get certain fields of object based on object-id*/ 
  
  const object = await prisma.auksjonsObjekt.findUnique({
    where: { id: objectId },
    select:{
      name:true,
      description:true,
      bids:true,
      approved:true}
    });
    
    // 404 if no matching object found (not found)
    if (object==null) {
      return NextResponse.json({ data:null },{ status:404 });
    }
    // 403 Error if object is not approved to be displayed (forbidden call)
    else if (!object.approved) {
      return NextResponse.json({data: null},{status:403});
    }
    // 200 if successfull GET (success)
    else {
      return NextResponse.json({ data: object },{ status:200 });
    }
  };
  
export async function POST (request: NextRequest) {
  /*POST-function to place bid on a given auksjonsObjekt.
  Receives bidAmount and objectId corresponding to given auksjonsObjekt*/

  const {bidAmount,objectId} = await request.json();

  // 400 Error if missing data or wrong template in POST request
  if (!bidAmount || !objectId) {
  return NextResponse.json({ error: "Missing or invalid bid data." },{status:400});
  }

  // DB-call to find auksjonsObjekt matching objectId
  const auctionObject = await prisma.auksjonsObjekt.findUnique({
    where: { id: objectId },
    select:{
      id:true,
      bids:true,
      currentPriceOre:true,
    }
  });
  
  // 404 Error if no matching auctionObject at provided ID
  if (!auctionObject) {
    return NextResponse.json({ error: 'Auction object not found. id:${objectId}' }, { status: 404 });
  }
  
  // 422 Error if bid too low (correct syntax, but unprocessable bid)
  if (bidAmount <= auctionObject.currentPriceOre) {
    return NextResponse.json({ error: "Bid must be higher than current price." }, { status: 422 });
  }
  
  // Create new bid with price, UserId and auctonObjectId, add to auctionObject Bids[]

  const currentUser = await getUser();
  
  // 401 Error if unauthenicated user or user not found
  if (!currentUser) {
    return NextResponse.json({ error: "User not found or not authenticated" }, { status: 401 });
  }

  const newBid: Bid = await prisma.bid.create({
    data: {
      priceOre:bidAmount,
      bidderId: currentUser.id,
      auctionItemId: auctionObject.id
    }
  });

  const updatedObject = await prisma.auksjonsObjekt.update({
    where: { id: objectId },
    data: {
      currentSaleTime: new Date(),
      currentPriceOre:bidAmount,
      bids:{connect:[{bidId:newBid.bidId}]},

    },
  });

  // 200 status if POST successfull
  return NextResponse.json({ message: "Bid placed successfully!" },{status:200});
} 