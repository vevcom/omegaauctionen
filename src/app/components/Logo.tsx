import Image from "next/image"
import omegalogo from "../public/omegalogo.png"
import style from "./component.module.css"

export function Logo() {
    const source = "https://omega.ntnu.no/static/8cb2cc79536a03aeaa04.png";

    return (

            <img src={source} alt="logo" />

    );

}