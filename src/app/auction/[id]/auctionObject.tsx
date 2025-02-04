"use client"
import { useEffect, useState ,ChangeEvent} from "react";
import style from "./component.module.scss"
import {prisma} from "../../prisma"
import { AuksjonsObjekt } from "@prisma/client";


async function makeBid(id:number) {
    const _object_ = await prisma.auksjonsObjekt.findUnique({
        where: {
          id: 99,
        },
      })
    const object = {id:99,
        name:"Lundheims skjeggtust",
        description:"En bit av Lars Lundheim/Laurentius Lies skjegg",
        startPriceOre:1000000,
        finalSaleTime:"22:22:22",
        currentSaleTime:"21:21:21",
        approved:true,
        author:"Carl Richard Steen Fosse",
        authorId:90,
        bids:[]}

    return object;
}

interface AuctionObjectProps {
  object: {
      id: number;
      name: string;
      description: string;
      startPriceOre: number;
      finalSaleTime: string;
      currentSaleTime: string;
      approved: boolean;
      author: string;
      authorId: number;
      bids: any[];
  };
}

export default function AuctionObject({ object }: { object: AuksjonsObjekt }) {
    const [bidAmount,setBidAmount] = useState("");

    //Filters changes to input field
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d+$/.test(value) || value === "") {
        setBidAmount(value);
      }
    };
  
    //Makes API call with users bid and objectID
    const placeBid = async () => {
        if (bidAmount === "" || parseInt(bidAmount) <= 0) {
          alert("Please enter a positive integer.");
          return;
        }
        console.log("Bid placed:", bidAmount);

        //Send bid and objectID to API
        try {
          console.log(bidAmount);
          const response = await fetch('../api/auction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ objectId:object.id,bidAmount:bidAmount }),
          });
          const { message } = await response.json();
          alert(message);
          } catch (error) {
            console.error(error);
          }
      
    };  

    return <div className={style.objectPage}>
      <div className={style.objectHeading}>
        <div className={style.title}>{object.name}</div>
        <div className={style.imagecontainer}>
          <img src={"../../examples/pages/auctionObjectTestPage/walter.jpg"} alt="object image"></img>
        </div>

        <form
        onSubmit={(e) => {
          e.preventDefault();
          placeBid();
        }}>
          <input
            type="number"
            placeholder="Enter bid"
            min="1"
            value={bidAmount}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Place Bid</button>
        </form>
      </div>
    </div>
}