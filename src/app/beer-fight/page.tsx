"use client"

import { useEffect, useState } from "react";
import { getPrices } from "../components/beer-fight/beer-fight-api";
import BeerFightGraph from "../components/beer-fight/graf";
import BeerInput from "../components/beer-fight/input";
import styles from "./page.module.scss"



export default function Hansafight() {
    // Hansa at index 0, ikkeHansa at index 1
    const [prices, setPrices] = useState([0, 0])
    const [hasLoaded, setHasLoaded] = useState(false)
    const [reload, setReload] = useState(false)
    const [isTime, setIsTime] = useState(false)
    useEffect(() => {
        async function loadPrices() {
            const priceResponse = await getPrices()
            setPrices(priceResponse)
            setHasLoaded(true)
            console.log(prices)

            const now = new Date()
            const start = new Date("2025-03-20T16:00:00.000Z")
            const end = new Date("2025-03-20T22:00:00.000Z")
            if (now>start){
                if (now<end){
                    setIsTime(true)
                    
                }
            }
            
            // setIsTime(true)
        }
        loadPrices()
    }, [reload])
    
    if (!hasLoaded) {
        return <p>Laster...</p>
    }
    
    const now = new Date()
    const start = new Date("2025-03-20T16:00:00.000Z")
    const end = new Date("2025-03-20T22:00:00.000Z")
    if (!isTime) {
        if (now>end){
            return <p className={styles.title}>Det er desverre over for å år.Poengene ble: <br></br>  For Hansa {prices[0]} stemmer <br></br> mot Hansa: {prices[1]} stemmer</p>
        }
        if (now <start){
            return <p className={styles.title}>Det åpner ikke før 17:00</p>
        }
        
    }

    if (prices[0] > prices[1]) {


        return (<div className={styles.mainDiv}>
            <div className={styles.titleCard}>
                <h1 className={styles.title}>Oensker eder Hansa i kioelesgabet?</h1>
                <h2 className={styles.info}>Eller gjør det deg sint. Grr. Nå kan du bestemme! 1kr=1 stemme! Stem på det du vil. Den med flest stemmer vinner!</h2>
            </div>
            <h2 className={styles.leadingInfo}><b>Hansa leder!</b></h2>
            <div className={styles.optionBoxHolder}>

                <div className={`${styles.optionBox} ${styles.winning}`}>
                    <h1 className={styles.voteName}>For Hansa</h1>
                    <BeerFightGraph object="Hansa" price={prices[0]} />
                    <BeerInput setReload={setReload} reload={reload} object="Hansa"></BeerInput>
                </div>

                <div className={styles.optionBox}>
                    <h1 className={styles.vsText}>VS</h1>
                </div>
                <div className={`${styles.optionBox} ${styles.losing}`}>
                    <h1 className={styles.voteName}>Mot Hansa</h1>
                    <BeerFightGraph object="IkkeHansa" price={prices[1]} />
                    <BeerInput setReload={setReload} reload={reload} object="IkkeHansa"></BeerInput>
                </div>
            </div>
        </div>);
    }
    else if ((prices[0] < prices[1])) {

        return (<div className={styles.mainDiv}>
            <div className={styles.titleCard}>
                <h1 className={styles.title}>Oensker eder Hansa i kioelesgabet?</h1>
                <h2 className={styles.info}>Eller gjør det deg sint. Grr. Nå kan du bestemme! 1kr=1 stemme! Stem på det du vil. Den med flest stemmer vinner!</h2>
            </div>
            <h2 className={styles.leadingInfo}><b>Hansa taper!</b></h2>
            <div className={styles.optionBoxHolder}>

                <div className={`${styles.optionBox} ${styles.losing}`}>
                    <h1 className={styles.voteName}>Hansa</h1>
                    <BeerFightGraph object="Hansa" price={prices[0]} />
                    <BeerInput setReload={setReload} reload={reload} object="Hansa"></BeerInput>
                </div>

                <div className={styles.optionBox}>
                    <h1 className={styles.vsText}>VS</h1>
                </div>
                <div className={`${styles.optionBox} ${styles.winning}`}>
                    <h1 className={styles.voteName}>Mot Hansa</h1>
                    <BeerFightGraph object="IkkeHansa" price={prices[1]} />
                    <BeerInput setReload={setReload} reload={reload} object="IkkeHansa"></BeerInput>
                </div>
            </div>
        </div>);

    }
    return (<div className={styles.mainDiv}>
        <div className={styles.titleCard}>
            <h1 className={styles.title}>Oensker eder Hansa i kioelesgabet?</h1>
            <h2 className={styles.info}>Eller gjør det deg sint. Grr. Nå kan du bestemme! 1kr=1 stemme! Stem på det du vil. Den med flest stemmer vinner!</h2>
        </div>
        <div className={styles.optionBoxHolder}>

            <div className={styles.optionBox}>
                <h1 className={styles.voteName}>For Hansa</h1>
                <BeerFightGraph object="Hansa" price={prices[0]} />
                <BeerInput setReload={setReload} reload={reload} object="Hansa"></BeerInput>
            </div>

            <div className={styles.optionBox}>
                <h1 className={styles.vsText}>VS</h1>
            </div>
            <div className={styles.optionBox}>
                <h1 className={styles.voteName}>Mot Hansa</h1>
                <BeerFightGraph object="IkkeHansa" price={prices[1]} />
                <BeerInput setReload={setReload} reload={reload} object="IkkeHansa"></BeerInput>
            </div>
        </div>
    </div>);

}
