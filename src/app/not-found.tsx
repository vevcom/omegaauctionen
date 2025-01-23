import style from "./page.module.scss"
import { oldEnglish } from "./layout"


export default function Custom404Error() {    

    return (<div className={style.errorPage}>
        <div className={`${oldEnglish.className} ${style.error404}`}>404</div>
        <h2 className={style.errorText}>Ups! Siden finnes ikke. Prøv menyen for å finne det du leter etter.</h2>
    </div>
)
}