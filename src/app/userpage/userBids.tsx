"use server"
import { get_current_price } from "@/services/auctionObject/actions"
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
                    price: "desc"
                },
                take: 1,
                select: {
                    price: true,
                }

            },
            id: true,
            name: true,
        }
    })
    // await prisma.$disconnect();
    let userwithlist: {
        bids: {
            price: number;
            auctionObject: {
                id: number;
                name: string;
                price: number;
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
            if (!auctionObjectData.bids || !auctionObjectData.bids[0] || !auctionObjectData.bids[0].price) { continue; }
            const userBidPrice = auctionObjectData.bids[0].price
            const currentItemPrice = await get_current_price(auctionObjectData.id)
            if (currentItemPrice === undefined){continue}
            const transformedBid = {
                price: userBidPrice,
                auctionObject: {
                    id: auctionObjectData.id,
                    name: auctionObjectData.name,
                    price: currentItemPrice,
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
            <h3 className={style.listTitle}>Du har bydd på: </h3>
            <p className={style.listTitle}><i>Ingen ting enda...</i></p>
        </div>
    }

    const registered: number[] = [];
    return <div className={style.listContainer}>
        <h3 className={style.listTitle}>Du har bydd på: </h3>
        <div className={style.list}>

            {
                userwithlist.bids.map((bid, index) => {
                    if (registered.includes(bid.auctionObject.id)) {
                        return null;
                    }
                    registered.push(bid.auctionObject.id);
                    return (<DisplayBid key={index} id={bid.auctionObject.id} name={bid.auctionObject.name} price={bid.price} currentPrice={bid.auctionObject.price}></DisplayBid>);
                })
            }
        </div>
        {userwithlist.bids.some(bid => bid.price < bid.auctionObject.price) && <div className={`${style.explanation} ${style.bidExplanation}`}></div>}

    </div>
}

