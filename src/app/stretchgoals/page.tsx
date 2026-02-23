import get_money_made from "../components/get-money-made/get-money-made"
import styles from "./page.module.scss"

const streachgoalsList = [
    [80000, "Amet ullamco esse voluptate in."],
    [70000, "Minim aliquip irure tempor "],
    [60000, "Velit elit deserunt nostrud id velit ea"],
    [50000, "Pariatur qui consectetur sit non ex an"],
    [40000, "Ullamco minim do ut anim anim."],
    [30000, "Hs tar backflip"],
    [20000, "Omega kjøper 2 hytter"],
    [10000, "Badestamp"],
    [5000, "Id commodo ad esse et consequat."],
    [4000, "Omega kjøper smøre"],
    [1000, "Nome kommer og tar backflip"],
].reverse()

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