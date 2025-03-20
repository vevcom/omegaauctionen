import CurrentPrice from "../components/currentPrice/currentPrice";
import style from "./component.module.scss"

export default function DisplayBid({ id, name, price, currentPrice, showAsOutbid = false }: { id: number, name: string, price?: number, currentPrice: number, showAsOutbid?: boolean }) {

    function itemStyle() {
        if (!showAsOutbid && (!price || price>=currentPrice)) {
            return style.highestBid;
        }
        return style.notHighestBid; 
    }
    
    return <>
        <a className={style.itemwrapper} href={"/auction/"+id}>
            <div className={`${style.item} ${itemStyle()}`}> 
                <div className={style.name}>{name}</div> 
                <div className={style.bidPrice}>

                    {price && price < currentPrice
                        ? <>
                            <div className={style.linethrough}>{price / 100} kr</div>
                            <div><h6 style={{display:"inline-block"}}>Ny pris:</h6> {currentPrice / 100} kr</div>
                        </>
                        : `${currentPrice / 100} kr`
                    }
                </div>
            </div>
        </a></>
    
}
