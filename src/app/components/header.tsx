import {Navbar} from "@/app/components/Navbar";
import {Banner} from "@/app/components/banner";
import {Overlay} from "@/app/components/overlay";
import { useState } from "react";

export function Header() {
    const [overlay_width,set_overlay_width] = useState("0");
      const toggle_overlay_width = () =>{
        console.log(overlay_width);
        switch (overlay_width) {
            case "0":
                set_overlay_width("100%");
                break;
            default:
                set_overlay_width("0");
                break;
        }
      }    
      const links = [["/auction","Auksjonsobjekter","Auksjon"], ["/program","Program","Program"], ["/beermile","Beermile","Beermile"],["/put-item-for-auction","Legg ut for salg"],["/statistics","Statistikk"],["/charity","Årets veldedighet"],["/about","Om auksjonen"],["/",""]]

    return <>
        <Overlay overlay_width={overlay_width} toggle_overlay={toggle_overlay_width} links={links}></Overlay>
        <div>
          <Banner toggle_overlay={toggle_overlay_width}></Banner>
          <Navbar all_links={links}></Navbar>
        </div>
    
    </>
}