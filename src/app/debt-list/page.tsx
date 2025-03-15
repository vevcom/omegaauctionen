"use client";

import { useEffect, useState } from "react";
import generateDebtReport from "./generateDebtList";
import style from "./page.module.scss"

export default function DownloadAuctionData() {
    const [auctionData, setAuctionData] = useState("");


    useEffect(() => {
        async function compile() {
            const compileResponse = await generateDebtReport()
            if (!compileResponse) {
                alert("noe gikk galt")
                return;
            }
            setAuctionData(compileResponse)
        }
        compile()
    }, [])

    const downloadFile = () => {
        const blob = new Blob([auctionData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "auction-data.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (auctionData === "") {
        return <p>Komplimerer data. Dette kan ta en stund...</p>
    }
    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <button
                onClick={downloadFile}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Download Auction Data
            </button>
            <div className={style.reportDiv}>
                {auctionData.split("\n").map((text) => (
                    <div>
                        {text.includes("\t")
                            ?
                            <p> &emsp; {text}</p> :
                            <p>{text}</p>
                        }
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}
