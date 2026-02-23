'use client'
import { usePathname } from "next/navigation";
import style from "./components.module.scss"

export function Navbar({all_links}:{all_links:Array<Array<string>>}) {
    const pathname = usePathname();
    const page = pathname.split('/').pop();
    
    const links = [all_links[0],all_links[1],all_links[2],all_links[3]];

    const currentPage = (link:string) => {
        return link.split('/').pop() == page;
    }

    return <nav className={style.navbar}>
        {links.map((item, i) => (<a className={`${style.navbarItems} ${currentPage(item[0]) ? style.currentPage : style.notCurrentPage}`} href={item[0]} key={i}>{item[2]}</a>))}
    </nav>
}


