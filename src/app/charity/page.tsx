import style from "./page.module.scss"

export default function Charity() {

    return<>
    <div className={style.titleCard}>
        <h1 style={{marginTop:"2vw"}}>Gi effektivt: Malariamedisin</h1>
        <p className={style.tekst}> I år samarbeider Sanctus Omegas Broderskap igjen med Gi Effektivt. Gi Effektivt er en veldedig organisasjon som jobber med å gjøre det enkelt og effektivt å gi penger til humanitære saker. I år går pengene til prosjektet Malaria Consortium:</p>

        <h2 className={style.underTittle}>Malaria Consortium</h2>
        <p className={style.tekst}>Malaria Consortium jobber med å forebygge dødsfall fra malaria ved å dele ut forebyggende medisin i områder med høy smitte i Afrika sør for Sahara. Barn mellom 3 måneder og 5 år får fire til fem runder medisin i løpet av høysesongen for smitte.</p>
        
        <p className={style.tekst}>Slik behandling er en veldig kostnadseffektiv måte å forhindre malaria, men det er svært lite sannsynlig at barn i målgruppen har tilgang til denne medisinen uten egne tiltak som støtter forsyningen. I tillegg viser forskning at beskyttelse mot malaria kan ha positive effekter på andre faktorer senere i livet, som for eksempel økt inntekt.</p>
        <div className={style.picHolder}>

        <img className={style.image} src="https://cdn.sanity.io/images/vf0df6h3/production/d6f3cf833a539570087d432de13ec5258cfed2ac-1239x820.png?w=3840&q=75&fit=clip&auto=format"></img>
        <p className={style.underSrkiftTekst}>En omsorgsperson administrerer en dose med forebyggende malariamedisin til et barn i Burkina Faso. Foto: Sophie Garcia / Malaria Consortium</p>
        </div>
        
        <p className={style.tekst}>Det koster 60 til 70 kroner å beskytte et barn mot malaria i en sesong, og bistandsevaluatoren GiveWell estimerer at Malaria Consortium sitt program for å dele ut forebyggende medisin mot malaria i gjennomsnitt redder et liv for rundt 50 000 kroner.</p>
        <a className={style.linkToWb} href="https://gieffektivt.no/malaria-consortium">Les mer her https://gieffektivt.no/malaria-consortium</a>
    </div>
    
    </>
}