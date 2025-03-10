"use client";
import React, { useState, useEffect } from "react";
import ItemsPageComponent from "@/app/components/items-show-page/items-show-component";
import get_objects_all from "@/app/components/get-auction-objects/get-objects";
import { AuksjonsObjekt } from "@prisma/client";
import styles from "./page.module.scss";

export default function AuctionItemsPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [allPages, setAllPages] = useState<AuksjonsObjekt[][]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get_objects_all("");
      setAllPages(data);
    }
    fetchData();
  }, []);
  if (allPages.length === 0){
    return <p>Ingen ting å se her 🙈</p>;
  }
  return (
    <div className={styles.container}>
        <div className={styles.buttonContainer}>
            <button className={styles.knapp} onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
            <p className={styles.sidetall}>{pageNumber + 1}/{allPages.length}</p>
            <button className={styles.knapp} onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
        </div>
    
        <ItemsPageComponent allPages={allPages} currentPageNumber={pageNumber} />
        <div className={styles.buttonContainer}>
            <button className={styles.knapp} onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
            <p className={styles.sidetall}>{pageNumber + 1}/{allPages.length}</p>
            <button className={styles.knapp} onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
        </div>    
    </div>
  );
}