"use client";

export default function ImageFromFileName({ filename, styleComponent }: {
    filename: string, styleComponent: {
        readonly [key: string]: string;
    }
}) {
    /*
    Filname : filename of the picture you want to find. Get it from the database
    Stylecomponent : for styling the element. add the style from the line "import style from "style.module.scss"
    */
    const serverIP = 'http://127.0.0.1:5000'
    const imagePath = serverIP + '/image/'
    return (

        <img className={`${styleComponent ? styleComponent.auctionImage : ""}`} src={imagePath + filename}></img>
    );
}
