"use client";
import React, { useState, useEffect } from "react";
import ItemPageComponent from "./items-component";
import get_objects_all from "@/app/components/get-auction-objects/get-objects";

export default function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [allPages, setAllPages] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const data = await get_objects_all("");
      setAllPages(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>{pageNumber+1}/{allPages.length}</p>
      <button onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
      <button onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
      <ItemPageComponent allPages={allPages} currentPageNumber={pageNumber} />
      <button onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}>Forrige</button>
      <button onClick={() => setPageNumber((prev) => Math.min(allPages.length - 1, prev + 1))}>Neste</button>
    </div>
  );
}
