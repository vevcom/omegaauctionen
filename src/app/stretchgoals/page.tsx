"use Server"

import get_money_made from "../components/get-money-made/get-money-made"
import styles from "./page.module.scss"

const streachgoalsList = [
    [20000, "Hs går"],
    [20000, "Hs går"],
    [20000, "Hs går"],
    [20000, "Hs går"],
    [20000, "Hs går"],
    [20000, "Hs går"],
    [20000, "Hs går"],
    [10000, "jeg går"],
    [5000, "du går"],
    [4000, "tur til epstein island"],
    [1000, "Omega kjøper epstein island"],
].reverse()

function Node({ goal, moneyMade, index }: { goal: (string | number)[], moneyMade: number, index: number }) {
    const currentGoal = goal.at(0) as number
    let nextGoal = streachgoalsList.at(index + 1)?.at(0)
    if (!nextGoal) {
        return (
            <div className={styles.node}>
                <div className={`${styles.orb} ${moneyMade >= (goal.at(0) as number) ? styles.completeOrb : ""}`}></div>
                <h1 className={`${styles.goalText} ${moneyMade >= (goal.at(0) as number) ? styles.completeGoalText : ""}`}>{goal.at(0)}kr {goal.at(1)}</h1>
            </div >
        )

    }

    const stepOneNextGoal = currentGoal + (((nextGoal as number)-currentGoal)/4)
    const stepTwoNextGoal = currentGoal + ((((nextGoal as number)-currentGoal)/4)*2)
    const stepThreeNextGoal = currentGoal + ((((nextGoal as number)-currentGoal)/4)*3)

    console.log(currentGoal)
    console.log(nextGoal as number)
    console.log(nextGoal as number-currentGoal)
    console.log(stepOneNextGoal)
    console.log(stepTwoNextGoal)
    console.log(stepThreeNextGoal)
    console.log("-----------------")

    return (
        <div className={styles.node}>
            <div className={`${styles.orb} ${moneyMade >= (goal.at(0) as number) ? styles.completeOrb : ""}`}></div>
            <h1 className={`${styles.goalText} ${moneyMade >= (goal.at(0) as number) ? styles.completeGoalText : ""}`}>{goal.at(0)}kr {goal.at(1)}</h1>
            <div className={styles.dotContainer}>
                <div className={`${styles.dot} ${moneyMade >= stepOneNextGoal ? styles.completeDot : ""}`}></div>
                <div className={`${styles.dot} ${moneyMade >= stepTwoNextGoal ? styles.completeDot : ""}`}></div>
                <div className={`${styles.dot} ${moneyMade >= stepThreeNextGoal ? styles.completeDot : ""}`}></div>
            </div>
        </div >
    )
}

export default async function Streachgoals() {
    // const moneyMade = await get_money_made()
    const moneyMade = 8900

    return (
        <div>
            {streachgoalsList.map((goal, index) => (
                <Node key={index} index={index} goal={goal} moneyMade={moneyMade}></Node>
            ))}
        </div>
    )
}