import Image from "next/image"
import omegalogo from "../public/omegalogo.png"
import style from "./component.module.css"

export function Logo() {

    return (
        <div>
            <Image src={omegalogo} alt="logo" layout="responsive" />
        </div>
    );

}