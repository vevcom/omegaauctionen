import {prisma } from "../../prisma";  
import AuctionObject from "./auctionObject";
import { notFound } from "next/navigation";

export default async function AuctionObjectPage({ params }: { params: Promise<{ id?: string }> }) {
    // await createAuctionItem("Lundheim sitt skjegg","Lars Lundheim sitt skjegg",1000,true);
    const { id } = await params;

    if (!id) {
        // This should not be possible.
        return <div><h2>Id for auksjonsobjekt ikke gitt.</h2></div>;
    }
    // Gets id from the URL
    const objectId = parseInt(id, 10);
    
    if (!objectId) return notFound();

    const auctionObject = await prisma.auksjonsObjekt.findUnique({
        where: { id: objectId },
    });
    
    if (!auctionObject) return notFound();

    return <AuctionObject object={auctionObject}/>;
}
