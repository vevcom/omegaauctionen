import CurrentPrice from "../components/currentPrice/currentPrice";
import style from "./component.module.scss"

export default function DisplayBid({id,name,price,currentPrice}:{id:number,name:string,price?:number,currentPrice:number}) {

    function itemStyle() {
        if (!price || price==currentPrice) {
            return style.highestBid;
        }
        return style.notHighestBid;
    }
    function priceStyle() {
        if (!price || price==currentPrice) {
            return style.empty;
        }
        return style.linethrough;

    }
    
    return <>
        <a className={style.itemwrapper} href={"/auction/"+id}>
            <div className={`${style.item} ${itemStyle()}`}> 
                <div className={style.name}>{name}</div>  
                <div className={`${style.bidPrice} ${priceStyle()}`}>{price? price/100 : currentPrice/100} kr</div>
            </div>
        </a></>
    
}
