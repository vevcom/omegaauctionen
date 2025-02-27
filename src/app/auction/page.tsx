

import { objectEnumNames } from "@prisma/client/runtime/library"
import {prisma} from "../prisma"
import styles from "./page.module.scss"
import ImageComponent from "@/app/components/pictureServerComponents/getImgFromNameComponent"

export default async function side() {
    const auctionobject = await prisma.auksjonsObjekt.findMany();
    return (<div className={styles.side}>
        
        <div>
            <h1 className={styles.title}>Auksjonsobjekter</h1>
        </div>
        
        <div className={styles.objekter}>
            {auctionobject
            .filter((object => object.approved))
            .map(object => (
                
                <a key={object.id} className={styles.objekt} href={`auction/${object.id}`}>
                    
                        <div className={styles.objectContainer}>
                            
                                <ImageComponent style={styles.auctionImage} filename={object.imageName}/>
                            <div className={styles.textContainer}>
                                <h3 className={styles.navn}>{object.name}</h3>
                                <br/>
                                <p className={styles.pris}>{object.startPriceOre/100} kr</p>
                            </div>
                        </div>
                    
                </a>
                ))}                
        </div>
        

        
        
       </div> 
    )
}





