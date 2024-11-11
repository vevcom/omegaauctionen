import {Logo} from "./Logo"
import style from "./component.module.css"
import { oldEnglish} from "../layout"
import { Loginbtn } from "./loginbutton"

export function Banner() {

    return <><div className={`${style.banner} old-english`}>
        <div className={`${style.bannerElement} ${style.bannerLeft}`}><p>Logo her</p></div>
        <div className={`${style.bannerElement} ${style.bannerCenter}`}><a href="/">Omegaauctionen 2025</a></div>
        <div className={`${style.bannerElement} ${style.bannerRight}`}><Loginbtn></Loginbtn></div>
        </div>
        </>
}