import style from "./page.module.scss"

export default function Statistics() {


    return (<div>
        <h2 className={style.titleCard}>Oi! Så mye fin statistikk!</h2>
            <div style={{display:"flex",flexWrap:"wrap",width:"90vw",margin:"5vw"}}>
                <div style={{backgroundColor:"var(--lightblue)",width:"35vw",height:"30vw",margin:"5vw"}}></div>
                <div style={{backgroundColor:"var(--orange)",width:"35vw",height:"30vw",margin:"5vw"}}></div>
                <div style={{backgroundColor:"var(--red)",width:"80vw",height:"10vw",marginLeft:"5vw"}}></div>
            </div>
        </div>)
}