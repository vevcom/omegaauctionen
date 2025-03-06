"use client";
import React, { useState, useEffect } from "react";
import ItemsPageComponent from "@/app/components/items-show-page/items-show-component";
import get_objects_all from "@/app/components/get-auction-objects/get-objects";
import { AuksjonsObjekt } from "@prisma/client";

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

  return (
    <div>
      <p>{pageNumber + 1}/{allPages.length}</p>
      <button onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
      <button onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
      <ItemsPageComponent allPages={allPages} currentPageNumber={pageNumber} />
      <button onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
      <button onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
    </div>
  );
}