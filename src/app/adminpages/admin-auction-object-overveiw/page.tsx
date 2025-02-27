"use client";
import React, { useState, useEffect } from "react";
import ItemPageComponent from "@/app/examples/pages/auctionObjectTestPageVersion2/items-component"; //TODO: replace with actual page loading
import get_objects_all from "@/app/components/get-auction-objects/get-objects";
import is_admin from "@/app/components/is-admin/is-admin-func";



export default function App() {
    const [pageNumber, setPageNumber] = useState(0);
    const [allPages, setAllPages] = useState([]);
    const [loadAdminPage, setLoadAdminPage] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const is_admin_response =await is_admin()
            setLoadAdminPage(is_admin_response)
            const pageData = await get_objects_all("",false,is_admin_response);
            setAllPages(pageData);
        }
        fetchData();
    }, []);

    if (loadAdminPage) {
        return (
            <div>
                <p>{pageNumber + 1}/{allPages.length}</p>
                <button onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
                <button onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
                <ItemPageComponent allPages={allPages} currentPageNumber={pageNumber} />
                <button onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
                <button onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
            </div>
        );
    }
    return (<p>Du er ikke admin :/</p>)
}
