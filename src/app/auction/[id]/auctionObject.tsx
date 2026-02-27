"use client"
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import style from "./component.module.scss"
import {Study, AuksjonsObjektType } from "@/generated/enums";
import is_admin from "@/app/components/is-admin/is-admin-func";
import ApproveButton from "@/app/components/approve-button/approve-button";
import DeleteButton from "@/app/components/delete-button/delete-button";
import ImageFromFileName from "@/app/components/pictureServerComponents/getImgFromNameComponent";
import buy_item from "@/app/components/buy-item/buy-item";
import PopUpBox from "@/app/components/popUp/popUp"
import placeBid from "@/app/components/place-bid-func/place-bid-func";
import getObjectById from "@/app/components/get-object-from-id/get-object-from-id";
import has_bought_cape from "@/app/components/has-bought-cape/has-bought-cape";
import HighestBidder from "@/app/components/highestBidder/highestBidder";
import get_user_info from "@/app/components/getUSerInfo/getUserinfo";
import { getLogo } from "@/app/logos/logos";
import { is_logged_in } from "@/app/components/get-user-login/get-user-login";
import CollapsibleSection from "@/app/components/collapsible-section/collapsible-section";
import {AuksjonsObjekt} from "@/generated/client"


type setUseStateBool = Dispatch<SetStateAction<boolean>>;


function UserObject({ userInfo }: {
  userInfo: {
    name: string;
    email: string | null;
    studyCourse: Study;
  }
}) {
  console.log("hei")
  return (
    <div>
      <p>Name:{userInfo.name}</p>
      <p>Mail:{userInfo.email}</p>
      <p>Studie:{userInfo.studyCourse.toLocaleUpperCase()}</p>
    </div>
  )
}



function BidPanel({ object, currentPrice }: { object: AuksjonsObjekt, currentPrice: number }) {
  // const [bidAmount, setBidAmount] = useState("");
  const [popUpOn, SetPopUpOn] = useState(false)
  const [popUpText, SetPopUpText] = useState("")
  const popUpLengthMilliSeconds = 5000

  const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );


  async function alertBox(alertText: string) {
    SetPopUpText(alertText)
    SetPopUpOn(true)
    await delay(popUpLengthMilliSeconds);
    SetPopUpOn(false)
    SetPopUpText("")
  }


  async function tryPlaceBid(e: FormData) {
    const value = e.get("bidAmountInKRONER");
    if (!value) {
      alertBox("Du må skrive inn tall")
      return;
    }
    if (((typeof (parseInt(value as string)) === "number") == false) || ((value as string) == "") || parseInt(value as string) < 0) {
      alertBox("Skriv inn et gyldig tall")
      return;
    }

    const bidAmount = parseInt(value as string)
    if (bidAmount <= currentPrice) {
      alertBox("By over den nåværende prisen")
      return;
    }
    const response = await placeBid(object, bidAmount)
    alertBox(response)
  }

  return (
    <div className={style.bidPanelContainer}>
      <p className={style.currentPrice} >
        {currentPrice !== null ? (<b>{currentPrice} kr</b>) : <b> kr</b>}
      </p>
      <form className={style.form}
        action={(e) => {
          tryPlaceBid(e);
        }}>
        <input
          className={style.input}
          type="number"
          placeholder="Skriv inn bud"
          name="bidAmountInKRONER"
          step="any"
          min={currentPrice + 10}
          required
          onKeyDown={(e) => {
            if (["+", "-", "e", "E"].includes(e.key)) {
              e.preventDefault();
            }
          }}
        />
        <button className={style.button} type="submit">Legg inn bud</button>
        <PopUpBox text={popUpText} isActive={popUpOn}></PopUpBox>
      </form>
    </div>
  )
}

async function buy(object: AuksjonsObjekt, setHasBoughtCape: setUseStateBool, currentPrice: number) {
  if (!confirm("Vil du kjøpe til" + (currentPrice).toString() + "kr?")) {
    return;
  }
  const buyItemResponse = await buy_item(object.id)
  if (buyItemResponse !== true) {
    console.log(buyItemResponse)
    return
  }
  setHasBoughtCape(true)
}

function BuyPanel({ object, hasBoughtCape, isTime, setHasBoughtCape, currentPrice }: {
  object: AuksjonsObjekt, hasBoughtCape: boolean, isTime: boolean, setHasBoughtCape: setUseStateBool, currentPrice: number
}) {
  if (!isTime) {
    return (
      <h2 className={style.buyPanelText}>Salget starter 05.03.2026 12:00 og slutter {object.currentSaleTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).substring(0, 5)}</h2>
    )
  }

  if (hasBoughtCape) {
    return (
      <h2 className={style.buyPanelText} >Du har kjøpt denne kappen 😎</h2>
    )
  }

  if (object.stock < 1) {
    return (
      <h2 className={style.buyPanelText} >Denne kappen er desverre utslogt</h2>
    )
  }


  return (
    <button className={style.buyButton} onClick={() => buy(object, setHasBoughtCape, currentPrice)}>Kjøp for {currentPrice}kr</button>
  )

}

