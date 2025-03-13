import { getPrices } from "../components/beer-fight/beer-fight-api";
import BeerFightGraph from "../components/beer-fight/graf";
import BeerInput from "../components/beer-fight/input";
import styles from "./page.module.scss"



export default async function Hansafight() {
    // Hansa at index 0, ikkeHansa at index 1
    let prices = await getPrices()
    
    return (<div className={styles.mainDiv}>
        <div className={styles.titleCard}>
            <h1 className={styles.title}>Oensker eder Hansa i kioelesgabet?</h1>
            <h2 className={styles.info}>Eller gjør det deg sint. Grr. Nå kan du bestemme! 1kr=1 stemme! Stem på det du vil. Den med flest stemmer vinner!</h2>
        </div>
        <div className={styles.optionBox}>
            <BeerFightGraph object="Hansa" price={prices[0]} />
            <BeerFightGraph object="IkkeHansa" price={prices[1]} />
            <BeerInput object="Hansa"></BeerInput>
            <BeerInput object="IkkeHansa"></BeerInput>
        </div>
    </div>);
}
