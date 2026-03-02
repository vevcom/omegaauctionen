'use server'
import style from "./page.module.scss"

import { redirect } from "next/navigation";
import getUser from "../api/auth/getUser";
import { SignoutButton } from "./signoutButton";
import { UserObjectsList } from "./userObjects";
import UserBids from "./userBids";
import get_total_debt_user from "../components/get_user_pay_amount/get_user_pay_amount";
import UserSoldPanel from "./userSold";
import { auctionFinalEnd, auctionNormalEnd, timeAsText } from "../timeCheck/timeCheck";
import { AuksjonsObjekt } from "@/generated/client";
import { prisma } from "../prisma";



async function DevDebugPanel({ auksjonsObjekter }: { auksjonsObjekter: AuksjonsObjekt[] }) {//This is needed for live debugging because of oddities in prisma and time zones.
    const testObject = await prisma.auksjonsObjekt.create({
        data:{
            name:"TEST",
            description:"TEST",
            startPrice:0,
        }
    })

    const resultNormal = (testObject.currentSaleTime.toTimeString()==auctionNormalEnd.toTimeString())
    const resultFinal = (testObject.finalSaleTime.toTimeString()==auctionFinalEnd.toTimeString())
    await prisma.auksjonsObjekt.delete({
        where:{
            id:testObject.id
        }
    })
    return (
        <div>
            <p>Normal and final end:</p>
            <p>{timeAsText(auctionNormalEnd)}</p>
            <p>{timeAsText(auctionFinalEnd)}</p>
            <p>DB Normal final</p>
            <p>{timeAsText(testObject.currentSaleTime)}</p>
            <p>{timeAsText(testObject.finalSaleTime)}</p>
            <p>Normal test: {resultNormal ? "Pass" : "Fail"}</p>
            <p>Final test: {resultFinal ? "Pass" : "Fail"}</p>
            <p>Item end time</p>
            <p>------</p>
            {auksjonsObjekter.map((item, index) => (
                <div key={index}>
                    <p>{index}</p>
                    <p> {timeAsText(item.currentSaleTime)}</p>
                    <p>{timeAsText(item.finalSaleTime)}</p>
                    <p>------</p>
                </div>
            ))
            }

        </div>
    )
}

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
            {
                user.auksjonsObjekter.length === 0
                    ?
                    null
                    :
                    <UserSoldPanel></UserSoldPanel>

            }
            <SignoutButton></SignoutButton>
            {user.isAdmin ? <DevDebugPanel auksjonsObjekter={user.auksjonsObjekter}></DevDebugPanel> : null}
        </div>
    </>


    );

}