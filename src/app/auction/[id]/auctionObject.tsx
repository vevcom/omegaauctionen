"use client"
import { useEffect, useState } from "react";
import style from "./component.module.scss"
import { Committee } from "@prisma/client";

import { AuksjonsObjekt, AuksjonsObjektType } from "@prisma/client";
import is_admin from "@/app/components/is-admin/is-admin-func";
import ApproveButton from "@/app/components/approve-button/approve-button";
import DeleteButton from "@/app/components/delete-button/delete-button";
import ImageFromFileName from "@/app/components/pictureServerComponents/getImgFromNameComponent";




function BidPanel(){
  const [bidAmount, setBidAmount] = useState("");


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
        // Convert from krone to ore
        bidAmount = (Number(bidAmount)*100).toString();

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
    return <div className={style.objectPage}>
      <div className={style.objectHeading}>
      {committeeLogoLink != "" &&
        (<div className={style.committeeHeading}>
          <div className={style.committeeName}>{object.committee}</div>
          <img src={committeeLogoLink}></img>
        </div>)}
        <div className={style.title}>{object.name}</div>
        <div className={style.imagecontainer}>
          <img alt="object image"></img>
        </div>
        <div className={style.description}>{object.description}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

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

        </form>)}

        export default function AuctionObject({ object }: { object: AuksjonsObjekt }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTime,setIsTime] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const is_admin_response = await is_admin()
      setIsAdmin(is_admin_response)
      const auctionDate = new Date('2025-03-20')
      const now = new Date()
      setIsTime(auctionDate==now)
      setIsTime(true) // TODO: remove before production

    }
    fetchData();
  }, []);

  //TODO: add rendering for enums
  return <div className={style.objectPage}>
    <div className={style.objectHeading}>
      <div className={style.title}>{object.name}</div>
      <div className={style.imagecontainer}>
        <ImageFromFileName style={style} filename={object.imageName}></ImageFromFileName>
      </div>
      <div className={style.description}>{object.description}</div>

      {isTime ? <BidPanel></BidPanel> : <h2>Budrunden starter 03.20.2025</h2>}
    </div>

    {(isAdmin && (!object.approved)) ? <DeleteButton objectId={object.id} ></DeleteButton> : null}
    {(isAdmin && (!object.approved)) ? <ApproveButton objectId={object.id} ></ApproveButton> : null}
  </div>
)}
