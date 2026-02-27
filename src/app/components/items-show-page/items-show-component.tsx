
import { AuctionItemCard } from "../auction-item-card/AuctionItemCard";
import styles from "./component.module.scss";
import { AuksjonsObjekt, AuksjonsObjektType } from "@/generated/client"

type AuksjonsObjektWithPrice = AuksjonsObjekt & { currentPrice: number }

export default function ItemsPageComponent({ allPages, currentPageNumber, pageTitle = "Auksjonsobjekter" }: { allPages: AuksjonsObjektWithPrice[][], currentPageNumber: number, pageTitle?: string }) {
    if (!allPages[currentPageNumber]) {
        return <p className={styles.tekst}>Laster...</p>;
    }

    return (
        <div className={styles.auctionObjectCollection}>
            {allPages[currentPageNumber].map( (object, index) => (
                <AuctionItemCard auctionItem={object} key={index}></AuctionItemCard>
            ))}
        </div>
    )
}





