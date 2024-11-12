"use server"
import React from 'react';
import { prisma } from '../prisma';



async function App() {
  
  // await prisma.auksjonsObjekt.create({
  //   data: {
  //     name: "En katt",
  //     pris: 2000
  //   }
  // })
  
  const auctionItems = await prisma.auksjonsObjekt.findMany()



  return (
    <div id="mainDiv">

      {auctionItems.map(item => <p id=''>{item.name} : {item.startPrice/100}kr</p>)}

    </div>
  );
}

export default App;
