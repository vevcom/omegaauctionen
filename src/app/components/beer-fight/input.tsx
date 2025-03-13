"use client"
import {beerToServer} from "./beer-fight-api";

export default function BeerInput({object} : {object:string}) {
    async function beerSubmit(e:FormData) {
        let pattern = /^[0-9]+$/;
        if (!pattern.test(String(e.get("number")))) {
            alert("Please insert a number");
            return;
        }
        let response = await beerToServer({e:e,object:object});
        if (response) {
            alert("something went wrong")
            return;
        }
    }
    
    
    return (
        <form action={(e)=>beerSubmit(e)}>
            <input type="number" name="number"></input>
            <input type="submit"></input>
        </form>
    );
}