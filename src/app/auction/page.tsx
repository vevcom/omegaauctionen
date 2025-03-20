"use client";
import React, { useState, useEffect, Suspense } from "react";
import ItemsPageComponent from "@/app/components/items-show-page/items-show-component";
import get_objects_all from "@/app/components/get-auction-objects/get-objects";
import { AuksjonsObjekt } from "@prisma/client";
import styles from "./page.module.scss";
import { useSearchParams } from "next/navigation";

function AuctionItemPage() {
    const [orderBy, setOrderBy] = useState("price")
    const [orderDirection, setOrderDirection] = useState("desc")
    const params = useSearchParams();
    const getPageQuery = () => parseInt(params.get("page") || "1") - 1;

    const [pageNumber, setPageNumber] = useState(getPageQuery());
    const [allPages, setAllPages] = useState<AuksjonsObjekt[][]>([]);

    useEffect(() => {
        // Ikke set URL hvis den allerede inneholder riktig sidetall
        if (pageNumber == getPageQuery()) return;
    
        window.history.replaceState(null, '', `?page=${pageNumber + 1}`)
    }, [pageNumber])
  
    const prevPage = () => {
      setPageNumber((prev) => Math.max(0, prev - 1))
    }
  
    const nextPage = () => {
      setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))
    }

  useEffect(() => {
    async function fetchData() {
        const data = await get_objects_all(orderBy, orderDirection=="desc");
        setAllPages(data);
        console.log(data)
    }
    
    fetchData();
  }, [orderBy, orderDirection]);

  if (allPages.length === 0){
    return <p>Ingen ting å se her 🙈 HS må gå</p>;
  }

  return (
    <div className={styles.container}>
        <div className={styles.buttonContainer}>
            <button className={styles.knapp} onClick={prevPage}>Forrige</button>
            <p className={styles.sidetall}>{pageNumber + 1}/{allPages.length}</p>
            <button className={styles.knapp} onClick={nextPage}>Neste</button>
        </div>

        <div className={styles.sortContainer}>
            <p>Sorter etter:</p>
            <select className={styles.dropDown} value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                <option value="price">Pris</option>
                <option value="numberOfBids">Antall bud</option>
            </select>
            <select className={styles.dropDown} value={orderDirection} onChange={(e) => setOrderDirection(e.target.value)}>
                <option value="asc">Stigende</option>
                <option value="desc">Synkende</option>
            </select>
        </div>

        <ItemsPageComponent allPages={allPages} currentPageNumber={pageNumber} />
        <div className={styles.buttonContainer}>
            <button className={styles.knapp} onClick={prevPage}>Forrige</button>
            <p className={styles.sidetall}>{pageNumber + 1}/{allPages.length}</p>
            <button className={styles.knapp} onClick={nextPage}>Neste</button>
        </div>    
    </div>
  );
}

// A bit of a ugly solution
export default function AuctionItemsPageWrapper() {
    return <Suspense fallback="Laster inn..."><AuctionItemPage /></Suspense>
}