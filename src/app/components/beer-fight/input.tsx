"use client"
import { Dispatch,SetStateAction } from "react";
import {beerToServer} from "./beer-fight-api";

export default function BeerInput({object,reload,setReload} : {object:string,reload:boolean,setReload:Dispatch<SetStateAction<boolean>>}) {
    async function beerSubmit(e:FormData) {
        let pattern = /^[0-9]+$/;
        if (!pattern.test(String(e.get("number")))) {
            alert("Please insert a number");
            return;
        }
        if (!e.get("number")){
            return;
        } 
        if (!confirm(`Er du sikker på at du vil bruke ${e.get("number") as string}kr på å stemme på ${object}`)){return;}
        let response = await beerToServer({e:e,object:object});
        if (response) {
            alert(`Noe gikk galt! ånei: Error:${response}`)
            return;
        }
        setReload(!reload)
    }
    
    
    return (
        <form action={(e)=>beerSubmit(e)}>
            <input type="number" name="number" step={1} required></input>
            <button type="submit">Stem {object=="IkkeHansa" ? "mot Hansa":"for Hansa"}</button>
        </form>
    );
}