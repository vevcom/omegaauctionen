'use client'
import { useRouter } from "next/navigation";
import style from "./component.module.scss"
import { oldEnglish } from "../layout";


export function SignoutButton() {
    const router = useRouter();


    return <div className={`${style.signoutbutton} ${oldEnglish.className}`} onClick={()=>{router.push("/api/auth/signout")}}>Logg ut</div>
}
