"use client"
import style from "./component.module.scss"


function signout() {
    console.log("executing logging out...")
}

export function SignoutButton(){

    return<button className={style.signoutButton} onClick={signout}>Logg ut</button>
}