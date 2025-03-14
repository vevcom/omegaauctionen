"use server"
import { prisma } from "../prisma"
import style from "./component.module.scss"
import { Bid, User, AuksjonsObjekt} from "@prisma/client"
import DisplayBid from "./displayBid"


export default async function UserBids({userId}: {userId: string }) {
    const userwithlist = await prisma.user.findUnique({
        where:{id:userId},
        select:{
            bids: {
            include: {
                auctionObject:{
                    select:{
                        name: true,
                        currentPriceOre: true,
                        id:true,

                    }
                }
            }
        }}
    })
    await prisma.$disconnect();

    if (!userwithlist || userwithlist.bids.length<1) {
        return <div className={style.auctionList}>
            <h3 className={style.listTitle}>Dine bud: </h3>
            <div className={style.list}>
                <DisplayBid id={1} name={"Objekt 1 2 2 2 2 2 2 2 2"} price={6942} currentPrice={6942}></DisplayBid>
                <DisplayBid num={2} id={1} name={"Objekt 2"} price={42069} currentPrice={6942}></DisplayBid>
                <DisplayBid num={3} id={1} name={"Objekt 3"} price={1200} currentPrice={6942}></DisplayBid>
                <DisplayBid num={4} id={1} name={"Objekt 4"} price={5700} currentPrice={6942}></DisplayBid>
                
            </div>
        </div>;
    }

    let registered:number[] = [];
    return <div className={style.auctionList}>
        <h3 className={style.listTitle}>Dine bud: </h3>
        <div className={style.list}>
        
            {
                userwithlist.bids.map((bid,index) => {
                    if (registered.includes(bid.auctionObject.id)) {
                        return null;
                    }
                    registered.push(bid.auctionObject.id);
                    return( <DisplayBid num={4} id={bid.auctionObject.id} name={bid.auctionObject.name} price={bid.priceOre} currentPrice={bid.auctionObject.currentPriceOre}></DisplayBid>);
                })
            }
        </div>
    </div>
}

