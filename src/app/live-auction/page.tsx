"use client";
import React, { useState, useEffect } from "react";
import ItemPageComponent from "@/app/components/items-show-page/items-show-component";
import get_objects_all from "@/app/components/get-auction-objects/get-objects";
import style from "./page.module.scss"



export default function App() {
    const [pageNumber, setPageNumber] = useState(0);
    const [allPages, setAllPages] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const pageData = await get_objects_all("", false, false, "live");
            setAllPages(pageData);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1 className={style.headLine}>Kjøp live!</h1>
            <h3 className={style.promoText}> Oi oi oi. Det selges ting live! Da kan du møte opp og by live! Akkurat som storage wars!(Omega gir ingen garanti på liveauksjonens likhet til det amerikanske TV-programmet storage wars). Møt opp i EL5.

                {/* <br></br>
                Pulje 1: __tid__
                <br></br>
                Pulje 2: __tid__
                <br></br>
                Pulje 3: __tid__
                <br></br>
                Pulje 4: __tid__ */}
            </h3>
            {allPages.length === 0 ? <p className={style.tekst}>Laster...</p> : <div>
            <div className={style.buttonContainer}>
                <button className={style.knapp} onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
                <p className={style.sidetall}>{pageNumber + 1}/{allPages.length}</p>
                <button className={style.knapp} onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
            </div>
            <ItemPageComponent pageTitle="Live auksjoner" allPages={allPages} currentPageNumber={pageNumber} />
            <div className={style.buttonContainer}>
                <button className={style.knapp} onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
                <p className={style.sidetall}>{pageNumber + 1}/{allPages.length}</p>
                <button className={style.knapp} onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
            </div>
            </div>}
        </div>
    );
}
