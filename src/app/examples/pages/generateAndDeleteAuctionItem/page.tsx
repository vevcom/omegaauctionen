"use client"
import { createAuctionItem } from "../../components/createAuctionItem"
import {deleteAllItems} from "../../components/deleteAuctionItem"


function Generer10Objekyter() {
    async function lag() {
        alert("hei")
        // hvis du synes teksten er rar søk opp lorem ipsum. du kan prøve å oversette det i google transelate. det kan være litt artige setninger :)
        let description = [
            "Incididunt nulla eu aliqua et consequat non labore. Eiusmod proident deserunt in id officia occaecat aliqua ipsum esse aliqua qui veniam nulla. Pariatur ut amet occaecat minim tempor. Ipsum aute amet aute qui esse sint enim magna fugiat sint exercitation velit eu. Anim officia amet id velit minim commodo reprehenderit nostrud enim cillum quis. Sunt amet duis est non in mollit cillum.",
            "Elit Lorem ipsum do sit irure qui aute eu proident enim. Adipisicing ullamco quis velit sit cillum laborum consectetur nulla commodo eiusmod ipsum consectetur id. Labore adipisicing eiusmod exercitation aliquip aliquip duis nostrud in qui pariatur magna ut est quis. Est aute sit do voluptate consectetur occaecat. Ut anim ex est commodo incididunt exercitation aute ea cillum nisi nostrud deserunt ut minim. Sunt fugiat aliquip aliquip amet labore mollit mollit nulla elit. Duis aliqua reprehenderit dolore velit tempor sunt do dolore eu veniam nostrud et quis.",
            "Incididunt consectetur pariatur consequat labore officia mollit aliqua sit consequat occaecat et laborum nisi officia. Culpa mollit ex amet cillum exercitation enim. Laborum commodo amet anim culpa. Sit consectetur quis ea nulla elit reprehenderit esse occaecat ullamco aliqua enim quis duis. Nostrud nulla aliquip ipsum quis exercitation.",
            "Mollit aliqua incididunt reprehenderit exercitation ut consequat tempor voluptate dolor consectetur anim. Nulla sit nisi reprehenderit exercitation amet culpa nostrud. Labore cupidatat ad reprehenderit do ut ipsum sint exercitation reprehenderit et aliquip aliquip id. Et ex nisi tempor qui amet fugiat velit eu minim et mollit ea consequat consectetur. Ipsum enim consectetur occaecat elit ex.",
            "Dolore amet officia ipsum pariatur et enim aliquip amet tempor adipisicing pariatur cillum consectetur Lorem. Enim nulla cupidatat exercitation aute voluptate. Mollit tempor esse laboris est fugiat adipisicing cupidatat esse. Anim dolore nostrud qui irure consectetur.",
            "Tempor ullamco in adipisicing amet magna nostrud et proident est culpa fugiat ut ullamco. Minim ut id aliquip adipisicing proident do ullamco nostrud eiusmod. Nostrud minim cupidatat nulla esse Lorem nostrud nulla adipisicing. Eu magna do voluptate nisi non est voluptate pariatur magna qui. Ea veniam occaecat velit proident occaecat. Commodo aliqua commodo excepteur aliquip sunt officia ullamco.",
            "Amet non voluptate quis mollit magna quis reprehenderit minim voluptate mollit duis Lorem amet. Voluptate et qui dolor ipsum ex. Ex dolore labore minim tempor pariatur pariatur culpa labore officia velit sint consectetur enim cupidatat. Deserunt nulla commodo excepteur excepteur occaecat do eiusmod. Adipisicing ut ut ea nulla dolore. Ex cillum laboris nostrud cupidatat proident. Eiusmod tempor culpa incididunt enim cillum sunt sint dolor eiusmod Lorem reprehenderit cillum voluptate officia.",
            "Velit reprehenderit quis do minim elit duis nostrud est ex irure. Ullamco in incididunt Lorem anim. Consequat nisi sint cillum pariatur aute do consequat esse quis ipsum exercitation ea dolore nisi. Ex elit aliqua nisi commodo irure.",
            "Voluptate magna amet eu esse proident veniam laboris ullamco do laboris incididunt aliquip adipisicing. Amet laboris anim qui irure duis sit et cillum. Exercitation eiusmod sint veniam reprehenderit fugiat ut. Laborum officia commodo veniam occaecat eu adipisicing Lorem amet dolor. Eu elit ipsum officia eu duis officia enim cupidatat officia. Consectetur eiusmod velit mollit est do qui occaecat laborum cillum non aliqua quis.",
            "Non tempor quis ex nostrud ex duis eiusmod fugiat aliquip anim. Nisi laborum ut exercitation magna dolor eu cupidatat duis magna. Incididunt minim tempor excepteur ullamco commodo duis occaecat incididunt velit excepteur Lorem aliquip ipsum do. Do labore sint ullamco ad consequat ullamco amet officia consequat mollit amet et ipsum exercitation. Magna eu est est enim dolore mollit ad elit occaecat voluptate occaecat. Ullamco dolore qui labore est in enim nostrud nisi aliquip.",
        ]
        let name = ["Consequat", "reprehenderit", "eu", "nostrud", "excepteur", "est.", "Aliqua", "enim", "laborum", "pariatur", "ullamco"]
        let approved = true
        let startPrice = 10
        for (let i = 0; i < 10; i++) {
            await createAuctionItem(description[i], name[i], startPrice, approved)
            startPrice +=10
        }
        approved = false
        for (let i = 0; i < 10; i++) {
            await createAuctionItem(description[i], name[i], startPrice, approved)
            startPrice +=10
        }
        alert("Ferdig")
    }

    return (
        <div>
            <button onClick={lag}>Trykk her</button>
        </div>
    )
}


function DeleteAllItemsButton() {
    async function slettALt() {
        await deleteAllItems()
        alert("alt slettet (ånei!)")
    }

    return (
        <div>
            <button onClick={slettALt}>Slett alle auksjonsObjekter</button>
        </div>
    )
}


export default function veligPenSide() {


    return (
        <div>
            <h1> Trykk der</h1>
            <Generer10Objekyter></Generer10Objekyter>
            <DeleteAllItemsButton></DeleteAllItemsButton>
        </div>
    )
}