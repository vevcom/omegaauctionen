"use client"
import { useState } from "react";
import style from "./component.module.scss"

import { AuksjonsObjekt } from "@prisma/client";




export default function AuctionObject({ object }: { object: AuksjonsObjekt }) {
    const [bidAmount,setBidAmount] = useState("");


    //bid-field change-handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d+$/.test(value) || value === "") {
        setBidAmount(value);
      }
    };
  
    //Make POST request to auction API with objectId and bidamount
    const placeBid = async () => {
        if (bidAmount === "" || parseInt(bidAmount,10) <= 0) {
          alert("Please enter a positive integer.");
          return;
        }
        console.log("Bid placed:", bidAmount);

        // Send bidAmount and objectID to API
        try {
          const response = await fetch('../../api/auction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ objectId:object.id,bidAmount:bidAmount }),
          });
          console.log(response.status)
          alert(response.status);
          } catch (error) {
            console.log(error);
          }
      
    };  
    return <div className={style.objectPage}>
      <div className={style.objectHeading}>
        <div className={style.title}>{object.name}</div>
        <div className={style.imagecontainer}>
          <img alt="object image"></img>
        </div>
        <div className={style.description}>{object.description}</div>

        <form
        onSubmit={(e) => {
          e.preventDefault();
          placeBid();
        }}>
          <input
            type="number"
            placeholder="Legg inn bud"
            min="1"
            value={bidAmount}
            onChange={handleInputChange}
            required
          />
          <button type="submit">By</button>
        </form>
      </div>
    </div>
}
