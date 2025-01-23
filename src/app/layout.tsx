"use client"
import localFont from "next/font/local";
import "./globals.scss";
import style from "./page.module.scss"
import {Header} from "@/app/components/header";



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

  return (
    <html lang="no">
      <head>
        <title>Omegaauctionen 2025</title>
        <link rel="icon" type="image/x-icon" href="https://omega.ntnu.no/static/5464f8aa22cd89d8b7e4.png"></link>
      </head>
      <body>
        <Header></Header>
        <div className = {style.page}>
          {children}
        </div>
      </body>
    </html>
  );
}
