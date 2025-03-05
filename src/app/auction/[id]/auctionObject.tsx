"use client"
import { useEffect, useState } from "react";
import style from "./component.module.scss"

import { AuksjonsObjekt, AuksjonsObjektType } from "@prisma/client";
import is_admin from "@/app/components/is-admin/is-admin-func";
import ApproveButton from "@/app/components/approve-button/approve-button";
import DeleteButton from "@/app/components/delete-button/delete-button";
import ImageFromFileName from "@/app/components/pictureServerComponents/getImgFromNameComponent";




export default function AuctionObject({ object }: { object: AuksjonsObjekt }) {
  const [bidAmount, setBidAmount] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTime,setIsTime] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const is_admin_response = await is_admin()
      setIsAdmin(is_admin_response)
      const auctionDate = new Date('2025-03-20')
      const now = new Date()
      setIsTime(auctionDate==now)
      setIsTime(true)

    }
    fetchData();
  }, []);




  //bid-field change-handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d+$/.test(value) || value === "") {
      setBidAmount(value);
    }
  };

  //Make POST request to auction API with objectId and bidamount
  const placeBid = async () => {
    if (bidAmount === "" || parseInt(bidAmount, 10) <= 0) {
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
        body: JSON.stringify({ objectId: object.id, bidAmount: bidAmount }),
      });
      console.log(response.status)
      alert(response.status);
    } catch (error) {
      console.log(error);
    }

  };

  if(!isTime){
    return(
      <h1>IT IS NOT TIME</h1>
    )
  }

  return <div className={style.objectPage}>
    <div className={style.objectHeading}>
      <div className={style.title}>{object.name}</div>
      <div className={style.imagecontainer}>
        <ImageFromFileName style={style} filename={object.imageName}></ImageFromFileName>
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

    {(isAdmin && (!object.approved)) ? <DeleteButton objectId={object.id} ></DeleteButton> : null}
    {(isAdmin && (!object.approved)) ? <ApproveButton objectId={object.id} ></ApproveButton> : null}
  </div>
}
