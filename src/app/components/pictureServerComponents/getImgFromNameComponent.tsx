"use client";

import { pictureServerSource } from "./pictureServerIp";

export default function ImageFromFileName({ filename,style }: { filename: string,style:any }) {
    // const serverIP =  process.env.NEXT_PUBLIC_PICTURE_SERVER_URL
    const serverIP = pictureServerSource
    const imagePath = serverIP + '/image/'+filename


    return (
        <img alt={filename} className={style} src={imagePath}></img>
    );
}
