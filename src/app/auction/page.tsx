import style from "./page.module.scss"



export default function AuctionPage() {


    return <>
    <div className={style.titleCard}>
        <h2>Auksjonsobjekter</h2>
        <p style={{padding:"10vw",textAlign:"left"}}>Trenger du ekstra øvingstimer i et fag? Kanskje har du alltid drømt om privat midtsidebilde? 
            Eller ønsker du å være den stolte eier av et diamant-badge på Veven? Kanskje privat bed-pres med
            Contactor? Det finnes ingen grenser for hva du kan skaffe på Omegaauctionen!
        </p>
    </div>

    <div style={{display:"flex",flexWrap:"wrap",width:"80vw",marginTop:"10vw"}}>
        <div style={{backgroundColor:"var(--lightblue)",width:"15vw",height:"20vw",margin:"2vw"}}></div>
        <div style={{backgroundColor:"var(--orange)",width:"15vw",height:"20vw",margin:"2vw"}}></div>
        <div style={{backgroundColor:"var(--altgrey)",width:"15vw",height:"20vw",margin:"2vw"}}></div>
        <div style={{backgroundColor:"var(--green)",width:"15vw",height:"20vw",margin:"2vw"}}></div>
        <div style={{backgroundColor:"var(--altgrey)",width:"15vw",height:"20vw",margin:"2vw"}}></div>
        <div style={{backgroundColor:"var(--lightblue)",width:"15vw",height:"20vw",margin:"2vw"}}></div>
        <div style={{backgroundColor:"var(--green)",width:"15vw",height:"20vw",margin:"2vw"}}></div>
        <div style={{backgroundColor:"var(--orange)",width:"15vw",height:"20vw",margin:"2vw"}}></div>
    </div>
    </>
}