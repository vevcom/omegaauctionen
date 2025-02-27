'use server'
import style from "./page.module.scss"
import styleC from "./component.module.scss"
import getUserID from "../api/auth/getUserId";

import { useEffect, useState } from "react";
import getUser from "../api/auth/getUser";
import { useSession } from "next-auth/react";
import { SignoutButton } from "./signout_button";
import { AuctionList } from "./auctionList";
import { AuksjonsObjekt, Prisma, User } from "@prisma/client"


type UserWithAuksjonsObjekter = Prisma.UserGetPayload<{
    include: {auksjonsObjekter: true}
}>

const defaultObjects = {
    id: 1,
    description: "Eksempel description",
    name: "Objekt default 1",
    finalSaleTime: new Date(),
    currentSaleTime: new Date(),
    startPriceOre: 2, 
    autorId: null,
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
}



export default async function UserPageAesthetic() {
    // const { data: session, status } = useSession()
    let user = await getUser()
    if (!user) {
        user = defaultUser
        

    }

    //FINN UT HVORDAN Å KOMBINERE ASYNC FUNCTION, OG USE CLIENT + CLASS COMPONENTS (BUTTON, OSV)

    return (
        <div><center>
        {/* Sett inn profilbilde, rounded, tilfeldig valgt. */}
        <br></br><p><b>Brukernavn: </b>{user?.id}</p><br></br>
        <p><b>Email: </b>{user?.email}</p><br></br>
        <br></br>
        <AuctionList user={user}></AuctionList>
        {/* <p><b>Dine auksjonsobjekter: </b></p>
        <ul className={styleC.list}>
            <li>Objekt_1 (lenke)</li>
            <li>Objekt_2 (lenke)</li>

        </ul> */}
        
        <br></br><br></br>

        <b><p>Auksjonsobjekter du har vunnet: </p></b>
        {/* typescript map array for å formatere lenke til hvert auksjonsobjekt */}
        <ul className={styleC.list}>
            <li>Objekt_1 (lenke)</li>
            <li>Objekt_2 (lenke)</li>

        </ul>
        <br></br><br></br><br></br>
        {/* <img src="https://static.vecteezy.com/system/resources/previews/036/656/372/non_2x/omega-free-vector.png" width="200" height="200"></img><br></br>
         */}
        <br></br><p><b>Din status:</b> </p><br></br>
    
        <br></br><br></br><br></br>
        <SignoutButton></SignoutButton>

        </center></div>
        
    
    );

}