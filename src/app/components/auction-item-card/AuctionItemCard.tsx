import Link from "next/link";
import ImageComponent from "@/app/components/pictureServerComponents/getImgFromNameComponent"
import {  AuksjonsObjektType } from "@/generated/enums";
import { AuksjonsObjekt } from "@/generated/client";
import styles from "./AuctionItemCard.module.scss"
import { getLogo } from "@/app/logos/logos";

type AuksjonsObjectWithPrice = AuksjonsObjekt & { currentPrice: number }

function CardContent({ auctionItem }: { auctionItem: AuksjonsObjectWithPrice }) {
    const committeeLogoSrc = getLogo(auctionItem.committee)

    function cutOffName(name: string) {
        const maxLengthCharacters = 24;
        if (name.length > maxLengthCharacters) {
            return name.substring(0, maxLengthCharacters) + "..."
        }
        return name
    }
    return (
    <>
        <div className={styles.titleContainer}>
            <div className={styles.committeeImgContainer}>
                <img height="50px" width="50px" className={styles.committeeImg} src={committeeLogoSrc}></img>
            </div>
            <div className={styles.titleTextContainer}>
                <h3 className={styles.name}>{cutOffName(auctionItem.name)}</h3>
                <br />
                {auctionItem.type == AuksjonsObjektType.LIVE ?
                    "" :
                    <p className={styles.pris}>{auctionItem.currentPrice} kr</p>
                }

            </div>
        </div>
        <div className={styles.imageContainer}>

            <ImageComponent style={styles.auctionImage} filename={auctionItem.imageName} />
        </div>
    </>
    )
}


export function AuctionItemCard({ auctionItem, preViewMode }: { auctionItem: AuksjonsObjectWithPrice, preViewMode?: boolean }) {

    if (!preViewMode) {
        return (
            < Link className={styles.card} href={`/auction/${auctionItem.id}`}>
                <CardContent auctionItem={auctionItem}></CardContent>
            </Link>
        )

    }
    return (
        <div className={styles.card} >
            <CardContent auctionItem={auctionItem}></CardContent>
        </div>
    )
}

