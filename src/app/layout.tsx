"use client"
import localFont from "next/font/local";
import "@/styles/globals.scss";
import style from "./page.module.scss"
import {Header} from "@/app/components/header";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

export const oldEnglish = localFont({
  src: "./fonts/OldEnglishFive.woff",
  variable: "--font-english-five",
  weight: "12 18 24 36 48 60 72",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
  // const links = [["/auction","Auksjonsobjekter","Auksjon"], ["/program","Program","Program"], ["/beermile","Beermile","Beermile"],["/put-item-for-auction","Legg ut for salg"],["/statistics","Statistikk"],["/charity","Årets veldedighet"],["/about","Om auksjonen"],["/",""]]


  return (
    <SessionProvider>
    <html lang="no">
      <head>
        <title>Omegaauctionen 2026</title>
        {/* <link rel="icon" type="image/x-icon" href="https://omega.ntnu.no/static/5464f8aa22cd89d8b7e4.png"></link> */}

        <link rel="icon" type="image/png" sizes="32x32" href="https://omega.ntnu.no/static/favicon.png"></link>
        <link rel="apple-touch-icon" sizes="512x512" href="https://omega.ntnu.no/static/icon_512x512.546e2b5b0d39ea55ebaca438b8611e33.png"></link>
        <link rel="shortcut icon" href="https://omega.ntnu.no/static/favicon.png"></link>
      </head>
      <body>
        <Header></Header>
        <div className = {style.page}>
          {children}
        </div>
      </body>
    </html>
    </SessionProvider>
  );
}
