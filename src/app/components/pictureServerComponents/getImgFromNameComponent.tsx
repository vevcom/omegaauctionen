"use client";

export default function ImageFromFileName({ filename }: { filename: string }) {
    const serverIP =  process.env.NEXT_PUBLIC_PICTURE_SERVER_URL
    const imagePath = serverIP + '/image/'+filename


    return (
        <img className="auctionImage" src={imagePath}></img>
    );
}
