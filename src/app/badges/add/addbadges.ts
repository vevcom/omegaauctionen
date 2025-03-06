"use server"
import { prisma } from "@/app/prisma"
import { PrismaClient, AuksjonsObjektType } from '@prisma/client';

export async function createBadges() {
    await prisma.auksjonsObjekt.create({
        data: {
            currentSaleTime: new Date("2022-03-25"),
            finalSaleTime: new Date("2022-03-25"),
            description: "Litt basic, men alt som skinner er flott",
            name: "Bronse",
            stock:100,
            type: AuksjonsObjektType.SALG,
            startPriceOre: 10000,
            approved: true,
            imageName: "brass.png"
        }
    });
    await prisma.auksjonsObjekt.create({
        data: {
            currentSaleTime: new Date("2022-03-25"),
            finalSaleTime: new Date("2022-03-25"),
            description: "Skinn mer enn de usle bronsekarene",
            name: "Sølv",
            stock:50,
            type: AuksjonsObjektType.SALG,
            startPriceOre: 50000,
            approved: true,
            imageName: "silver.png"
        }
    });
    await prisma.auksjonsObjekt.create({
        data: {
            currentSaleTime: new Date("2022-03-25"),
            finalSaleTime: new Date("2022-03-25"),
            description: "Vaer kongen av bling, og faa alle til aa si wow med dette gullmerket",
            name: "Gull",
            stock:5,
            type: AuksjonsObjektType.SALG,
            startPriceOre: 100000,
            approved: true,
            imageName: "gold.png"
        }
    });
    await prisma.auksjonsObjekt.create({
        data: {
            currentSaleTime: new Date("2022-03-25"),
            finalSaleTime: new Date("2022-03-25"),
            description: "Faa folk til aa trenge solbriller innendoers med dette vakre diamantmerket",
            name: "Diamant",
            stock:1,
            type: AuksjonsObjektType.SALG,
            startPriceOre: 300000,
            approved: true,
            imageName: "diamond.png"
        }
    });
    return true;

}