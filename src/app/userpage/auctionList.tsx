'use server'
import { AuksjonsObjekt, Prisma, User } from "@prisma/client"


import styleC from "./component.module.scss"

type UserWithAuksjonsObjekter = Prisma.UserGetPayload<{
    include: {auksjonsObjekter: true}
}>

export async function AuctionList({user} : {user: UserWithAuksjonsObjekter}) {
    let itemList = user.auksjonsObjekter

    if (!itemList || (itemList.length == 0)) {
        return (<div>Du har ingen auksjonsobjekter...</div>)
    }

    let link;

    return(
    
    <div>
    <p><b>Dine auksjonsobjekter: </b></p>
    <ul className={styleC.list}>
            {itemList.map((object, index) => (
                
                <li key={index}><a href={"auction/".concat(object.id.toString())}>{object.name}</a></li>
            ))}

    </ul>
    <li>Objekter burde komme før dette</li>
    <br></br><br></br>
    </div>)
}
