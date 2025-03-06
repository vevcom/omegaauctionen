
import Link from "next/link";
import styles from "./component.module.scss";
import ImageComponent from "@/app/components/pictureServerComponents/getImgFromNameComponent"

export default function ItemsPageComponent({ allPages, currentPageNumber,pageTitle="Auksjonsobjekter" }) {
    if (!allPages[currentPageNumber]){
        return <p className={styles.tekst}>Laster inn... Ingen ting å se her 🙈</p>;
    }

    return (<div className={styles.side}>
        
        <div>
            <h1 className={styles.title}>{pageTitle}</h1>
        </div>
        
        <div className={styles.objekter}>
            {allPages[currentPageNumber].map(object => (
                
                <Link key={object.id} className={styles.objekt} href={`/auction/${object.id}`}>
                    
                        <div className={styles.objectContainer}>
                            
                                <ImageComponent style={styles.auctionImage} filename={object.imageName}/>
                            <div className={styles.textContainer}>
                                <h3 className={styles.navn}>{object.name}</h3>
                                <br/>
                                <p className={styles.pris}>{object.startPriceOre/100} kr</p>
                            </div>
                        </div>
                    
                </Link>
                ))}                
        </div>
        

        
        
       </div> 
    )
}





