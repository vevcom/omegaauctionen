
import localFont from "next/font/local";
import "./globals.css";
import {Navbar} from "@/app/components/Navbar";
import {Banner} from "./components/banner";
import styles from "./page.module.css";
import {Logo} from "./components/Logo";


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
      <body className={`${oldEnglish.variable}`}>
        <div className={styles.relative}>
          <Banner></Banner>
          <Navbar></Navbar>
          {/* <div className={styles.logocontainer}>
            <div className={styles.logobackground}>
              <Logo></Logo>
            </div>
          </div> */}
        </div>

        {children}
      </body>
    </html>
  );
}
