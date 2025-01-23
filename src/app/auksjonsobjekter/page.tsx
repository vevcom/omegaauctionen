

import Generer10Objekyter from "../examples/pages/generateAndDeleteAuctionItem/page"
import {prisma} from "../prisma"

export default async function side() {
    const auctionobject = await prisma.auctionobject.findMany()
    return (
        
        <main>
        <div>
            <h1>Auksjonsobjekter</h1>
        </div>
        <div>
            {auctionobject.map(object => (
                <div key={object.id}>
                    <div>
                        <h3>Navn: {object.name}</h3>
                        <br/>
                        <p>Pris: {object.price}</p>
                    </div>
                    
                </div>
                ))}                
        </div>
        

        
        
    </main>
    )
}





