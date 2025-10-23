"use client";

export default function ImageFromFileName({ filename,style }: { filename: string,style:any }) {
    // const serverIP =  process.env.NEXT_PUBLIC_PICTURE_SERVER_URL
    const serverIP = "http://127.0.0.1:5000" //TODO: Switch back to https://auctionen.omega.ntnu.no:42069 before prod or fix env variables for prod
    const imagePath = serverIP + '/image/'+filename


    return (
        <img alt={filename} className={style} src={imagePath}></img>
    );
}
