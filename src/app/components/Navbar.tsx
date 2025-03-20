
import style from "./components.module.scss"

export function Navbar({all_links}:{all_links:Array<Array<string>>}) {
    const links = [all_links[0],all_links[1],all_links[2]];

    return <nav className={style.navbar}>
        {links.map((item, i) => (<a className={style.navbarItems}href={item[0]} key={i}>{item[2]}</a>))}
    </nav>
}


