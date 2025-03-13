"use server"
import { prisma } from "../prisma"
import style from "./component.module.scss"
import { Bid, User, AuksjonsObjekt} from "@prisma/client"


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
    if (!userwithlist || userwithlist.bids.length<1) {
        return <div><h3 className={style.listTitle}>Dine bud: </h3>
        <div className={style.list}>
        <a href="#"><div className={style.item}>Objekt 1</div></a>
        <a href="#"><div className={style.item}>Objekt 2</div></a>
            </div></div>;
    }


    return <div>
        <h3 className={style.listTitle}>Dine bud: </h3>
        {/* typescript map array for å formatere lenke til hvert auksjonsobjekt */}
        <div className={style.list}>
        
            {
                userwithlist.bids.map((bid,index) => (
                    <a href={"auction/"+bid.auctionObject.id}><div className={style.item} key={index}>{bid.auctionObject.name}</div></a>
                ))
            }
        </div>
    </div>
}

