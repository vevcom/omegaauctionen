"use client"
import is_miniadmin from '../components/is-miniadmin/is-miniadmin';
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
  const [data6, setdata6] = useState<null | any>(null)
  const [miniadmin, setMiniadmin] = useState(false)

  useEffect(() => {
    async function loadStats() {
      let isMiniadmin = await is_miniadmin()
      
      isMiniadmin = true // override easy accessible

      const dataResponse = await loadData(isMiniadmin)
      if (!dataResponse) {
        return;
      }
      if (isMiniadmin) {
        for (let i = 0; i < dataResponse.length; i++) {
          console.log(i)
          console.log(dataResponse.at(i))
          if (!dataResponse[i]) {
            console.log("data " + i.toString() + "not loaded")
            return;
          }
        }
      }
      
      
      setdata3(dataResponse[0])
      setdata4(dataResponse[1])
      setdatakybelsys(dataResponse[2])
      setavarageAndcount(dataResponse[3])
      settotal(dataResponse[4])
      setdata5(dataResponse[5])
      setdata6(dataResponse[6])
      setHasLoaded(true)
      setMiniadmin(isMiniadmin)
    }
    loadStats()
    const interval = setInterval(async () => {
      loadStats()
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!hasLoaded) {
    return <p>Laster inn data... HS må gå</p>
  }
  if (!miniadmin) {
    return <div className={styles.side}>
      <div className={styles.overskriftContainer}>
        <h1 className={styles.overskrift}>Statistikk</h1>
      </div>

      <div className={styles.sumContainer}>
        <p className={styles.pengerOverskrift}>Penger samlet inn: </p>
        <div className={styles.sum}>
          <p>{Math.round(total)} kr</p>
        </div>
      </div>


      {/* gjennomsnitt og antall auksjonsobjekt */}
      <div className={styles.dataContainer}>

        <div className={styles.gjennomsnittContainer}>

          <p className={styles.tekst}>Antall auksjonsobjekt</p>

          <div className={styles.gjennomsnitt}>
            <p className={styles.tekstboks}>{avarageAndcount.count} stk</p>
          </div>

        </div>

        <div className={styles.gjennomsnittContainer}>

          <p className={styles.tekst}>Gjennomsnittspris</p>

          <div className={styles.gjennomsnitt}>
            <p className={styles.tekstboks}>{Math.round(avarageAndcount.avg)} kr</p>
          </div>

        </div>

      </div>

    </div>

  }
  return <div className={styles.side}>
    <div className={styles.overskriftContainer}>
      <h1 className={styles.overskrift}>Statistikk</h1>
    </div>

    <div className={styles.sumContainer}>
      <p className={styles.pengerOverskrift}>Penger samlet inn: </p>
      <div className={styles.sum}>
        <p>{Math.round(total)} kr</p>
      </div>
    </div>


    {/* gjennomsnitt og antall auksjonsobjekt */}
    <div className={styles.dataContainer}>

      <div className={styles.gjennomsnittContainer}>

        <p className={styles.tekst}>Antall auksjonsobjekt</p>

        <div className={styles.gjennomsnitt}>
          <p className={styles.tekstboks}>{avarageAndcount.count} stk</p>
        </div>

      </div>

      <div className={styles.gjennomsnittContainer}>

        <p className={styles.tekst}>Gjennomsnittspris</p>

        <div className={styles.gjennomsnitt}>
          <p className={styles.tekstboks}>{Math.round(avarageAndcount.avg)} kr</p>
        </div>

      </div>

    </div>


    <Graphs data6={data6} data5={data5} data3={data3} data4={data4} datakybelsys={datakybelsys}></Graphs>
  </div>
}



