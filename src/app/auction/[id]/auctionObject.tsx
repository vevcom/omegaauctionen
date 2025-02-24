"use client"
import { useState } from "react";
import style from "./component.module.scss"

import { AuksjonsObjekt } from "@prisma/client";




export default function AuctionObject({ object }: { object: AuksjonsObjekt }) {
    const [bidAmount,setBidAmount] = useState("");


    //bid-field change-handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/\d/.test(value) || value === "") {
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
          const data = await response.json();
          console.log(response.status);
          console.log(data.error);
          alert(response.status);
          } catch (error) {
            console.log(error);
          }
      
    };  
    return (
    <div className={style.objectPage}>
      <div className={style.objectHeading}>
        <div className={style.title}>{object.name}</div>

        <div className={style.committeeHeading}>
          <div className={style.committeeName}>Vevcom</div>
          <div className={style.committeeLogo}><img></img></div>
        </div>

        <div className={style.imagecontainer}>
          <img alt="object image"></img>
        </div>

        <div className={style.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        {/* <div className={style.description}>{object.description}</div> */}
        <form className={style.form}
        onSubmit={(e) => {
          e.preventDefault();
          placeBid();
        }}>
          <input 
            className={style.input}
            type="number"
            placeholder="Skriv inn bud"
            min="1"
            value={bidAmount}
            onKeyDown={ (event) => {
              if (!(event.key >= '0' && event.key <= '9' || event.key === 'Backspace'))
              event.preventDefault();  //Prevent keys other than 0-9 and backspace from being entered
            }}
            onChange={handleInputChange}
            required
          />
          <button className={style.button} type="submit">Legg inn bud</button>

        </form>
      </div>
    </div>
)}
