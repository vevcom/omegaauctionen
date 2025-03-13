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

export default function Graphs({ data, data2, data3,data4 }: { data: DataType, data2: DataType, data3:DataType, data4:DataType }) {
    return (<div className={styles.bla}>

        {/* <h1 className = {styles.overskrift}>Statistikk</h1> */}
  
        {/*<p className = {styles.paragraf}>Hei og velkommen til statistikk. Woooooow! Se så fine grafer:) Tekst. Tekst. Blablablablablabla. </p>*/}
  
        {/* <div className={styles.bla}> */}
  
          <div className={styles.graf}>
            {/* {<h1>Overskrift</h1>} */}
            <Pie 
            data={data}
            // width={"500px"}
            // height={"300px"}
            options={{

              responsive: true,
              maintainAspectRatio: false,      
            }}            
            
            ></Pie>     
          </div>
          
          <div className={styles.graf}>
          <Doughnut
          data={data3}
          options={{

            responsive: true,
            maintainAspectRatio: false,
          }}
          
          ></Doughnut>  
          </div>
  
          <div className={styles.graf}>
              <Bar 
              className= {styles.bar}
              data={data}
              options={{
                plugins:{
                  title: {
                  display: true, // Vise tittelen på diagrammet
                  text: 'TITTELLLLLL PÅ GRAF', // Tittelen på diagrammet
                  padding: {
                    top: 1, // Padding på toppen av tittelen
                    bottom: 1, // Padding på bunnen av tittelen
                  },
                },
              },
              responsive: true, // Sørger for at diagrammet er responsivt (tilpasser seg skjermstørrelsen)
              maintainAspectRatio: false, // Tillater endring i forholdet mellom bredde og høyde
              scales: {
                x: {
                    type: 'category',
                    display: true, // Vise tittel på X-aksen
                    
                    //labels: ['January', 'February', 'March', 'April', 'May', 'June'] bare et eks. på navn
                },
                y: {
                  title: {
                    display: true, // Vise tittel på Y-aksen
                    text: 'Y-Axis Label', // Tekst for Y-aksens tittel
                  },
                  ticks: {
                    // beginAtZero: true, // Sørger for at Y-aksen starter fra 0
                    stepSize: 1000, // Angir steglengde mellom tallene på Y-aksen
                  },
                },

            }

              }}
              ></Bar>

          </div>
  
          <div className={styles.graf}>
          <Line 
          data={data4}
          options={{

            responsive: true,
            maintainAspectRatio: false,
          }}            
          
          
          ></Line>            {/*width={400}*/}
          </div>
  
          {/* <div  className={styles.graf}> */}
          {/* <Doughnut data={data2}></Doughnut>   */}
          {/* </div> */}
  
  
          <div>
          {/*<Radar data={data}></Radar>*/}
          {/*<PolarArea data={data}></PolarArea>*/}
          </div>
  
  
  
  
        {/* </div>   */}
      </div>)
}