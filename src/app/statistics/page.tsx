"use client"
import 'chart.js/auto'
import {Pie,Bar,Line,Doughnut,Radar,PolarArea,Bubble,Scatter} from "react-chartjs-2" //importerer ulike graf typer
import { Chart } from 'chart.js';
import styles from "./page.module.css";
//import {ChartSankey} from 'chartjs-chart-sankey'; 

//Chart.register(ChartSankey);

export default function Klassetrinn() {

  const colors = [               //definert farger 
    'rgb(240, 8, 58)',     //farge nummer 1 tilhører nå 1.klasse feks
    "rgb(255,125,0)",
    'rgb(252, 235, 5)',
    'rgb(6, 202, 16)', 
    'rgb(54, 162, 235)',     
    'rgb(153, 102, 255)'
  ];


    const spenders = [
      {
        name: "1.klasse",    //navn
        spent: 200,          //sum
      },
      {
        name: "2.klasse",
        spent: 240,
      },      {
        name: "3.klasse",
        spent: 500,
      },      { 
        name: "4.klasse",
        spent: 200,
      },      {
        name: "5.klasse",
        spent: 100,
      },
            

    ]

    const data = { 
      labels: spenders.map(a => a.name), 
      datasets: [{
        label: "dataset",
        data: spenders.map(spenders => spenders.spent),
        backgroundColor:colors,                          //farger på charts = farger definert i colors
      }]
    }


    return (
    <div style = {{width: "20%",margin: "0 auto",}}>
        <h1 className={styles.overskrift}>Overskrift</h1> 
        <Pie data={data}></Pie>    
        <Bar className= {styles.bar} data={data}></Bar>
        <Line data={data}></Line>  
        <Doughnut data={data}></Doughnut>
        <Radar data={data}></Radar>
        <PolarArea data={data}></PolarArea>



      </div>
    )
}



