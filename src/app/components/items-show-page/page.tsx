import styles from "./page.module.scss"
import ImageComponent from "@/app/components/pictureServerComponents/getImgFromNameComponent"

export default function ItemsPageComponent({ allPages, currentPageNumber }) {
    if (!allPages[currentPageNumber]){
        return <p>Ingen ting å se her :/</p>;
      }



    return (<div className={styles.side}>
        
        <div>
            <h1 className={styles.title}>Auksjonsobjekter</h1>
        </div>
        
        <div className={styles.objekter}>
            {allPages[currentPageNumber].map(object => (
                
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





