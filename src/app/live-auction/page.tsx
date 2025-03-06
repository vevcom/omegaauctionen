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
            <h3 className={style.promoText}> Oi oi oi. Det selges ting live! Da kan du møte opp og by live! Akkuratt som storage wars!(Vevcom gir ingen garanti på liveauksjonens likhet til det amerikanske tv programmet storage wars). Møt opp __sett_inn_sted___</h3>
            {/* <!-- TODO: add place --> */}
            <p>{pageNumber + 1}/{allPages.length}</p>
            <button onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
            <button onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
            <ItemPageComponent pageTitle="Live auksjoner" allPages={allPages} currentPageNumber={pageNumber} />
            <button onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
            <button onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
        </div>
    );
}
