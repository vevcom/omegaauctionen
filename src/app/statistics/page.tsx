"use client"
import Graphs from './Graphs';
import loadData from './loadData';
import styles from './page.module.scss'
import { useEffect, useState } from 'react';
//import {ChartSankey} from 'chartjs-chart-sankey'; 


export const dynamic = "force-dynamic";


export default function Klassetrinn() {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [data3, setdata3] = useState<null | any>(null)
  const [data4, setdata4] = useState<null | any>(null)
  const [datakybelsys, setdatakybelsys] = useState<null | any>(null)
  const [avarageAndcount, setavarageAndcount] = useState<null | any>(null)
  const [total, settotal] = useState<null | any>(null)
  const [data5, setdata5] = useState<null | any>(null)

  useEffect(() => {
    async function loadStats() {
      const dataResponse = await loadData()
      if (!dataResponse) {
        return;
      }

      for (let i = 0; i < dataResponse.length; i++) {
        if (!dataResponse[i]) {
          console.log("data "+i.toString()+"not loaded")
          return;
        }
      }

      setdata3(dataResponse[0])
      setdata4(dataResponse[1])
      setdatakybelsys(dataResponse[2])
      setavarageAndcount(dataResponse[3])
      settotal(dataResponse[4])
      setdata5(dataResponse[5])
      setHasLoaded(true)
    }
    loadStats()
    const interval = setInterval(async () => {
      loadStats()
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!hasLoaded) {
    return <p>Laster inn data... HS må gå</p>
  }
  return <div className={styles.side}>
    <div className={styles.overskriftContainer}>
      <h1 className={styles.overskrift}>Statistikk</h1>
    </div>

    <div className={styles.sumContainer}>
      <p className={styles.pengerOverskrift}>Penger samlet inn: </p>
      <div className={styles.sum}>
        <p>{Math.round(total / 100)} kr</p>
      </div>
    </div>


    {/* gjennomsnitt og antall auksjonsobjekt */}
    <div className={styles.dataContainer}>

      <div className={styles.gjennomsnittContainer}>

        <p className={styles.tekst}>Antall auksjonsobjekt</p>

        <div className={styles.gjennomsnitt}>
          <p className={styles.tekstboks}>{avarageAndcount._count.name} stk</p>
        </div>

      </div>

      <div className={styles.gjennomsnittContainer}>

        <p className={styles.tekst}>Gjennomsnittspris</p>

        <div className={styles.gjennomsnitt}>
          <p className={styles.tekstboks}>{Math.round(avarageAndcount._avg.currentPriceOre / 100)} kr</p>
        </div>

      </div>

    </div>


    <Graphs data5={data5} data3={data3} data4={data4} datakybelsys={datakybelsys}></Graphs>
  </div>
}



