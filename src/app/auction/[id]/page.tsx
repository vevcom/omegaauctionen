"use server"
import {prisma } from "../../prisma";  
import { AuksjonsObjektType,Committee } from "@prisma/client";
import AuctionObject from "./auctionObject";
import { createAuctionItem } from "@/app/examples/components/createAuctionItem";

interface AuctionObjectType {
    id: number;
    name: string;
    description: string;
    startPriceOre: number;
    currentPrice:number;
    finalSaleTime: string;
    currentSaleTime: string;
    approved: boolean;
    author: string;
    authorId: number;
    bids: any[];
    stock: number;
    committee: Committee;
    type: AuksjonsObjektType;
}


export default async function AuctionObjectPage({ params }: { params: { id: string } }) {
    // await createAuctionItem("Lundheim sitt skjegg","Lars Lundheim sitt skjegg",1000,true);
    if (!params || !params.id) {
        return <div><h2>No object ID provided</h2></div>;
    }
    // Gets id from the URL
    const objectId = parseInt(params.id, 10);

    if (isNaN(objectId)) {
        return <div><h2>Invalid object ID</h2></div>;
    }
    
    const auctionObject = await prisma.auksjonsObjekt.findUnique({
        where: { id: objectId },
    });
    await prisma.$disconnect();
    
    //Default object for when db call unsuccessfull
    const defaultAuctionObject = {
        id:3,
        name:"Title",
        description:"Long description",
        startPriceOre:0,
        currentPriceOre:0,
        finalSaleTime: new Date("2025-03-21T00:00:00Z"),
        currentSaleTime: new Date("1970-01-01T00:00:00Z"),
        approved: true,
        imageName: "default.jpg",
        authorId:"0",
        committee: Committee.VEVCOM,
        type: AuksjonsObjektType.AUKSJON,
        stock: 1,
    }


    return (

        <AuctionObject object={auctionObject ? auctionObject : defaultAuctionObject}/>
    );
}
