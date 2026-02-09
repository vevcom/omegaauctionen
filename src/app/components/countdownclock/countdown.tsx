import React, { useEffect, useState } from "react";
import style from "./component.module.scss"
import { oldEnglish } from "../../layout"


export default function CountdownClock() {
    const [timeLeft, setTimeLeft] = useState([0, 0, 0, 0]);

    useEffect(() => {
        const countDownDate = new Date("Mar 5, 2026 12:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                setTimeLeft([0, 0, 0, 0]);
                return;
            }

            setTimeLeft([
                Math.floor(distance / (1000 * 60 * 60 * 24)), // Days
                Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), // Hours
                Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), // Minutes
                Math.floor((distance % (1000 * 60)) / 1000), // Seconds
            ]);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const now = new Date()
    const start = new Date("2025-03-05T16:00:00.000Z")
    const end = new Date("2026-03-05T22:00:00.000Z")
    if (now > start || now < end) {

        return (

            <div className={style.countdowncomponent}>
                <div className={`${style.countdowntitle}`}>Velkommen til Omegaauctionen 2026!</div>
            </div>
        )
    }
    if (now > start || now > end) {

        return (

            <div className={style.countdowncomponent}>
                <div className={`${style.countdowntitle}`}>Omegaauctionen 2026 er dessverre over for i år</div>
            </div>
        )
    }

    return (
        <div className={style.countdowncomponent}>
            <div className={`${style.countdowntitle}`}>Omegaauctionen 2026<br></br> starter om</div>

            <div className={style.clockcontainer}>
                {["Dager", "Timer", "Minutter", "Sekunder"].map((unit, index) => (
                    <React.Fragment key={index}><div className={style.part} key={index}>
                        <div className={style.time}>{timeLeft[index].toString().padStart(2, "0")}</div>
                        <div className={style.unit}>{unit}</div>
                    </div>
                        {index != 3 && <div className={style.colon}>:</div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}