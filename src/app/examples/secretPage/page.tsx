import { getServerSession } from "next-auth"
import { options } from "../../api/auth/[...nextauth]/options"
import { json } from "stream/consumers";


export default async function superhemmelig() {
    // console.log(options);
    const session = await getServerSession(options);
    
    return (
    <>
        <p>Du kan ikke se denne nettsiden uten å logge inn :b</p>
        <p>
            Ditt brukernavn er: {
                session ? session?.user?.name:<span>What! du kom deg inn uten en bruker???</span>
            }
        </p>
        <p>
            Din epost er: {
                session ? session?.user?.email:<span>What! Du kom deg inn uten en bruker???</span>
            }
        </p>
        <p>
            Json: {JSON.stringify(session)}
        </p>
    </>
    )
}