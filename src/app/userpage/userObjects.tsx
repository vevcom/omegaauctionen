'use server'
import { Prisma } from "@prisma/client"
import style from "./component.module.scss"
import DisplayBid from "./displayBid"


type UserWithAuksjonsObjekter = Prisma.UserGetPayload<{
    include: {auksjonsObjekter: true}
}>

export async function UserObjectsList({user} : {user: UserWithAuksjonsObjekter}) {
    let itemList = user.auksjonsObjekter

    if (!itemList || (itemList.length == 0)) {
        return null;
        return (<div>Du har ingen auksjonsobjekter...</div>)
    }

    return(
    
    <div className={style.listContainer}>
        <h3 className={style.listTitle}>Dine auksjonsobjekter: </h3>
        <div className={style.list}>
            {itemList.map((object,index) => (
                <DisplayBid key={index} id={object.id} name={object.name} currentPrice={object.currentPriceOre}></DisplayBid>
            ))}
        </div>
    </div>)
}
