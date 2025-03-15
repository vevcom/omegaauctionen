import style from "./component.module.scss"

export default function SponsorLogos() {
    //Sponsor name, link to homepage, logo-link 
    const sponsorList = [
        ["Sponsor 1", "https://www.youtube.com/", "https://picsum.photos/300/200"],
        ["Sponsor 2", "https://en.wikipedia.org/wiki/European_Telecommunications_Standards_Institute", "https://picsum.photos/300/200"],
        ["Sponsor 3", "https://shop.teletubbies.com/collections/personalised/", "https://picsum.photos/300/200"],
        ["Sponsor 4", "https://www.bbcearth.com/factfiles/animals/mammals/monkey", "https://picsum.photos/300/200"],
        ["Sponsor 5", "https://duckduckgo.com/?q=league+of+legends&t=newext&atb=v459-1&ia=web/", "https://picsum.photos/300/200"],
    ]

    return (
        <div className={style.mainDiv}>
            <h1 className={style.sponsorTitle}>Våre sponsorer</h1>
            <div className={style.sponsorHolder}>
                {sponsorList.map((sponsor) => (
                    <a className={style.imageContainer} key={sponsor[0]} href={sponsor[1]}>
                        <img className={style.image} src={sponsor[2]}></img>
                    </a>
                ))}
            </div>
        </div>
    )
}