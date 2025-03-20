import style from "./page.module.scss"

// TODO hvilken veldedigjey????
export default function about() {
    return <div className={style.content}>
        <h1>Om Omegaauctionen</h1>
        <h2 className={style.subSection}>Generell informasjon</h2>
        <p className={style.explainationText}>Omegauksjonen er en årlig, veldedig auksjon arrangert av linjeforeningen Sanctus Omega Broderskab. I år går pengene til Gi effektivt: Malariamedisin. Auksjonsnettsiden er laget fra grunnen av alle de nye i vevcom (nettsidekomiteen til Omega). I tillegg til en online auksjon er det en liveauksjon med mye spennende. Under finner du generell info og instrukser for hvordan du legger noe ut for salg</p>
        <h2 className={style.subSection}>Hvordan legger jeg noe ut?</h2>
        <div className={style.howSaleDiv}>
            <ol className={style.howSaleList}>
                <li>Logg deg inn.</li>
                <li>Gå til "legg ut for salg" siden.</li>
                <li>Fyll ut informasjonen.</li>
                <li><b>Ikke glem</b> å laste opp et bilde.</li>
                <li>
                    <ol className={style.nestedhowSaleList}>
                        <li>Trykk på "browse" knappen.</li>
                        <li>Velg et bilde.</li>
                        <li>Trykk på den turkise "last opp" knappen.</li>
                        <li>Hvis det funket burde det nye bildet komme opp.</li>
                    </ol>
                </li>
                <li>Se over og trykk på send inn.</li>
                <li><b>Vent</b>. Våre administratorer går gjennom og fjerner upassende innsendinger.</li>
            </ol>
        </div>
        <h2 className={style.subSection}>Hvordan betaler jeg?</h2>
        <p className={style.explainationText}>Når du logger inn lagres navn og skolemail. Ved auksjonens slutt danner vi en betalingsliste og kontakter deg for betaling. Selve betalingen skjer over vipps. <b>DU SKAL IKKE</b> vippse til personen som har lagt ut det du har kjøpt. Alle pengene går direkte til Sanctus Omega Broderskab for så å bli overført videre til den veldedige årsaken.</p>
        <h2 className={style.subSection}>Hvilken informasjon lagrer vi?</h2>
        <p className={style.explainationText}>Vi lagrer minst mulig informasjon om deg. Ved registrering lagres navn og skolemail. Alle bud, opplastede bilder, osv. lagres også. Vi beholder disse opplysningene frem til auksjonens slutt og betalingslisten er dannet. Etter dette sletter vi alt av personlig informasjon</p>
        <h2 className={style.subSection}>Hvordan byr jeg?</h2>
        <p className={style.explainationText}>Enkelt! Bare logg inn, trykk på det du vil by på og legg inn et bud</p>
        <h2 className={style.subSection}>Hvem kan delta?</h2>
        <p className={style.explainationText}>Alle med feidebruker innad NTNU. Auksjonen er primært for medlemmer av omega, men hvis du har en NTNU-bruker er du velkommen til å delta! :)</p>
        <h2 className={style.subSection}>Lei av å tape auksjonen øyeblikket den slutter?</h2>
        <p className={style.explainationText}>Ikke denne gangen! Bud stenger normalt 23:00, men! Hvis noen byr rett før tiden er ute, utsettes tiden med 5min. Hvis noen byr rett før den nye fristen øker tiden igjen! <b>Merk!</b> Grunnet begrensninger går ikke utsettelsene for alltid</p>

    </div>
}