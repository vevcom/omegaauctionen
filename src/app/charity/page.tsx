import style from "./page.module.scss"

export default function Charity() {

    return<>
    <div className={style.titleCard}>
        <h1 style={{marginTop:"2vw"}}>Gi effektivt: New Incentives</h1>
        <p className={style.tekst}> I år samarbeider Sanctus Omegas Broderskap igjen med Gi Effektivt. Gi Effektivt er en veldedig organisasjon som jobber med å gjøre det enkelt og effektivt å gi penger til humanitære saker. I år går pengene til prosjektet New Incentives:</p>

        <h2 className={style.underTittle}>New Incentives</h2>
        <p className={style.tekst}>New Incentives tilbyr små kontantoverføringer til foreldre som tar med seg spedbarna sine til klinikkene for å fortsette vaksinasjonsplanen til riktig tid. Kontantoverføringene for seks besøk er på totalt 11 000 Naira, noe som tilsvarer rundt 7 dollar, og er nok til å dekke transportkostnadene og tapt inntekt. Slik øker de vaksinasjonsgraden i området. New Incentives jobber også med informasjonskampanjer rundt hvor viktig vaksinasjon er, samt å utbedre svake punkter i forsyningskjeden for vaksiner..</p>
        
        <p className={style.tekst}>New Incentives er en raskt voksende organisasjon. Siden oppstarten har de registrert nesten 3 millioner spedbarn i programmet sitt, hvorav 1,5 million var i 2023 alene. I dag opererer de i ni forskjellige stater på over 5000 forskjellige klinikker.</p>
        <div className={style.picHolder}>

        <img className={style.image} src="https://cdn.sanity.io/images/vf0df6h3/production/80e66a33133af398e7be23bea8e46510acd2ee78-1550x696.png?auto=format&dpr=1&fit=max&q=80&w=775"></img>
        <p className={style.underSrkiftTekst}>Feltarbeider Abubakar Aliyu verifiserer at riktig vaksine er gitt og forsørgeren kvalifiserer til kontantoverføring.Foto: New Incentives</p>
        </div>
        
        <p className={style.tekst}>Bistandsevaluatoren GiveWell estimerer at det koster omtrent 1700 kr å sørge for at et ekstra barn blir vaksinert, og at New Incentives sitt program i gjennomsnitt redder et liv for rundt 50 000 kr.</p>
        <a className={style.linkToWb} href="https://gieffektivt.no/new-incentives">Les mer her https://gieffektivt.no/new-incentives</a>
    </div>
    
    </>
}