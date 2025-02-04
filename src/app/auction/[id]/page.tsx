import { prisma } from "../../prisma";  
import AuctionObject from "./auctionObject";

interface AuctionObjectType {
    id: number;
    name: string;
    description: string;
    startPriceOre: number;
    finalSaleTime: string;
    currentSaleTime: string;
    approved: boolean;
    author: string;
    authorId: number;
    bids: any[];
}

export default async function AuctionPage({ params }: { params: { id: string } }) {

    const objectId = parseInt(params.id, 10);


    const auctionObject = await prisma.auksjonsObjekt.findUnique({
        where: { id: objectId },
    });

    if (!auctionObject) {
        return <div>Object not found</div>;
    }

    return (
        <div>
            <AuctionObject object={auctionObject}/>
        </div>
    );
}
