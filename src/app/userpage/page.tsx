'use server'
import style from "./page.module.scss"

import { redirect } from "next/navigation";
import getUser from "../api/auth/getUser";
import { SignoutButton } from "./signout_button";
import { UserObjectsList } from "./userObjects";
import { AuksjonsObjekt, AuksjonsObjektType, Committee, Prisma, Study, User } from "@prisma/client"
import UserBids from "./userBids";


type UserWithAuksjonsObjekter = Prisma.UserGetPayload<{
    include: {auksjonsObjekter: true}
}>

const defaultObjects = {
    id: 1,
    description: "Eksempel description",
    name: "THE object",
    committee: Committee.NOTCOM,
    type: AuksjonsObjektType.AUKSJON,
    finalSaleTime: new Date(),
    currentSaleTime: new Date(),
    startPriceOre: 2, 
    currentPriceOre: 100,
    stock:1,
    authorId: null,
    imageName: "imgname",
    approved: true,
}

const defaultUser = {
    id: "1",
    name: "Kappe Mand",
    email: "kappe@omega.ntnu.no",
    emailVerified: null,
    image: null,
    isAdmin: true,
    auksjonsObjekter: [defaultObjects],
    // auksjonsObjekter: [],
    studyCourse: Study.ELSYS,
    bids: [],
}



export default async function UserPageAesthetic() {
    let user = await getUser()
    if (!user) {
        user = defaultUser;
        // TODO: REMOVE DEFAULT USER BEFORE FINAL RELEASE
        // redirect("api/auth/signin");
    }


    return (<>
        <div className={style.welcome}>Velkommen,<br></br> <div className={style.name}>{user?.name}</div></div>
        <hr></hr>
        <div className={style.auctionListContainer}>
                <UserObjectsList user={user}></UserObjectsList>
        
                <UserBids userId={user.id}></UserBids>
        </div>

        {/* <div><b>Email: </b>{user?.email}</div> */}
        {/* <img src="https://static.vecteezy.com/system/resources/previews/036/656/372/non_2x/omega-free-vector.png" width="200" height="200"></img><br></br>
         */}
    
        <SignoutButton></SignoutButton>

        </>
        
    
    );

}