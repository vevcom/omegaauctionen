"use server"

import is_admin from "@/app/components/is-admin/is-admin-func"
import { prisma } from "@/app/prisma";
import { StopButton } from "./stopAuctionButton";

export async function stopAuction() {
    const isAdmin = await is_admin()
    if (!isAdmin) return;
    
    const stopDate = new Date("2000-03-05T23:00:00.000")
    await prisma.auksjonsObjekt.updateMany({
        data:{
            currentSaleTime:stopDate,
            finalSaleTime: stopDate,
        }
    })
    
}

export default async function PanicButton() {
    const isAdmin = await is_admin()
    if (!isAdmin) return <p>Ingen tilgang</p>

    return (
        <div>
            <h1>ADVARSEL STENGER HELE AUKSJONEN! setter salgsdatoen slik at ingen flere bud går igjennom</h1>
            <StopButton></StopButton>
        </div>
    )

}

