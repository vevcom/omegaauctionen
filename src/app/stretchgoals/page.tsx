import get_money_made from "../components/get-money-made/get-money-made"
import styles from "./page.module.scss"

const streachgoalsList = [
    [10000, "DGR underholdning "],
    [20000, "Contactor gjør utfordringer i gdansk"],
    [30000, "Eirin spiser chilli og fremfører salmpoesi "],
    [40000, "Sport å spill benker Heutte og Contactor til vinmil"],
    [50000, "4 pils og en pizza (mortensine) "],
    [60000, "En tilfeldig person fremfører presentasjon"],
    [70000, "Arrforum mot konferansierer, cavatog "],
    [80000, "HS tar tatovering "],
    [90000, "Ikke lov å le på hytta (innspilling)"],
    [100000, "HS brenner"],
    [110000, "HELE arrforum skinner seg <3"],
]

function Node({ goal, moneyMade, index }: { goal: (string | number)[], moneyMade: number, index: number }) {
    const currentGoal = goal.at(0) as number
    const nextGoal = streachgoalsList.at(index + 1)?.at(0)
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

export const dynamic = 'force-dynamic'

export default async function Streachgoals() {
    "use server"
    const moneyMade = await get_money_made()

    return (
        <div>
            <h1 className={styles.heading}><b>{moneyMade}kr</b> tjent inn så langt!</h1>
            {streachgoalsList.map((goal, index) => (
                <Node key={index} index={index} goal={goal} moneyMade={moneyMade}></Node>
            ))}
        </div>
    )
}