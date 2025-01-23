"use client"
import localFont from "next/font/local";
import "./globals.scss";
import {Navbar} from "@/app/components/Navbar";
import {Banner} from "./components/banner";
import {Overlay} from "@/app/components/overlay";
import style from "./page.module.scss"
import { useState } from "react";


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
  const links = [["/auction","Auksjonsobjekter","Auksjon"], ["/program","Program","Program"], ["/beermile","Beermile","Beermile"],["/sellItems","Legg ut for salg"],["/statistics","Statistikk"],["/charity","Årets veldedighet"],["/about","Om auksjonen"],["/",""]]


  return (
    <html lang="no">
      <head>
        <title>Omegaauctionen 2025</title>
        <link rel="icon" type="image/x-icon" href="https://omega.ntnu.no/static/5464f8aa22cd89d8b7e4.png"></link>
      </head>
      <body>
        <Overlay overlay_width={overlay_width} toggle_overlay={toggle_overlay_width} links={links}></Overlay>
        <div>
          <Banner toggle_overlay={toggle_overlay_width}></Banner>
          <Navbar all_links={links}></Navbar>
        </div>
        <div className = {style.page}>
          {children}
        </div>
      </body>
    </html>
  );
}
