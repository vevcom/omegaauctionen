"use server"
import { prisma } from '@/app/prisma';
import React from 'react';


export async function approve(objektID: number) {
    const response = await prisma.auksjonsObjekt.update({
        where: {
            id: objektID,
        },
        data: {
            approved:true,
        },
    })
    return [response,true]
}