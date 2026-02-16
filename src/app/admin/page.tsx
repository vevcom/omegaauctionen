"use server"

import styles from "./page.module.scss"
import Link from "next/link"
import is_admin from "@/app/components/is-admin/is-admin-func"
import is_miniadmin from "@/app/components/is-miniadmin/is-miniadmin"


const adminLinks = [["Ikke godkjente objekter", "submitted_objects"]]
const miniAdminLinks = [
    ["Registrer beermile", "manual-reg-pages/beermile-lodd"],
    ["Registrer bong", "manual-reg-pages/bong"],
    ["Registrer live", "manual-reg-pages/live"],
    ["Registrer lykkehjul", "manual-reg-pages/lykkehjul"],
    ["Registrer lodd", "manual-reg-pages/trekk-lodd"],
]

export default async function AdminPanel() {
    const isAdmin = await is_admin()
    const isMiniAdmin = await is_miniadmin()
    if (isAdmin || isMiniAdmin) {
        return (
            <div>
                {isAdmin
                    ?
                    <div>

                        <h1>Admin</h1>
                        {adminLinks.map((link, index) => (
                            <Link className={styles.pageLink} href={"/admin/admin/" + link.at(1)} key={index}>{link.at(0)}</Link>
                        ))
                        }
                    </div>
                    :
                    null
                }
                {isMiniAdmin
                    ?
                    <div>
                        <h1>Mini admin</h1>
                        {miniAdminLinks.map((link, index) => (
                            <Link className={styles.pageLink} href={"/admin/miniAdmin/" + link.at(1)} key={index}>{link.at(0)}</Link>
                        ))
                        }
                    </div>
                    :
                    null
                }


            </div>
        )
    }
    return (
        <h1>Har du ikke tilgang, men du burde? Sjekk at du er logget inn. Hvis du er det send mail til Vevcom</h1>
    )
}