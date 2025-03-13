import BeerInput from "../components/beer-fight/input";
import styles from "./page.module.scss"




export default function Hansafight() {


    return (<div className={styles.mainDiv}>
        <div className={styles.titleCard}>
            <h1 className={styles.title}>Oensker do Hansa i kioeleskapet?</h1>
            <h2 className={styles.info}>Eller gjør det deg sint. Grr. Nå kan du bestemme! 1kr=1 stemme! Stem på det du vil. Den med flest stemmer vinner!</h2>
        </div>
        <div className={styles.optionBox}>
            <BeerInput object="Hansa"></BeerInput>
            <BeerInput object="IkkeHansa"></BeerInput>
        </div>
    </div>);
}
