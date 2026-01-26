"use server"

import { prisma } from "@/app/prisma"
import sortObjectsFunc, { SortType } from "@/app/components/get-auction-objects/sort-objects-func"
import { AuksjonsObjekt, AuksjonsObjektType } from "@prisma/client"


type AuksjonsObjektWithPrice = AuksjonsObjekt & { currentPrice: number }


export default async function get_objects_all(sortType: SortType | string, reverse = false, adminMode = false, enumType = "") {
    let enumTypeSelected;
    if (enumType == "salg") {
        enumTypeSelected = AuksjonsObjektType.SALG
    }
    else if (enumType == "live") {
        enumTypeSelected = AuksjonsObjektType.LIVE
    }
    else {
        enumTypeSelected = AuksjonsObjektType.AUKSJON
    }

    // const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_OBJECTS_PER_PAGE as string)
    const itemsPerPage = 12
    const objects = await prisma.auksjonsObjekt.findMany({
        where: {
            approved: !adminMode,
            type: enumTypeSelected,
        },
        include: {
            bids: {
                select: {
                    price: true,
                },
                orderBy: {
                    price: "desc"
                },
                take: 1,
            },
            _count: {
                select: {
                    bids: true,
                }
            }
        },
        orderBy: {
            id: "desc",
        },
    })
    const objectAmount = objects.length
    const pagesList: AuksjonsObjektWithPrice[][] = []

    let objectsWithCurrentPrice = objects.map(obj => ({
        ...obj,
        currentPrice: obj.bids.at(0)?.price ?? obj.startPrice
    }))

    objectsWithCurrentPrice = await sortObjectsFunc(objectsWithCurrentPrice, sortType, reverse)

    let currentPageList: AuksjonsObjektWithPrice[] = []
    for (let i = 0; i < objectAmount; i++) {
        if (currentPageList.length == itemsPerPage) {
            pagesList.push(currentPageList)
            currentPageList = []
        }
        currentPageList.push(objectsWithCurrentPrice[i])
    }
    if (currentPageList.length != 0) {
        pagesList.push(currentPageList)
    }
    return pagesList
}