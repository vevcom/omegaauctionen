"use client";

import { useState, useEffect } from "react";
import FetchCurrentPrice from "./fetchCurrentPrice";
import style from "./component.module.scss"


export default function CurrentPrice({ objectId }: { objectId: number }) {
  const [currentPriceOre, setCurrentPriceOre] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await FetchCurrentPrice(objectId);

      setCurrentPriceOre((price? price/100 : null ));
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000);

    return () => clearInterval(interval);
  }, [objectId]);

  return (
    <>
    <div className={style.currentPrice} >
        Nåværende pris:  {currentPriceOre !== null ? (<b>{currentPriceOre} kr</b>) : "Laster pris..."}
    </div>
    <hr className={style.separator}></hr>
    </>
  );
}

