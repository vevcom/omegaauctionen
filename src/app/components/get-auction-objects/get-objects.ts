"use server"

import { prisma } from "@/app/prisma"
import sortObjectsFunc, { SortType } from "@/app/components/get-auction-objects/sort-objects-func"
import { AuksjonsObjekt, AuksjonsObjektType } from "@prisma/client"


export default async function get_objects_all(sortType: SortType | string, reverse = false, adminMode = false,enumType="") {
    let enumTypeSelected;
    if (enumType=="salg"){
        enumTypeSelected = AuksjonsObjektType.SALG
    }
    else if(enumType=="live"){
        enumTypeSelected = AuksjonsObjektType.LIVE
    }
    else{
        enumTypeSelected =  AuksjonsObjektType.AUKSJON
    }

    // const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_OBJECTS_PER_PAGE as string)
    const itemsPerPage = 12
    let objekter = await prisma.auksjonsObjekt.findMany({
        where: {
            approved: !adminMode,
            type:  enumTypeSelected,
        },
        include: {
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
    let objectAmount = objekter.length
    let pagesList:AuksjonsObjekt[][] = []
    
    objekter = await sortObjectsFunc(objekter, sortType, reverse)

    console.log(objekter)

    let currentPageList:AuksjonsObjekt[] = []
    for (let i = 0; i < objectAmount; i++) {
        if (currentPageList.length == itemsPerPage) {
            pagesList.push(currentPageList)
            currentPageList = []
        }
        currentPageList.push(objekter[i])
    }
    if (currentPageList.length != 0) {
        pagesList.push(currentPageList)
    }
    return pagesList
}