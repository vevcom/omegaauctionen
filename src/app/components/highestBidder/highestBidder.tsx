"use client"
import style from "./component.module.scss"
import { useEffect, useState } from "react";
import { getHighestBid } from "./getHighestBid";


//Highest Bidder for object page

export default function HighestBidder({objectId}:{objectId:number}) {
    const [highestBid,setHighestBid]=useState<any>(null);

    useEffect(() => {
        async function fetchBid() {
            const bid = await getHighestBid(objectId);
            setHighestBid(bid);
        }
        fetchBid();
        
    },[objectId])
    
    if (!highestBid) {return null;}

    return <div className={style.highestBidContainer}>
        <hr className={style.separator}></hr>
        <div>Høyeste bud:</div>
        <div className={style.bidContainer}><div>{highestBid.bidder.name}</div><div>{highestBid.bidDate.toLocaleTimeString()}</div><div>{highestBid.priceOre/100} kr</div></div>
        <hr className={style.separator}></hr>
    </div>
    
}