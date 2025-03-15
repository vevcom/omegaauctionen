"use server"
import { prisma } from '@/app/prisma';
import React from 'react';
import is_admin from '../is-admin/is-admin-func';


export async function approve(objektID: number) {
     const isAdmin = await is_admin()
        if(!isAdmin){
            return ["not admin",false];
        }
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