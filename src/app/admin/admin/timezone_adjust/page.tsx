"use server"


import is_admin from "@/app/components/is-admin/is-admin-func";
import { prisma } from "@/app/prisma";
import { auctionFinalEnd, auctionNormalEnd, timeAsText } from "@/app/timeCheck/timeCheck";
import { TimeSetPanel } from "./timeSetPanel";

async function DevDebugPanel() {//This is needed for live debugging because of oddities in prisma and time zones.
    const isAdmin = await is_admin()

    if (!isAdmin) return <p>Ingen tilgang</p>

    const testObject = await prisma.auksjonsObjekt.create({
        data: {
            name: "TEST",
            description: "TEST",
            startPrice: 0,
        }
    })

    const resultNormal = (testObject.currentSaleTime.toLocaleString("en-GB") == auctionNormalEnd.toLocaleString("en-GB"))
    const resultFinal = (testObject.finalSaleTime.toLocaleString("en-GB") == auctionFinalEnd.toLocaleString("en-GB"))
    await prisma.auksjonsObjekt.delete({
        where: {
            id: testObject.id
        }
    })

    const uniqueTimes = await getAllUniqueTimes()


    return (
        <div>
            <h1>Sjekker om default tid i DB er lik som i timeCheck.ts. Vurder å gjøre om på DB default hvis testene ikke passerer</h1>
            <p>Normal and final end:</p>
            <p>{timeAsText(auctionNormalEnd)}</p>
            <p>{timeAsText(auctionFinalEnd)}</p>
            <p>DB Normal final</p>
            <p>{timeAsText(testObject.currentSaleTime)}</p>
            <p>{timeAsText(testObject.finalSaleTime)}</p>
            <p>Normal test: {resultNormal ? "Pass" : "Fail"}</p>
            <p>Final test: {resultFinal ? "Pass" : "Fail"}</p>
            <hr></hr>
            <p>Unike tidspunkter som ligger inne</p>
            <h4>Normal</h4>
            {uniqueTimes[0].map((time, index) => (
                <div key={index}>
                    <p><b> {index}</b></p>
                    <p>{time.toLocaleString("en-GB")}</p>
                </div>
            ))}
            <h4>Final</h4>
            {uniqueTimes[1].map((time, index) => (
                <div key={index}>
                    <p><b>{index}</b></p>
                    <p>{time.toLocaleString("en-GB")}</p>
                </div>
            ))}
        </div>
    )
}


export async function setNewTime(newDateTimeNormal: Date, newDateTimeFinal: Date) {
    const isAdmin = await is_admin()

    if (!isAdmin) return;
    await prisma.auksjonsObjekt.updateMany({
        where: {
            approved: true,
        },
        data: {
            currentSaleTime: newDateTimeNormal,
            finalSaleTime: newDateTimeFinal,
        }
    })
}

async function getAllUniqueTimes() {
    const auctionObjectTime = await prisma.auksjonsObjekt.findMany({
        where: {
            approved: true
        },
        select: {
            currentSaleTime: true,
            finalSaleTime: true
        }
    })
    let normalTimes: Date[] = []
    let finalTimes: Date[] = []
    let includedTimesNormal: String[] = []
    let includedTimesFinal: String[] = []

    auctionObjectTime.forEach((item) => {
        if (!includedTimesNormal.includes(item.currentSaleTime.toLocaleString())) {
            includedTimesNormal.push(item.currentSaleTime.toLocaleString())
            normalTimes.push(item.currentSaleTime)
        }
        if (!includedTimesFinal.includes(item.finalSaleTime.toLocaleString())) {
            includedTimesFinal.push(item.finalSaleTime.toLocaleString())
            finalTimes.push(item.finalSaleTime)
        }
    })
    return [normalTimes, finalTimes]
}


export default async function TimePanelAdmin() {
    const isAdmin = await is_admin()

    if (!isAdmin) return <p>Ingen tilgang</p>
    return (
        <div>
            <DevDebugPanel></DevDebugPanel>
            <hr></hr>
            <TimeSetPanel></TimeSetPanel>
        </div>
    )
}