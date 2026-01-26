
import Link from "next/link";
import styles from "./component.module.scss";
import ImageComponent from "@/app/components/pictureServerComponents/getImgFromNameComponent"
import { AuksjonsObjekt, AuksjonsObjektType} from "@prisma/client";

type AuksjonsObjektWithPrice = AuksjonsObjekt & { currentPrice: number }

export default function ItemsPageComponent({ allPages, currentPageNumber,pageTitle="Auksjonsobjekter" }:{allPages:AuksjonsObjektWithPrice[][],currentPageNumber:number,pageTitle?:string}) {
    if (!allPages[currentPageNumber]){
        return <p className={styles.tekst}>Laster inn... Ingen ting å se her 🙈 HS må gå</p>;
    }

    //cuts of name before it overflows
    function cutOffName(name:string){
        const maxLengthCharacters = 69;
        if (name.length> maxLengthCharacters) {
            return name.substring(0,maxLengthCharacters) +"..."
        }
        return name
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
                                <h3 className={styles.navn}>{cutOffName(object.name)}</h3>
                                <br/>
                                {object.type == AuksjonsObjektType.LIVE ?
                                    "":
                                    <p className={styles.pris}>{object.currentPrice} kr</p>
                            }
                                
                            </div>
                        </div>
                    
                </Link>
                ))}                
        </div>
        
        
        
        
       </div> 
    )
}





