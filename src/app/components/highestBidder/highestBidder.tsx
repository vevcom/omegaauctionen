"use client"
import style from "./component.module.scss"
import { useEffect, useState } from "react";
import { getHighestBid } from "./getHighestBid";


//Highest Bidder for object page

export default function HighestBidder({ objectId, reload }: { objectId: number, reload: boolean }) {
    const [highestBid, setHighestBid] = useState<{
        bidDate: Date;
        priceOre: number;
        bidder: {
            name: string;
        };
    }[] | null>(null);

    useEffect(() => {
        async function fetchBid() {
            const bid = await getHighestBid(objectId);
            console.log("Fetched highest bid:", bid);
            if (bid) {
                setHighestBid(bid);
            }
            console.log("Reload triggered:", reload);
        }
        fetchBid();
    }, [reload]);
    console.log(highestBid)
    if (!highestBid) { return null; }

    return (
        <div className={style.highestBidContainer}>
            <hr className={style.separator}></hr>
            <h1 className={style.title}>Høyeste bud:</h1>
            {highestBid.map((data, index) => (
                <div key={index} className={style.bidContainer}>
                    <div>Bud: {data.priceOre / 100} kr</div>
                    <div>Navn: {data.bidder.name}</div>
                    <div>Bud tid: {new Date(data.bidDate).toLocaleTimeString('en-GB')}</div> 
                </div>
            ))}
            <hr className={style.separator}></hr>
        </div>
    );

}