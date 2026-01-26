'use server'
import style from "./page.module.scss"

import { redirect } from "next/navigation";
import getUser from "../api/auth/getUser";
import { SignoutButton } from "./signoutButton";
import { UserObjectsList } from "./userObjects";
import { AuksjonsObjektType, Committee, Prisma, Study } from "@prisma/client"
import UserBids from "./userBids";
import get_total_debt_user from "../components/get_user_pay_amount/get_user_pay_amount";



export default async function UserPageAesthetic() {
    const user = await getUser()
    if (!user) {
        // user = defaultUser;
        // TODO: REMOVE DEFAULT USER BEFORE FINAL RELEASE
        redirect("api/auth/signin");
    }
    const userDebtData = await get_total_debt_user(user.name)

    return (<>
        <div className={style.welcome}>Velkommen,<br></br> <div className={style.name}>{user?.name}</div></div>
        <hr></hr>
        <div>   
            <div className={style.auctionListContainer}>
                <UserObjectsList user={user}></UserObjectsList>

                <UserBids userId={user.id}></UserBids>
            </div>
            <div className={style.debtTable}>
                <p>{"Din e-post: " + userDebtData?.email}</p>
                <p>Skylder totalt: <b>{((userDebtData?.totalDebt ?? 0)).toString() + " kr"}</b></p>
                <p>Vipps nummer: <b>668205</b></p>
                <p><b>NB:</b>Du må selv kontakte de du må for å få det du har vunnet</p>
                <table>
                    <thead>
                        <tr>
                            <th>Objekt</th>
                            <th>Pris</th>
                            <th>Ansvarlig</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        userDebtData?.wonObjects.map((object) => <tr>
                            <td>{object.objectName}</td>
                            <td align="right">{(object.price).toString() + " kr"}</td>
                            <td>{object.committee ? <><i>Komité: </i> {object.committee}<br /> <i>Ansvarlig: </i> {object.authorName}</> : object.authorEmail + " - " + object.authorName}</td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <SignoutButton></SignoutButton>
        </div>
        </>
        
    
    );

}