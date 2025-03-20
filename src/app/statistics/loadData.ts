"use server"
import { AuksjonsObjektType, Study } from "@prisma/client";
import { prisma } from "../prisma";
import get_money_made_in_ore from "../components/get-money-made/get-money-made";
import get_biggest_spenders from "../components/get-biggest-spenders/get-biggest-spenders";
import is_miniadmin from "../components/is-miniadmin/is-miniadmin";



function cutOffName(name: string) {
  const maxLengthCharacters = 15;
  if (!name) {
    return ""
  }
  if (name.length > maxLengthCharacters) {
    return name.substring(0, maxLengthCharacters) + "..."
  }
  return name
}

export default async function loadData(loadMiniAdmin:boolean) {
  if (loadMiniAdmin) {
    const elesysKyb = await prisma.auksjonsObjekt.findMany({
      where: {
        type: AuksjonsObjektType.AUKSJON,
        approved: true,
      },
      select: {
        bids: {
          orderBy: {
            priceOre: 'desc'
          },
          take: 1,
          select: {
            bidder: {
              select: {
                studyCourse: true,
              }
            },
            priceOre: true,
          }
        }
      }
    })

    const capeData = await prisma.auksjonsObjekt.findMany({
      where: {
        approved: true,
        type: AuksjonsObjektType.SALG
      },
      select: {
        bids: {
          select: {
            priceOre: true,
            bidder: {
              select: {
                studyCourse: true
              }
            }
          }
        }
      }
    })

    const studyCount: Record<string, number> = {
      [Study.ELSYS.toUpperCase()]: 0,
      [Study.KYB.toUpperCase()]: 0,
      [Study.OTHER.toUpperCase()]: 0,
      [Study.NOTANSWERD.toUpperCase()]: 0,
    };

    // Loop through the results and count the study courses for highest bids
    elesysKyb.forEach(auction => {
      if (auction.bids.length > 0) {
        const studyCourse = auction.bids[0].bidder.studyCourse;
        studyCount[studyCourse.toUpperCase()] += auction.bids[0].priceOre;
      }
    });


    for (let i = 0; i < capeData.length; i++) {
      const data = capeData[i]
      if (!data) { continue; }
      if (!data.bids[i] || !data.bids[i].bidder.studyCourse || !data.bids[i].priceOre) { continue; }
      const currentBidPrice = data.bids[i].priceOre
      const currentBidderStudyCourse = data.bids[i].bidder.studyCourse
      studyCount[currentBidderStudyCourse.toUpperCase()] += currentBidPrice
    }


    const top5ExpensiveObjects = await prisma.auksjonsObjekt.findMany({
      where: {
        approved: true,
        type: AuksjonsObjektType.AUKSJON,
      },
      orderBy: {
        currentPriceOre: 'desc',  // Sorting by the current price in descending order
      },
      take: 5, // Limiting to 5 most expensive
      select: {
        name: true, // Only the name of the auction object
        currentPriceOre: true, // The current price in Ore
      }

    });

    const avarageAndcount = await prisma.auksjonsObjekt.aggregate({
      _avg: {
        currentPriceOre: true
      },
      _count: {
        name: true,
      },
      where: {
        approved: true,
        type: AuksjonsObjektType.AUKSJON
      }
    })

    const leastExpensiveObjects = await prisma.auksjonsObjekt.findMany({
      where: {
        approved: true,
        type: AuksjonsObjektType.AUKSJON,
      },
      orderBy: {
        currentPriceOre: 'asc',  // Sorting by the current price in descending order
      },
      take: 5, // Limiting to 5 most expensive
      select: {
        name: true, // Only the name of the auction object
        currentPriceOre: true, // The current price in Ore
      }

    });


    const total = await get_money_made_in_ore()

    // Antall objekt
    const totalCount = await prisma.auksjonsObjekt.count();


    // 
    const formattedTop5 = top5ExpensiveObjects.map((object) => ({
      name: object.name,
      spent: object.currentPriceOre / 100, // Assigning the current price as spent
    }));


    // 
    const formattedlow5 = leastExpensiveObjects.map((object) => ({
      name: object.name,
      spent: object.currentPriceOre / 100, // Assigning the current price as spent
    }));




    const colors = [               //definert farger 
      'rgb(240, 8, 58)',     //farge nummer 1 tilhører nå 1.klasse feks
      "rgb(255,125,0)",
      'rgb(252, 235, 5)',
      'rgb(6, 202, 16)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)'
    ];

    const colors2 = [
      'rgb(54, 162, 235)',
      'rgb(6, 202, 16)',
    ];

    // elsys og kyb: 
    const spenders3 = [
      {
        name: "ELSYS",    //navn
        spent: studyCount["ELSYS"] / 100,       //sum
      },
      {
        name: "KYB",
        spent: studyCount["KYB"] / 100,
      },
    ]

    const datakybelsys = {
      labels: spenders3.map(a => cutOffName(a.name)), //cutOffName funksjon kutter av navnet
      datasets: [{
        label: "dataset3",
        data: spenders3.map(spenders3 => spenders3.spent),
        backgroundColor: colors2,                          //farger på charts = farger definert i colors
      }]
    }

    //top 5 dyreste objekter
    const data3 = {
      labels: formattedTop5.map(a => cutOffName(a.name)),
      datasets: [{
        label: "Top 5 auksjonsobjekter",
        data: formattedTop5.map(formattedTop5 => formattedTop5.spent),
        backgroundColor: colors,                          //farger på charts = farger definert i colors
      }]
    }

    //laveste 5 pris objekt
    const data4 = {
      labels: formattedlow5.map(a => cutOffName(a.name)),
      datasets: [{
        label: "Top 5 auksjonsobjekter",
        data: formattedlow5.map(formattedlow5 => formattedlow5.spent),
        backgroundColor: colors,                          //farger på charts = farger definert i colors
      }]
    }

    let topBiggestSpenders = await get_biggest_spenders()

    const data5 = {
      labels: topBiggestSpenders.map(a => cutOffName(a.name)),
      datasets: [{
        label: "Biggest spenders",
        data: topBiggestSpenders.map(topBiggestSpenders => topBiggestSpenders.spent / 100),
        backgroundColor: colors,                          //farger på charts = farger definert i colors
      }]
    }
    return [data3, data4, datakybelsys, avarageAndcount, total, data5]
  }
  else{
    const avarageAndcount = await prisma.auksjonsObjekt.aggregate({
      _avg: {
        currentPriceOre: true
      },
      _count: {
        name: true,
      },
      where: {
        approved: true,
        type: AuksjonsObjektType.AUKSJON
      }
    })

    
    const total = await get_money_made_in_ore()
    return [null , null, null, avarageAndcount, total, null]

  }
}