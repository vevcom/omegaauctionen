"use client"
import { useState } from "react";
import style from "./components.module.scss"

export function Overlay({overlay_width,toggle_overlay,links}:{overlay_width:string,toggle_overlay:()=>void,links:Array<Array<string>>}) {
    
    
    return <div className={style.overlayBackground} style={{width:overlay_width}} onClick={toggle_overlay}>
        <div className={style.overlay} style={{width:overlay_width}} onClick={(e)=>{e.stopPropagation()}}>
        <span className={style.closebtn} onClick={toggle_overlay}>&#10006;</span>
        <div className={style.overlayContent}  onClick={toggle_overlay}>
            {links.map((item) => (<a href={item[0]} key={item[1]}>{item[1]}</a>))}
        </div>
        </div>
        </div>
}

