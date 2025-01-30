"use client";
import styles from "./style.module.scss";

export default function PopUpBox({ isActive, text }: { isActive: boolean; text: string }) {
    return (
        <div className={styles.popup}>
            <span className={`${styles.popuptext} ${isActive ? styles.show : ""}`}>
                {text}
            </span>
        </div>
    );
}
