import CurrentPrice from "../components/currentPrice/currentPrice";
import style from "./component.module.scss"

export default function DisplayBid({num=NaN,id,name,price,currentPrice}:{num?:number,id:number,name:string,price:number,currentPrice:number}) {
    const highestStyle = style.highestBid;
    const notHighestStyle = style.notHighestBid;

    function correctStyle() {
        if (price==currentPrice) {
            return highestStyle;
        }
        return notHighestStyle;
    }
    
    return <>
        <a className={style.itemwrapper} href={"/auction/"+id}>
            <div className={style.item}> 
                <div className={`${style.bulletPoint} ${correctStyle()}`}></div>
                <div className={style.name}>{name}</div>  
                <b style={{flexBasis:"35%",textAlign:"right",}}>{price/100} kr</b>
            </div>
        </a></>
    
}
