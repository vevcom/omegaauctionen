"use server"

import { prisma } from "@/app/prisma"
import styles from "./page.module.scss"
import is_admin from "@/app/components/is-admin/is-admin-func"
import { refresh } from 'next/cache'
import get_money_made from "@/app/components/get-money-made/get-money-made"

async function findOverrideObject() {
    return await prisma.auksjonsObjekt.findUnique({
        where: {
            special: "OVERRIDE",
        }
    })
}

async function createOrUpdateOverrideObject(formData: FormData) {
    const isAdmin = await is_admin() // This is probably not necessary, but just in case
    if (!isAdmin) {
        return;
    }

    const sum = formData.get("sum")
    if (!sum) {
        return;
    }

    if (isNaN(parseInt(sum.toString()))) {
        return;
    }

    const sumAsNumber = parseInt(sum.toString())

    await prisma.auksjonsObjekt.upsert({
        where: {
            special: "OVERRIDE",
        },
        create: {
            special: "OVERRIDE",
            description: "Total override sum",
            name: "Total sum override do not approve this",
            startPrice: sumAsNumber,
            approved: false,
        },
        update: {
            startPrice: sumAsNumber,
            approved: false,
        }
    })

    refresh()
}

async function deleteOverride() {
    const isAdmin = await is_admin() // This is probably not necessary, but just in case
    if (!isAdmin) {
        alert("NOT ADMIN")
        return;
    }
    await prisma.auksjonsObjekt.delete({
        where: {
            special: "OVERRIDE",
        }
    })
    refresh()
}


export default async function OverridePanel() {
    const overrideObject = await findOverrideObject()
    const isAdmin = await is_admin()
    const totalSum = await get_money_made(true)

    if (!isAdmin) return <h1>Du har ikke tilgang til denne siden</h1>

    // const handleSubmit = async (e: FormData) => {
    //     createOrUpdateOverrideObject(e)
    // }

    return (
        <div>
            <h1 className={styles.heading}>Manuell totalsum overskrivelse</h1>
            {overrideObject
                ?
                <h2 className={styles.infoText}>Det er inne en manuell overskrivelse på <b>{overrideObject.startPrice}kr</b></h2>
                :
                <h2 className={styles.infoText}>Ingen overskrivelse er lagt inn</h2>
            }
            <h2 className={styles.infoText}>Manuel overskrivelse skriver midlertidig over statistikk summen til statistikk-summen går over summen overskrivelsen. Statistikken sier vi har tjent: <b>{totalSum}kr</b></h2>
            <form action={
                async function (e: FormData) {
                    'use server';
                    await createOrUpdateOverrideObject(e)
                }} >
                <input className={styles.sumField} type="number" name="sum" required></input>
                <button className={styles.submitButton} type="submit">{overrideObject ? "Oppdater" : "Legg inn"}</button>
            </form>
            {overrideObject
                ?
                <button className={styles.delete} onClick={async function () {
                    'use server';
                    await deleteOverride()
                }}>Slett overskrivelse</button>
                :
                null
            }
        </div >
    )
}