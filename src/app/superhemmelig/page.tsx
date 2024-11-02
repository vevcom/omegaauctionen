import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"


export default async function superhemmelig() {
    const session = await getServerSession(options)
    return (
    <>
        <p>Du kan ikke se denne nettsiden uten å logge inn :b</p>
        <p>
            Ditt brukernavn er: {
                session ? session?.user?.name:<span>What! du kom deg inn uten en bruker???</span>
            }
        </p>
    </>
    )
}