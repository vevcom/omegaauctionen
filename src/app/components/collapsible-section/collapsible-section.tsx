"use client"

import { useState } from "react"
import styles from "./collapsible-section.module.scss"




export default function CollapsibleSection({ content, title, defaultOpen = true }: { content: React.JSX.Element, title: string, defaultOpen: boolean }) {
    const [isExpanded, setIsExpanded] = useState(defaultOpen)

    function toggle() {
        setIsExpanded(!isExpanded)
    }
    return (
        <div className={styles.container}>
            <div className={styles.toggleDiv} onClick={() => (toggle())}>
                <img
                    className={`${styles.arrow} ${isExpanded ? styles.down : styles.right}`}
                    width="20px"
                    height="20px"
                    src="/expandArrow.svg"
                >

                </img>
                <h3 className={styles.title}>{title}</h3>
            </div>
            {
                isExpanded
                    ?
                    content
                    :
                    <></>
            }
        </div>
    )
}