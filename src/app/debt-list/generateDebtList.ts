"use server"
import { AuksjonsObjektType } from "@prisma/client";
import { prisma } from "../prisma";
import is_miniadmin from "../components/is-miniadmin/is-miniadmin";

function generateMail(
    userName: string,
    data: {
        email: string;
        totalDebt: number;
        wonObjects: {
            price: number;
            objectName: string;
            authorEmail: string;
            authorName: string;
        }[];
    },
    phoneNumberForVipps: string
) {
    let mailText = `"Hei ${userName},\n\n` +
        `Takk for din deltakelse i Omega-auksjonen! Du har det høyeste budet / kjøpt / stemt på ` +
        `${data.wonObjects.length} ting. Totalsummen er ${data.totalDebt / 100} kr, som kan vippses til ${phoneNumberForVipps}.\n\n` +
        `Mener du dette er feil? Vennligst svar på denne e-posten. Under finner du en oversikt over dine bud, kjøp og stemmer:\n\n` +
        `----- Oversikt -----\n`;

    data.wonObjects.forEach((object, index) => {
        mailText += `${index + 1}: ${object.objectName}\n`;
        mailText += `\t - Pris: ${object.price / 100} kr\n`;
    });
    mailText+='"'
    return mailText;
}


export default async function generateDebtReport() {
    const phoneNumberForVipps = "PLACEHOLDER"
    const is_minAdmni = await is_miniadmin()
    if (!is_minAdmni) {
        return false;
    }
    let reportTextForm = ""
    let userDebtData: {
        [index: string]: {
            email: string,
            totalDebt: number,
            wonObjects: {
                price: number,
                objectName: string,
                authorEmail: string,
                authorName: string
            }[]
        }
    } = {}
    const allUserInfo = await prisma.user.findMany({})

    if (!allUserInfo) {
        return false;
    }

    for (let i = 0; i < allUserInfo.length; i++) {
        const user = allUserInfo[i]
        if (!user) { continue; }
        if (!user.email || !user.name) { continue; }
        const name = user.name
        const email = user.email
        userDebtData[name] = { email: email, wonObjects: [], totalDebt: 0 }

    }

    const highestBidsAuctionObjects = await prisma.auksjonsObjekt.findMany({
        where: {
            approved: true,
            type: AuksjonsObjektType.AUKSJON,
        },
        select: {
            bids: {
                orderBy: {
                    priceOre: "desc"
                },
                take: 1,
                select: {
                    bidder: {
                        select: {
                            name: true
                        }
                    },
                    priceOre: true
                }
            },
            author: {
                select: {
                    name: true,
                    email: true
                }
            },
            name: true
        }
    })

    if (!highestBidsAuctionObjects) {
        return false;
    }



    for (let i = 0; i < highestBidsAuctionObjects.length; i++) {
        const data = highestBidsAuctionObjects[i]
        if (!data) { continue; }
        if (!data.name) { continue; }
        if (!data.author || !data.author.email || !data.author.name) { continue; }
        const topBid = data.bids[0]
        if (!topBid || !topBid.priceOre || !topBid.bidder.name) { continue; }
        const authorName = data.author.name
        const authorEmail = data.author.email
        const topPrice = topBid.priceOre
        const topBidBidderName = topBid.bidder.name
        const objectName = data.name
        userDebtData[topBidBidderName].wonObjects.push(
            {
                price: topPrice,
                objectName: objectName,
                authorEmail: authorEmail,
                authorName: authorName
            }
        )
        userDebtData[topBidBidderName].totalDebt += topPrice;
    }


    const capes = await prisma.auksjonsObjekt.findMany({
        where: {
            approved: true,
            type: AuksjonsObjektType.SALG,
        },
        select: {
            bids: {
                orderBy: {
                    priceOre: "desc"
                },
                select: {
                    bidder: {
                        select: {
                            name: true
                        }
                    },
                    priceOre: true
                }
            },
            author: {
                select: {
                    name: true,
                    email: true
                }
            },
            name: true
        }
    })




    for (let i = 0; i < capes.length; i++) {
        const data = capes[i]
        if (!data) { continue; }
        if (!data.name) { continue; }
        const bids = data.bids
        if (!bids) { continue; }
        for (let j = 0; j < bids.length; j++) {
            const bid = bids[j]
            if (!bid || !bid.priceOre || !bid.bidder.name) { continue; }
            const authorName = "Vevcom"
            const authorEmail = "haakonkm@stud.ntnu.no"
            const topPrice = bid.priceOre
            const bidBidderName = bid.bidder.name
            const objectName = data.name
            userDebtData[bidBidderName].wonObjects.push(
                {
                    price: topPrice,
                    objectName: objectName,
                    authorEmail: authorEmail,
                    authorName: authorName
                }
            )
            userDebtData[bidBidderName].totalDebt += topPrice;
        }
    }





    for (const [userName, data] of Object.entries(userDebtData)) {
        if (data.totalDebt == 0) { continue; }
        reportTextForm += "---------------Person start" + "\n"
        reportTextForm += "Navn:" + userName + "\n"
        reportTextForm += "Mail:" + data.email + "\n"
        reportTextForm += "Skylder totalt:" + (data.totalDebt / 100).toString() + "\n"
        reportTextForm += "----- Oversikt" + "\n"
        data.wonObjects.forEach((object, index) => {
            reportTextForm += ((index + 1).toString()) + ":" + object.objectName + "\n"
            reportTextForm += "\t -Pris:" + (object.price / 100).toString() + "kr" + "\n"
            reportTextForm += "\t -Navn på person som la ut:" + object.authorName + "\n"
            reportTextForm += "\t -Mail til den som la ut:" + object.authorEmail + "\n"
        })
        reportTextForm += "----- Oversikt slutt" + "\n"
        reportTextForm += "---------------Person slutt" + "\n" + "\n" + "\n" + "\n"

    }

    let overviewList = "Navn;Skylder[kr];Betalt\n"
    for (const [userName, data] of Object.entries(userDebtData)) {
        if (data.totalDebt == 0) { continue; }
        overviewList += userName + ";" + (data.totalDebt / 100).toString() + ";" + "nei\n"
    }

    let preMadeMail = "Navn;Mail;Emne;Innhold\n"
    for (const [userName, data] of Object.entries(userDebtData)) {
        if (data.totalDebt == 0) { continue; }
        preMadeMail += ""
            + userName + ";"
            + data.email + ";"
            + "Betaling for Omega auksjonen (Auto generert mail)" + ";"
            + generateMail(userName, data, phoneNumberForVipps)
    }
    return [reportTextForm, overviewList,preMadeMail]
}