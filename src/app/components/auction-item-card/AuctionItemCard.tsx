import Link from "next/link";
import ImageComponent from "@/app/components/pictureServerComponents/getImgFromNameComponent"
import { AuksjonsObjekt, AuksjonsObjektType } from "@prisma/client";
import styles from "./AuctionItemCard.module.scss"
import { getLogo } from "@/app/logos/logos";

type AuksjonsObjectWithPrice = AuksjonsObjekt & { currentPrice: number }


export function AuctionItemCard({ auctionItem }: { auctionItem: AuksjonsObjectWithPrice }) {
    function cutOffName(name: string) {
        const maxLengthCharacters = 69;
        if (name.length > maxLengthCharacters) {
            return name.substring(0, maxLengthCharacters) + "..."
        }
        return name
    }
    const committeeLogoSrc = getLogo(auctionItem.committee)
    return (
        < Link className={styles.card} href={`/auction/${auctionItem.id}`}>
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

        </Link>

    )
}