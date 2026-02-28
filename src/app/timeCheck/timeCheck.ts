import { AuksjonsObjekt } from "@/generated/client"

export const auctionStart = new Date("2026-03-05T16:00:00.000Z") //This should correspond to the default value set in the db !ADJUST FOR TIMEZONE (-1)
export const auctionNormalEnd = new Date("2026-03-05T23:00:00.000Z") //This should correspond to the default value set in the db !ADJUST FOR TIMEZONE (-1)
export const auctionFinalEnd = new Date("2026-03-06T01:00:00.000Z") //This should correspond to the default value set in the db !ADJUST FOR TIMEZONE (-1)


export function isAuctionOpenNormal() {
    const now = new Date(Date.now())
    if (now < auctionStart) return false
    if (now > auctionNormalEnd) return false
    return true
}

export function isAuctionOpenFinal() {
    const now = new Date(Date.now())
    if (now < auctionStart) return false
    if (now > auctionFinalEnd) return false
    return true
}

export function isAuctionOpenForItem(auctionItem:AuksjonsObjekt) {
    const now = new Date(Date.now())
    if (now < auctionStart) return false
    if (now > auctionItem.currentSaleTime) return false
    return true
}

export function isAuctionEnded(){
    const now = new Date(Date.now())
    if (now > auctionFinalEnd) return true
    return false
}
export function isAuctionStarted(){
    const now = new Date(Date.now())
    if (now > auctionStart) return true
    return false
}


export function timeAsText(dateTime:Date){
    return dateTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).substring(0, 5)
}

export function dateAsText(dateTime:Date){
    return dateTime.toLocaleTimeString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).substring(0, 10)
}