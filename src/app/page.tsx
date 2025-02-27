'use client'
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import getUserID from "./api/auth/getUserId";
import getUser from "./api/auth/getUser";
import has_answerd_question from "./components/has-answerd-question/has-answerd-question";




export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasAnswerdQuestion, setHasAnswerdQuestion] = useState(true)

  useEffect(() => {
    async function getData() {
      console.log("running...")
      const userID = await getUserID()
      if (!userID) {
        console.log("not logged in")
        return;
      }
      setIsLoggedIn(true)
      const hasAnswerd_response = await has_answerd_question(userID)
      console.log(hasAnswerd_response)
      setHasAnswerdQuestion(hasAnswerd_response)
    }
    getData()
  })

  if (isLoggedIn) {
    if (hasAnswerdQuestion) {
      console.log("logged in and answerd")
    }
    return (
      <div>
        <div>
          <input type="radio"
            id="Netflix"
            name="brand"
            value="Netflix"></input>
          <label htmlFor="Netflix">Netflix</label>
        </div>

        <div>
          <input type="radio"
            id="Audi"
            name="brand"
            value="Audi"></input>
          <label htmlFor="Audi">Audi</label>
        </div>

        <div>
          <input type="radio"
            id="Microsoft"
            name="brand"
            value="Microsoft" checked></input>
          <label htmlFor="Microsoft">Microsoft</label>
        </div>

      </div>);
  }
  return (
    <div>
      <p>Hovedside</p>
    </div>
  );
}
