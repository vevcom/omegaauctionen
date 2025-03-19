"use server"
import { prisma } from "../prisma"
import style from "./component.module.scss"
import DisplayBid from "./displayBid"


export default async function UserBids({ userId }: { userId: string }) {
    const bidsFromUser = await prisma.auksjonsObjekt.findMany({
        where: {
            approved: true,
        },
        select: {
            bids: {
                where: {
                    bidderId: userId,
                },
                orderBy: {
                    priceOre: "desc"
                },
                take: 1,
                select: {
                    priceOre: true,
                }

            },
            id: true,
            name: true,
            currentPriceOre: true,
        }
    })
    // await prisma.$disconnect();
    let userwithlist: {
        bids: {
            priceOre: number;
            auctionObject: {
                id: number;
                name: string;
                currentPriceOre: number;
            };
        }[];
    } | null = { bids: [] }

    if (!bidsFromUser) {
        // userwithlist = null
        userwithlist = { bids: [] }
    }
    else {

        for (let i = 0; i < bidsFromUser.length; i++) {
            const auctionObjectData = bidsFromUser[i];
            // if (!auctionObjectData) { continue; }
            if (!auctionObjectData.bids || !auctionObjectData.bids[0] || !auctionObjectData.bids[0].priceOre) { continue; }
            const userBidPrice = auctionObjectData.bids[0].priceOre
            const transformedBid = {
                priceOre: userBidPrice,
                auctionObject: {
                    id: auctionObjectData.id,
                    name: auctionObjectData.name,
                    currentPriceOre: auctionObjectData.currentPriceOre,
                }
            }
            userwithlist.bids.push(transformedBid)
        }
        if (userwithlist.bids.length===0){
            userwithlist = null
        }
    }

    if (!userwithlist || userwithlist.bids.length < 1) {
        return <div className={style.listContainer}>
            <h3 className={style.listTitle}>Du har bydd på: </h3></div>
        return <div className={style.listContainer}>
            <h3 className={style.listTitle}>Du har bydd på: </h3>
            <div className={style.list}>
                <DisplayBid key={1} id={1} name={"Lars Lundheim sitt skjegg"} price={6942} currentPrice={6942}></DisplayBid>
                <DisplayBid key={2} id={1} name={"Lars Lundheim sitt skjegg"} price={420690} currentPrice={694920}></DisplayBid>
                <DisplayBid key={3} id={1} name={"Objekt 3"} price={1200} currentPrice={6942}></DisplayBid>
                <DisplayBid key={4} id={1} name={"Objekt 4"} price={5700} currentPrice={6942}></DisplayBid>
                <DisplayBid key={5} id={1} name={"Objekt 5"} price={5700} currentPrice={5700}></DisplayBid>
                <DisplayBid key={6} id={1} name={"Objekt 6"} price={4200} currentPrice={4200}></DisplayBid>

            </div>
            <div className={style.explanation}></div>
        </div>;
    }

    let registered: number[] = [];
    return <div className={style.listContainer}>
        <h3 className={style.listTitle}>Du har bydd på: </h3>
        <div className={style.list}>

            {
                userwithlist.bids.map((bid, index) => {
                    if (registered.includes(bid.auctionObject.id)) {
                        return null;
                    }
                    registered.push(bid.auctionObject.id);
                    return (<DisplayBid key={index} id={bid.auctionObject.id} name={bid.auctionObject.name} price={bid.priceOre} currentPrice={bid.auctionObject.currentPriceOre}></DisplayBid>);
                })
            }
        </div>
        <div className={style.explanation}></div>

    </div>
}

