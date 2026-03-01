"use server"

import getUserID from "../api/auth/getUserId"
import { prisma } from "../prisma";
import { auctionFinalEnd, isAuctionEnded, timeAsText } from "../timeCheck/timeCheck";
import style from "./page.module.scss"
async function getUserSold() {
    const userID = await getUserID()
    if (!userID) return;
    const date = new Date(Date.now())
    const bids = await prisma.auksjonsObjekt.findMany({
        where: {
            authorId: userID,
            currentSaleTime: {
                lt: date
            },
        },
        select: {
            bids: {
                take: 1,
                orderBy: {
                    price: "desc",
                },
                select: {
                    price: true,
                    bidder: {
                        select: {
                            email: true,
                            name: true,
                        }
                    }
                }
            },
            name: true,
        }
    }
    )
    return bids.map((item) => {
        const bid = item.bids.at(0)
        if (!bid) return { itemName: item.name, price: 0, bidderEmail: "INGEN BUD", bidderName: "INGEN BUD" };
        return {
            itemName: item.name,
            price: bid.price,
            bidderName: bid.bidder.name,
            bidderEmail: bid.bidder.email,

        }
    }
    )

}



export default async function UserSoldPanel() {
    if (!isAuctionEnded()){
        return(
            <div className={style.debtTable}>
                <h3>Her kommer hvem som har kjøpt det du selger når auksjonen er ferdig kl {timeAsText(auctionFinalEnd)}</h3>
            </div>
        )
    }

    const userSoldItems = await getUserSold()
    
    if(!userSoldItems){
        return(
            <div className={style.debtTable}>
                <h3>Auksjonen er over. Ser ut som ingen har kjøpt det du la ut. Mener du dette er feil? Send mail til Vevcom</h3>
            </div>
        )
    } 


    return (
        <div className={style.debtTable}>

            <table>
                <thead>
                    <tr>
                        <th>Objekt</th>
                        <th>Pris</th>
                        <th>Kjøpt av</th>
                        <th>Mail</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userSoldItems.map((item) => <tr>
                            <td>{item.itemName}</td>
                            <td align="right">{(item.price).toString() + " kr"}</td>
                            <td>{item.bidderName}</td>
                            <td>{item.bidderEmail}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )

}