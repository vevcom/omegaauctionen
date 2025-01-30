"use client";

export default function ImageFromFileName({ filename }: { filename: string }) {
    const serverIP = 'http://127.0.0.1:5000'
    const imagePath = serverIP + '/image/'
    return (

        <img className="auctionImage" src={imagePath + filename}></img>
    );
}
