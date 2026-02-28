"use server"
import { AuksjonsObjektType, Study } from "@/generated/enums"
import { prisma } from "../prisma";
import get_money_made from "../components/get-money-made/get-money-made";
import get_biggest_spenders from "../components/get-biggest-spenders/get-biggest-spenders";



function cutOffName(name: string) {
  const maxLengthCharacters = 69;
  if (!name) {
    return ""
  }
  if (name.length > maxLengthCharacters) {
    return name.substring(0, maxLengthCharacters) + "..."
  }
  return name
}

export default async function loadData(loadMiniAdmin: boolean) {
  if (loadMiniAdmin) {
    const elesysKyb = await prisma.auksjonsObjekt.findMany({
      where: {
        type: AuksjonsObjektType.AUKSJON,
        approved: true,
      },
      select: {
        bids: {
          orderBy: {
            price: 'desc'
          },
          take: 1,
          select: {
            bidder: {
              select: {
                studyCourse: true,
              }
            },
            price: true,
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
            price: true,
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
        studyCount[studyCourse.toUpperCase()] += auction.bids[0].price;
      }
    });


    for (let i = 0; i < capeData.length; i++) {
      const data = capeData[i]
      if (!data) { continue; }
      if (!data.bids[i] || !data.bids[i].bidder.studyCourse || !data.bids[i].price) { continue; }
      const currentBidPrice = data.bids[i].price
      const currentBidderStudyCourse = data.bids[i].bidder.studyCourse
      studyCount[currentBidderStudyCourse.toUpperCase()] += currentBidPrice
    }


    // top5ExpensiveObjects
    const top5ExpensiveObjectsNoPrice = await prisma.auksjonsObjekt.findMany({
      where: {
        approved: true,
        type: AuksjonsObjektType.AUKSJON,
      },
      include: {
        bids: {
          orderBy: {
            price: 'desc'
          },
          take: 1 // Only the highest bid
        }
      }
    });

    // Map to include current price
    const top5ExpensiveObjects = top5ExpensiveObjectsNoPrice
      .map(obj => {
        const currentPrice = obj.bids.length > 0 ? obj.bids[0].price : obj.startPrice;
        return {
          name: obj.name,
          currentPrice
        };
      })
      .sort((a, b) => b.currentPrice - a.currentPrice) // Ensure descending order
      .slice(0, 5);



    const allApprovedAuctions = await prisma.auksjonsObjekt.findMany({
      where: {
        approved: true,
        type: AuksjonsObjektType.AUKSJON
      },
      include: {
        bids: {
          orderBy: {
            price: 'desc'
          },
          take: 1
        }
      }
    });

    const currentPrices = allApprovedAuctions.map(obj =>
      obj.bids.length > 0 ? obj.bids[0].price : obj.startPrice
    );

    const averagePrice = currentPrices.reduce((a, b) => a + b, 0) / currentPrices.length || 0;
    const count = currentPrices.length;

    const avarageAndcount = {
      avg: averagePrice,
      count: count
    }

    const leastExpensiveObjectsNoPrice = await prisma.auksjonsObjekt.findMany({
      where: {
        approved: true,
        type: AuksjonsObjektType.AUKSJON,
      },
      include: {
        bids: {
          orderBy: {
            price: 'desc',
          },
          take: 1, // Get only the highest bid
        },
      },
    });

    // Compute current price and sort ascending
    const leastExpensiveObjects = leastExpensiveObjectsNoPrice
      .map(obj => {
        const currentPrice = obj.bids.length > 0 ? obj.bids[0].price : obj.startPrice;
        return {
          name: obj.name,
          currentPrice,
        };
      })
      .sort((a, b) => a.currentPrice - b.currentPrice) // Ascending order
      .slice(0, 5); // Take 5 least expensive


    const total = await get_money_made()

    // Antall objekt
    const totalCount = await prisma.auksjonsObjekt.count();


    // 
    const formattedTop5 = top5ExpensiveObjects.map((object) => ({
      name: object.name,
      spent: object.currentPrice, // Assigning the current price as spent
    }));


    // 
    const formattedlow5 = leastExpensiveObjects.map((object) => ({
      name: object.name,
      spent: object.currentPrice, // Assigning the current price as spent
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
        spent: studyCount["ELSYS"],       //sum
      },
      {
        name: "KYB",
        spent: studyCount["KYB"],
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

    const topBiggestSpenders = await get_biggest_spenders();
    const topThreeBiggestSpenders: { name: string, spent: number }[] = [];
    for (let i = 0; i < 3; i++) {
      topThreeBiggestSpenders.push(topBiggestSpenders[i]);
    }

    const data5 = {
      labels: topThreeBiggestSpenders.map(a => cutOffName(a.name)),
      datasets: [{
        label: "Biggest spenders",
        data: topThreeBiggestSpenders.map(topThreeBiggestSpenders => topThreeBiggestSpenders.spent),
        backgroundColor: colors,                          //farger på charts = farger definert i colors
      }]
    }
    const data6 = {
      labels: topBiggestSpenders.map(a => cutOffName(a.name)),
      datasets: [{
        label: "Biggest spenders",
        data: topBiggestSpenders.map(topBiggestSpenders => topBiggestSpenders.spent),
        backgroundColor: colors,                          //farger på charts = farger definert i colors
      }]
    }
    return [data3, data4, datakybelsys, avarageAndcount, total, data5, data6]
  }
  else {
    const allApprovedAuctions = await prisma.auksjonsObjekt.findMany({
      where: {
        approved: true,
        type: AuksjonsObjektType.AUKSJON
      },
      include: {
        bids: {
          orderBy: {
            price: 'desc'
          },
          take: 1
        }
      }
    });

    const currentPrices = allApprovedAuctions.map(obj =>
      obj.bids.length > 0 ? obj.bids[0].price : obj.startPrice
    );

    const averagePrice = currentPrices.reduce((a, b) => a + b, 0) / currentPrices.length || 0;
    const count = currentPrices.length;

    const avarageAndcount = {
      avg: averagePrice,
      count: count
    }

    const total = await get_money_made()
    return [null, null, null, avarageAndcount, total, null]

  }
}