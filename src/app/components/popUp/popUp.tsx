"use client"
import "./style.css"
export default function PopUpBox({ isActive, text }: { isActive: boolean, text: string }) {
    return (
        <div className="popup">
            <span className={`popuptext, ${isActive ? 'show' : ''}`} id="myPopup">{text}</span>
        </div>
    )
}