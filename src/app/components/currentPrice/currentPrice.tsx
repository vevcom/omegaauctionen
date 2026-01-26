"use client";

import style from "./component.module.scss"


export default function CurrentPrice({ price }: { price: number }) {
  return (
    <>
    <div className={style.currentPrice} >
        Nåværende pris:  {price !== null ? (<b>{price} kr</b>) : <b> kr</b>}
    </div>
    <hr className={style.separator}></hr>
    </>
  );
}

