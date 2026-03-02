import styles from "./sponsorLogoPanel.module.scss"

const logoPaths = [
    ["3T.jpg", "none"],
    ["DNV.png", "none"],
    ["Dominos.png", "none"],
    ["DT.png", "none"],
    ["egon.png", "none"],
    ["SIRKUS.png", "none"],
    ["tc.png", "none"],
    ["grip_klatring_logo.jpg", "none"],
    ["trondheim_kino_as_logo.jpg", "none"],
    ["logo mørk.jpg", "none"],
    ["Vitensenteret_LOGO_sort_transparent.png", "none"],
    ["microchip.jpg", "none"],
    ["nordic.png", "none"],
    ["San-Sebastian.png", "black"],
    ["Sekundarlogo.jpg", "none"],
    ["ENKELEKSAMEN.png", "none"],
    ["Sony-logo.png", "none"],
    ["escape-hunt-logo.png", "none"],
    ["Graffigrill.webp", "black"],
    ["tieto_logo_blue_rgb.jpg", "none"],
    ["LogoJotunheimen (1).png", "none"],
    ["Trondheim-Spa-vektorisert-rund-e1709150159856.webp", "none"],
]


export function SponsorLogoPanel() {
    return (
        <div>
            <h1 className={styles.title}>Takk til våre sponsorer!</h1>
            <div className={styles.container}>
                {logoPaths.map((logo, index) => (
                    <img width="50px" style={{ backgroundColor: logo.at(1) }} className={styles.logo} key={index} src={"/sponsorLogos/" + logo.at(0)}></img>
                ))}
            </div>
        </div>
    )
}