'use server'
import { Prisma } from "@prisma/client"
import style from "./component.module.scss"
import DisplayBid from "./displayBid"


type UserWithAuksjonsObjekter = Prisma.UserGetPayload<{
    include: {
        auksjonsObjekter: {
            include: {
                bids: {
                    orderBy: {
                        price: "desc";
                    };
                    take: 1;
                };
            };
        };
    };
}>;


export async function UserObjectsList({ user }: { user: UserWithAuksjonsObjekter }) {
    const itemList = user.auksjonsObjekter

    if (!itemList || (itemList.length == 0)) {
        return null;
    }

    return (

        <div className={style.listContainer}>
            <h3 className={style.listTitle}>Dine auksjonsobjekter: </h3>
            <div className={style.list}>
                {itemList.map((object, index) => (
                    <DisplayBid
                        key={index}
                        id={object.id}
                        name={object.name}
                        currentPrice={object.bids[0]?.price ?? object.startPrice} 
                        showAsOutbid={!object.approved}>
                    </DisplayBid>
                ))}
            </div>
            {itemList.some(object => !object.approved) && <div className={`${style.explanation} ${style.objectExplanation}`}></div>}
        </div>)
}
