import { prisma } from "@/app/prisma";
import { AuksjonsObjektType, Committee } from "@prisma/client";

export default async function get_total_debt_user(userName: string) {
    const userDebtData: {
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
        return;
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
                    price: "desc"
                },
                take: 1,
                select: {
                    bidder: {
                        select: {
                            name: true
                        }
                    },
                    price: true
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
        return;
    }

    for (let i = 0; i < highestBidsAuctionObjects.length; i++) {
        const data = highestBidsAuctionObjects[i]
        if (!data) { continue; }
        if (!data.name) { continue; }
        if (!data.author || !data.author.email || !data.author.name || !data.committee) { continue; }
        const topBid = data.bids[0]
        if (!topBid || !topBid.price || !topBid.bidder.name) { continue; }
        const authorName = data.author.name
        const authorEmail = data.author.email
        const topPrice = topBid.price
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
                    price: "desc"
                },
                select: {
                    bidder: {
                        select: {
                            name: true
                        }
                    },
                    price: true
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
                    price: "desc"
                },
                select: {
                    bidder: {
                        select: {
                            name: true
                        }
                    },
                    price: true
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
                    price: "desc"
                },
                select: {
                    bidder: {
                        select: {
                            name: true
                        }
                    },
                    price: true
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
                if (!bid || !bid.price || !bid.bidder.name) { continue; }
                const authorName = "HS"
                const authorEmail = "Ikke nødvendig med mail"
                const bidPrice = bid.price
                const bidBidderName = bid.bidder.name
                const objectName = "Hansa stemme"
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

    if (motHansa) {
        const data = motHansa
        const bids = data.bids
        if (bids) {
            for (let j = 0; j < bids.length; j++) {
                const bid = bids[j]
                if (!bid || !bid.price || !bid.bidder.name) { continue; }
                const authorName = "HS"
                const authorEmail = "Ikke nødvendig med mail"
                const bidPrice = bid.price
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
            if (!bid || !bid.price || !bid.bidder.name) { continue; }
            const authorName = "Vevcom"
            const authorEmail = "haakonkm@stud.ntnu.no"
            const topPrice = bid.price
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

    return userDebtData[userName]
}