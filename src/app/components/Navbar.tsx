
import style from "./components.module.scss"

export function Navbar() {
    const links = [["/","Auksjon"], ["/","Program"], ["/","Beermile"],["/about","Om"]]

    return <nav className={style.navbar}>

            {links.map((item) => (<a className={style.navbarItems}href={item[0]} key={item[1]}>{item[1]}</a>))}
            </nav>
}


