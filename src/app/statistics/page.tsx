import { options } from '../api/auth/[...nextauth]/options';
import { prisma } from '../prisma';
import Graphs from './Graphs';
import styles from './page.module.scss'
//import {ChartSankey} from 'chartjs-chart-sankey'; 




//Chart.register(ChartSankey);

export default async function Klassetrinn() {
  const top5ExpensiveObjects = await prisma.auksjonsObjekt.findMany({
    orderBy: {
      currentPriceOre: 'desc',  // Sorting by the current price in descending order
    },
    take: 5, // Limiting to 5 most expensive
    select: {
      name: true, // Only the name of the auction object
      currentPriceOre: true, // The current price in Ore
    }

  });


  const leastExpensiveObjects = await prisma.auksjonsObjekt.findMany({
    orderBy: {
      currentPriceOre: 'asc',  // Sorting by the current price in descending order
    },
    take: 5, // Limiting to 5 most expensive
    select: {
      name: true, // Only the name of the auction object
      currentPriceOre: true, // The current price in Ore
    }

  });

  //total pris
  const total = await prisma.auksjonsObjekt.aggregate({
    _sum: {
      currentPriceOre: true,
    },
  });

  console.log(total._sum.currentPriceOre / 100);
  

  // Antall objekt
  const totalCount = await prisma.auksjonsObjekt.count();
  console.log("Total number of auction objects:", totalCount);



  // 
  const formattedTop5 = top5ExpensiveObjects.map((object) => ({
    name: object.name,
    spent: object.currentPriceOre/100, // Assigning the current price as spent
  }));
  
  console.log(formattedTop5);


    // 
    const formattedlow5 = leastExpensiveObjects.map((object) => ({
      name: object.name,
      spent: object.currentPriceOre/100, // Assigning the current price as spent
    }));
    
    console.log(formattedlow5);
  
  
    //mulig å implementere, ikke fått til enda. 
    const priceRanges = [
      { range: '0-100', count: 0 },
      { range: '101-500', count: 0 },
      { range: '501-1000', count: 0 },
      { range: '1001+', count: 0 },
    ];
    
    const objects = await prisma.auksjonsObjekt.findMany({
      select: {
        currentPriceOre: true,
      },
    });
    
    // Gå gjennom objektene og inkrementer antall for hvert intervall
    objects.forEach(obj => {
      if (obj.currentPriceOre <= 10000) {   //pris i 
        priceRanges[0].count++;
      } else if (obj.currentPriceOre <= 50000) {
        priceRanges[1].count++;
      } else if (obj.currentPriceOre <= 100000) {
        priceRanges[2].count++;
      } else {
        priceRanges[3].count++;
      }
    });
    
    console.log(priceRanges);
    



  const colors = [               //definert farger 
    'rgb(240, 8, 58)',     //farge nummer 1 tilhører nå 1.klasse feks
    "rgb(255,125,0)",
    'rgb(252, 235, 5)',
    'rgb(6, 202, 16)', 
    'rgb(54, 162, 235)',     
    'rgb(153, 102, 255)'
  ];
  

    //fake data 1
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

    //fake data 1
    const spenders2 = [
      {
        name: "Hei",    //navn
        spent: 300,          //sum
      },
      {
        name: "Hallo",
        spent: 20,
      },      {
        name: "Katt",
        spent: 100,
      },    
    ]

    //fake data 1
    const data = { 
      labels: spenders.map(a => a.name), 
      datasets: [{
        label: "dataset",
        data: spenders.map(spenders => spenders.spent),
        backgroundColor:colors,                          //farger på charts = farger definert i colors
      }]
    }

    //top 5 dyreste objekter
    const data3 = { 
      labels: formattedTop5.map(a => a.name), 
      datasets: [{
        label: "dataset",
        data: formattedTop5.map(formattedTop5 => formattedTop5.spent),
        backgroundColor:colors,                          //farger på charts = farger definert i colors
      }]
    }

    //laveste 5 pris objekt
    const data4 = { 
      labels: formattedlow5.map(a => a.name), 
      datasets: [{
        label: "dataset",
        data: formattedlow5.map(formattedlow5 => formattedlow5.spent),
        backgroundColor:colors,                          //farger på charts = farger definert i colors
      }]
    }


  //fake data 2
    const data2 = {
      labels: spenders2.map(a => a.name), 
      datasets: [{
        label: "dataset2",
        data: spenders2.map(spenders2 => spenders2.spent),
        backgroundColor:colors,                          //farger på charts = farger definert i colors
      }]
    }

    
  return <div className={styles.side}>
    <div className={styles.overskriftContainer}>
      <h1 className={styles.overskrift}>Statistikk</h1>
    </div>

    <div className={styles.sumContainer}>
      <p >Penger samlet inn: </p>
      <div className={styles.sum}>
        <p>{Math.round(total._sum.currentPriceOre/100)} kr</p>
      </div>
    </div>


    {/* gjennomsnitt og antall auksjonsobjekt */}
    <div className={styles.dataContainer}>

      <div className={styles.antallContainer}>

        <p className={styles.tekst}>Antall auksjonsobjekt</p>

        <div className={styles.antall}>
          <p>{totalCount} stk</p>
        </div>

      </div>

      <div className={styles.gjennomsnittContainer}>

        <p className={styles.tekst}>Gjennomsnittspris</p>

        <div className={styles.gjennomsnitt}>
          <p>{Math.round((total._sum.currentPriceOre / 100)/totalCount)} kr</p> 
        </div>

      </div>

    </div>
      
      
      

      
      
      <Graphs data={data} data2={data2} data3={data3} data4 = {data4}></Graphs>  
    </div>
  }


