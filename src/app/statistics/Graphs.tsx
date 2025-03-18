"use client"
import styles from './page.module.scss'
import 'chart.js/auto'
import {Pie,Bar,Line,Doughnut,Radar,PolarArea,Bubble,Scatter} from "react-chartjs-2" //importerer ulike graf typer

type DataType = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
    }[];
}

export default function Graphs({ data3,data4,datakybelsys,data5 }: { data3:DataType, data4:DataType, datakybelsys:DataType,data5:DataType }) {
    console.log(datakybelsys)
    return (<div className={styles.bla}>

          <h1>KYB VS ELSYS</h1>
          <p>Hvem har brukt mest penger</p>
          <div className={styles.graf}>
            <Pie 
            data={datakybelsys}
            options={{

              responsive: true,
              maintainAspectRatio: false,      
            }}            
            
            ></Pie>     
          </div>
          <h1>Topp 5 auksjonsobjekt</h1>
          <p>Hvilke auksjonsobjekter er mest populære</p>
          <div className={styles.graf}>
          <Doughnut
          data={data3}
          options={{

            responsive: true,
            maintainAspectRatio: false,
          }}
          
          ></Doughnut>  
          </div>

          <h1>Laveste 5 auksjonsobjekt</h1>
          <p>Hvilke auksjonsobjekter er minst populære</p>
          <div className={styles.graf}>
          <Doughnut
          data={data4}
          options={{

            responsive: true,
            maintainAspectRatio: false,
          }}
          
          ></Doughnut>  
          </div>

          <h1>Biggest Spender</h1>
          <p>Hvem ligger ann til å bruke mest penger</p>
          <div className={styles.graf}>
          <Bar
          data={data5}
          options={{

            responsive: true,
            maintainAspectRatio: false,
          }}
          
          ></Bar>  
          </div>

      </div>)
}