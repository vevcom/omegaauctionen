'use server'
import { AuksjonsObjekt, Prisma, User } from "@prisma/client"


import style from "./component.module.scss"


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
    
    <div className={style.auctionList}>
    <h3 className={style.listTitle}>Dine auksjonsobjekter: </h3>
    <div className={style.list}>
        {itemList.map((object, index) => (
            <a className={style.itemwrapper} href={"auction/"+object.id}><div className={style.item} key={index}>
                {object.name}
            </div></a>
        ))}
    </div>
    </div>)
}
