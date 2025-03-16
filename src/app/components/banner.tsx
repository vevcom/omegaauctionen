"use client"
import style from "./components.module.scss"
import { Loginbtn } from "./loginbutton"
import { oldEnglish } from "../layout"

export function Banner({toggle_overlay}:{toggle_overlay:()=>void;}) {

    return <><div className={`${style.banner}  ${oldEnglish.className}`}>
        <div onClick={toggle_overlay} className={`${style.bannerElement} ${style.bannerLeft} `}><div className={`${style.imagecontainer}`}><img src='https://i.imgur.com/6XjOtdA.png' alt="menuIcon"></img></div></div>
        <div className={`${style.bannerElement} ${style.bannerCenter}`}><a href="/">Omegaauctionen 2025</a></div>
        <div className={`${style.bannerElement} ${style.bannerRight}`}><Loginbtn></Loginbtn></div>
        </div>
        </>
}
