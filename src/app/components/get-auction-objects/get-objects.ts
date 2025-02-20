"use server"

import { prisma } from "@/app/prisma"
import sortObjectsFunc from "@/app/components/get-auction-objects/sort-objects-func"


export default async function get_objects_all(sortType: string, reverse = false, adminMode = false) {
    const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_OBJECTS_PER_PAGE as string)
    let objekter = await prisma.auksjonsObjekt.findMany({
        where:
        {
            approved: !adminMode,
        },
    })
    let objectAmount = objekter.length
    let pagesList = []

    objekter = await sortObjectsFunc(objekter, sortType, reverse)

    let currentPageList: any = []
    for (let i = 0; i < objectAmount; i++) {
        if (currentPageList.length == itemsPerPage) {
            pagesList.push(currentPageList)
            currentPageList = []
        }
        currentPageList.push(objekter.at(i))
    }
    if (currentPageList.length != 0) {
        pagesList.push(currentPageList)
    }
    return pagesList
}