"use server"
import { AuksjonsObjektType, Committee } from "@prisma/client";
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
            committee: string | null;
        }[];
    },
    phoneNumberForVipps: string
) {
    let mailText = `Hei ${userName},\n\n` +
        `Takk for din deltakelse i Omega-auksjonen! Du har det høyeste budet / kjøpt / stemt på ` +
        `${data.wonObjects.length} ting. Totalsummen er ${data.totalDebt / 100} kr, som skal vippses til 668205. NB:Du må selv kontakte de du må for å få det du har vunnet.\n\n` +
        `Mener du dette er feil? Vennligst svar på denne e-posten. Under finner du en oversikt over dine bud, kjøp og stemmer:\n\n` +
        `----- Oversikt -----\n`;

    data.wonObjects.forEach((object, index) => {
        let kontaktInfo = object.authorEmail + " - " + object.authorName
        if (object.committee) {
            kontaktInfo = "komitee:"+ object.committee + " - person som la ut: "+object.authorName
        }
        mailText += `${index + 1}: ${object.objectName}\n`;
        mailText += `\t - Pris: ${object.price / 100} kr\n`;
        mailText += "\t - KontaktInfo:" + kontaktInfo +"\n"

    });
    return mailText;
}


export default async function generateDebtReport() {
    const phoneNumberForVipps = "PLACEHOLDER"
    const is_minAdmni = await is_miniadmin()
    if (!is_minAdmni) {
        return [false, 1];
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
                authorName: string,
                committee: string | null,
            }[]
        }
    } = {}
    const allUserInfo = await prisma.user.findMany({})

    if (!allUserInfo) {
        return [false, 2];
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
            name: true,
            committee: true
        }
    })

    if (!highestBidsAuctionObjects) {
        return [false, 3];
    }

    for (let i = 0; i < highestBidsAuctionObjects.length; i++) {
        const data = highestBidsAuctionObjects[i]
        if (!data) { continue; }
        if (!data.name) { continue; }
        if (!data.author || !data.author.email || !data.author.name || !data.committee) { continue; }
        const topBid = data.bids[0]
        if (!topBid || !topBid.priceOre || !topBid.bidder.name) { continue; }
        const authorName = data.author.name
        const authorEmail = data.author.email
        const topPrice = topBid.priceOre
        const topBidBidderName = topBid.bidder.name
        const objectName = data.name
        const objectCometee = data.committee != Committee.NOTCOM ? data.committee.toLocaleUpperCase() : null
        userDebtData[topBidBidderName].wonObjects.push(
            {
                price: topPrice,
                objectName: objectName,
                authorEmail: authorEmail,
                authorName: authorName,
                committee: objectCometee,
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



    const hansa = await prisma.auksjonsObjekt.findFirst({
        where: {
            name: "DONOTAPPROVE" + "Hansa"
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
        }
    })
    const motHansa = await prisma.auksjonsObjekt.findFirst({
        where: {
            name: "DONOTAPPROVE" + "IkkeHansa"
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
        }
    })

    if (hansa) {
        const data = hansa
        const bids = data.bids
        if (bids) {
            for (let j = 0; j < bids.length; j++) {
                const bid = bids[j]
                if (!bid || !bid.priceOre || !bid.bidder.name) { continue; }
                const authorName = "HS"
                const authorEmail = "Ikke nødvendig med mail"
                const bidPrice = bid.priceOre
                const bidBidderName = bid.bidder.name
                const objectName = "Hansa stemme"
                userDebtData[bidBidderName].wonObjects.push(
                    {
                        price: bidPrice,
                        objectName: objectName,
                        authorEmail: authorEmail,
                        authorName: authorName,
                        committee:  Committee.HS.toString(),
                    }
                )
                userDebtData[bidBidderName].totalDebt += bidPrice;
            }
        }
    }
    if (motHansa) {
        const data = motHansa
        const bids = data.bids
        if (bids) {
            for (let j = 0; j < bids.length; j++) {
                const bid = bids[j]
                if (!bid || !bid.priceOre || !bid.bidder.name) { continue; }
                const authorName = "HS"
                const authorEmail = "Ikke nødvendig med mail"
                const bidPrice = bid.priceOre
                const bidBidderName = bid.bidder.name
                const objectName = "Imot hansa stemme"
                userDebtData[bidBidderName].wonObjects.push(
                    {
                        price: bidPrice,
                        objectName: objectName,
                        authorEmail: authorEmail,
                        authorName: authorName,
                        committee: Committee.HS.toString(),
                    }
                )
                userDebtData[bidBidderName].totalDebt += bidPrice;
            }
        }
    }




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
                    authorName: authorName,
                    committee: Committee.VEVCOM.toString(),
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
            reportTextForm += object.committee ? "\t Komitee: " + object.committee + "\n" : ""
        })
        reportTextForm += "----- Oversikt slutt" + "\n"
        reportTextForm += "---------------Person slutt" + "\n" + "\n" + "\n" + "\n"

    }

    let overviewList = "Navn;Skylder[kr];Betalt\n"
    for (const [userName, data] of Object.entries(userDebtData)) {
        if (data.totalDebt == 0) { continue; }
        overviewList += userName + ";" + (data.totalDebt / 100).toString() + ";" + "nei\n"
    }

    let preMadeMail = ""
    for (const [userName, data] of Object.entries(userDebtData)) {
        if (data.totalDebt == 0) { continue; }
        preMadeMail += "---------------Person start" + "\n"
            + "Navn: " + userName + "\n"
            + "Mail: " + data.email + "\n"
            + "Emne: " + "Betaling for Omega auksjonen (Auto generert mail)" + "\n"
            + "Mail: \n" + generateMail(userName, data, phoneNumberForVipps)
            + "---------------Person slutt" + "\n" + "\n" + "\n" + "\n"
    }
    return [reportTextForm, overviewList, preMadeMail]
}