function PurchasePanel(
  { object,
    currentPrice,
    isTime,
    isLoggedIn,
    hasBoughtCape,
    setHasBoughtCape
  }
    :
    {
      object: AuksjonsObjekt,
      currentPrice: number,
      isTime: boolean,
      isLoggedIn: boolean,
      hasBoughtCape: boolean,
      setHasBoughtCape: setUseStateBool
    }) {
  if (object.type == "AUKSJON") {
    return (
      <div>
        {(isTime && isLoggedIn)
          ?
          <BidPanel currentPrice={currentPrice} object={object}></BidPanel>
          :
          <h2>
            Budrunden starter 05.03.2026 12:00 og slutter
            {object.currentSaleTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).substring(0, 5)}
          </h2>}
        {
          (isTime && !isLoggedIn)
            ?
            <h2 className={style.notLoggedInText}>Du er ikke logget inn</h2>
            :
            <></>
        }
        <div className={style.note}><b>*MERK*</b> Alle bud er bindende. Nye bud må være minimum 10 kr høyere enn ledende bud.</div>
      </div>
    )
  }
  if (object.type == "SALG") {
    return (
      <div>
        <h2 className={style.capesLeftText}>{object.stock} kapper igjen!</h2>
        {
          isLoggedIn
            ?
            <BuyPanel
              currentPrice={currentPrice}
              setHasBoughtCape={setHasBoughtCape}
              hasBoughtCape={hasBoughtCape}
              isTime={isTime}
              object={object}>

            </BuyPanel>
            :
            <h2 className={style.notLoggedInText}>Du er ikke logget inn</h2>
        }

        <div className={style.note}><b>*MERK*</b> Alle kjøp er binnende</div>
      </div>
    )
  }
  if (object.type == "LIVE") {
    return;
  }
}


export default function AuctionObject({ object, currentPrice }: { object: AuksjonsObjekt, currentPrice: number }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTime, setIsTime] = useState(false)
  const [currentObject, setCurrentObject] = useState(object)
  const [hasBoughtCape, setHasBoughtCape] = useState(false)
  const [reload, setReload] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string | null;
    studyCourse: Study;
  } | null>
    (null)
  const committeeLogotoLink = getLogo(object.committee);
  const auksjonsDate = "2026-03-05T11:00:00.000Z"

  useEffect(() => {
    async function fetchData() {
      const is_admin_response = await is_admin()
      setIsAdmin(is_admin_response)

      const is_logged_in_response = await is_logged_in()
      setIsLoggedIn(is_logged_in_response)

      if (currentObject.type == AuksjonsObjektType.SALG) {
        const hasBoughtCapeResponse = await has_bought_cape(currentObject.id)
        setHasBoughtCape(hasBoughtCapeResponse)
      }

      const auctionDate = new Date(auksjonsDate) //DON'T ADJUST FOR time difference it uses right time
      const currentSaleTime = currentObject.currentSaleTime
      const now = new Date()
      setIsTime((now > auctionDate) && (now < currentSaleTime))


      if (is_admin_response) {
        if (!currentObject.authorId) { return; }
        const userInfoResponse = await get_user_info(currentObject.authorId)
        if (userInfoResponse) {
          setUserInfo(userInfoResponse)
        }
      }


      if (is_admin_response) { //TODO: remove before prod
        setIsTime(true)
      }

    }
    fetchData();
    const interval = setInterval(async () => {
      const newObject = await getObjectById(object.id)
      if (!newObject) {
        return;
      }
      setCurrentObject(newObject)

      const is_admin_response = await is_admin()
      setIsAdmin(is_admin_response)
      if (is_admin_response) {
        if (!currentObject.authorId) { return; }
        const userInfoResponse = await get_user_info(currentObject.authorId)
        if (userInfoResponse) {
          setUserInfo(userInfoResponse)
        }
      }

      const auctionDate = new Date(auksjonsDate) //DON'T ADJUST FOR time difference it uses right time
      const currentSaleTime = currentObject.currentSaleTime
      const now = new Date()
      setIsTime((now > auctionDate) && (now < currentSaleTime))

      if (is_admin_response) { //TODO: remove before prod
        setIsTime(true)
      }
      // TODO: Remove
      setReload(prev => !prev);


    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const itemType = currentObject.type

  if (!currentObject.approved && !isAdmin) {
    return (
      <h1>Du har ikke tilgang. Dette objektet er ikke godkjent.</h1>
    )
  }


  return (
    <div className={style.objectPage}>
      <div className={style.objectHeading}>
        {object.committee != "NOTCOM" ?
          <div className={style.committeeHeading}>
            <div className={style.committeeName}>{currentObject.committee}</div>
            <img className={style.committeeLogo} src={committeeLogotoLink}></img>
          </div>
          :
          null
        }
        <div className={style.title}>{currentObject.name} </div>
        <div className={style.imagecontainer}>
          <ImageFromFileName style={style.auctionImage} filename={currentObject.imageName}></ImageFromFileName>
        </div>
        <PurchasePanel
          object={currentObject}
          currentPrice={currentPrice}
          isLoggedIn={isLoggedIn}
          isTime={isTime}
          hasBoughtCape={hasBoughtCape}
          setHasBoughtCape={setHasBoughtCape}
        >
        </PurchasePanel>

        <CollapsibleSection
          content={<div className={style.description}>{object.description}</div>}
          defaultOpen={false}
          title="Beskrivelse"
        >
        </CollapsibleSection>


      </div>
      {isTime && (currentObject.type == "AUKSJON")
        ?
        <CollapsibleSection
          content={
            <HighestBidder reload={reload} objectId={currentObject.id}>
            </HighestBidder>
          }
          defaultOpen={false}
          title="Nylige bud"
        >
        </CollapsibleSection>
        :
        null}
      {(isAdmin && userInfo) ? <UserObject userInfo={userInfo}></UserObject> : null}
      {(isAdmin && (currentObject.approved)) ? <DeleteButton objectId={currentObject.id} ></DeleteButton> : null}
      {(isAdmin && (!currentObject.approved)) ? <ApproveButton objectId={currentObject.id} ></ApproveButton> : null}
    </div>
  )
}