"use client";
import React, { useState, useEffect } from "react";
import ItemPageComponent from "@/app/components/items-show-page/items-show-component";
import get_objects_all from "@/app/components/get-auction-objects/get-objects";
import { AuksjonsObjekt} from "@prisma/client";

import style from "./page.module.scss"



export default function App() {
    const [pageNumber, setPageNumber] = useState(0);
    const [allPages, setAllPages] = useState<AuksjonsObjekt[][]>([]);

    useEffect(() => {
        async function fetchData() {
            const pageData = await get_objects_all("", false, false, "salg");
            setAllPages(pageData);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1 className={style.headLine}>Kjøp kapper!</h1>
            <h3 className={style.promoText}>Hatter er megakule ikoner du kan kjøpe til veven! La alle se hvor kul du er og skaff deg en kappe du og. Alle vil se denne fete addisjonen til profilen din! Hva venter du på? Det går faktisk tom! Skill deg ut, kjøp en kappe nå! </h3>
            <p>{pageNumber + 1}/{allPages.length}</p>
            <button onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
            <button onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
            <ItemPageComponent pageTitle="Kapper" allPages={allPages} currentPageNumber={pageNumber} />
            <button onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
            <button onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
        </div>
    );
}
