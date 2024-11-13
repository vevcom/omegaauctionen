import style from "./components.module.css"
import { Loginbtn } from "./loginbutton"
import { oldEnglish } from "../layout"

export function Banner() {

    return <><div className={`${style.banner}  ${oldEnglish.className}`}>
        <div className={`${style.bannerElement} ${style.bannerLeft} `}></div>
        <div className={`${style.bannerElement} ${style.bannerCenter}`}><a href="/">Omegaauctionen 2025</a></div>
        <div className={`${style.bannerElement} ${style.bannerRight}`}><Loginbtn></Loginbtn></div>
        </div>
        </>
}
