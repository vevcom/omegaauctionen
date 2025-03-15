"use server"
import { prisma } from "../prisma"
import style from "./component.module.scss"
import DisplayBid from "./displayBid"


export default async function UserBids({userId}: {userId: string }) {
    const userwithlist = await prisma.user.findUnique({
        where:{id:userId},
        select:{
            bids: {
            select: {
                priceOre:true,
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
        return <div className={style.listContainer}>
            <h3 className={style.listTitle}>Du har bydd på: </h3></div>
        return <div className={style.listContainer}>
            <h3 className={style.listTitle}>Du har bydd på: </h3>
            <div className={style.list}>
                <DisplayBid id={1} name={"Objektttttttttttttttttt 1"} price={6942} currentPrice={6942}></DisplayBid>
                <DisplayBid id={1} name={"Objekt 2"} price={42069} currentPrice={69492}></DisplayBid>
                <DisplayBid id={1} name={"Objekt 3"} price={1200} currentPrice={6942}></DisplayBid>
                <DisplayBid id={1} name={"Objekt 4"} price={5700} currentPrice={6942}></DisplayBid>
                <DisplayBid id={1} name={"Objekt 5"} price={5700} currentPrice={5700}></DisplayBid>
                <DisplayBid id={1} name={"Objekt 6"} price={4200} currentPrice={4200}></DisplayBid>
                
            </div>
            <div className={style.explanation}></div>
        </div>;
    }

    let registered:number[] = [];
    return <div className={style.listContainer}>
        <h3 className={style.listTitle}>Du har bydd på: </h3>
        <div className={style.list}>
        
            {
                userwithlist.bids.map((bid,index) => {
                    if (registered.includes(bid.auctionObject.id)) {
                        return null;
                    }
                    registered.push(bid.auctionObject.id);
                    return( <DisplayBid id={bid.auctionObject.id} name={bid.auctionObject.name} price={bid.priceOre} currentPrice={bid.auctionObject.currentPriceOre}></DisplayBid>);
                })
            }
        </div>
        <div className={style.explanation}></div>

    </div>
}

