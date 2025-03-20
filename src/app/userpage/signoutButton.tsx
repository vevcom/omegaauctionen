'use client'
import style from "./component.module.scss"
import { oldEnglish } from "../layout";
import { signOut } from "next-auth/react";


export function SignoutButton() {
    return <div className={`${style.signoutbutton} ${oldEnglish.className}`} onClick={() => signOut({ callbackUrl: '/' })}>Logg ut</div>
}
