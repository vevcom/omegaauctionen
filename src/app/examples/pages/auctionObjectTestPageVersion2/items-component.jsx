"use client";
import ImageFromFileName from "@/app/components/pictureServerComponents/getImgFromNameComponent";
import "./styles.css"


export default function ItemPageComponent({ allPages, currentPageNumber }) {
  if (!allPages[currentPageNumber]){
    return <p>Igen flere ting å se her</p>;
  }

  return (
    <div id="mainDiv">
      <div id="artikkler">
        {allPages[currentPageNumber]?.map((item) => (
          <a key={item.id} className="artikkel">
            <ImageFromFileName filename={item.imageName} />
            <h2>{item.name}</h2>
            <hr />
            <p>{item.description}</p>
            <hr />
            <p>Price: {item.startPriceOre ? item.startPriceOre / 100 : "Unknown"} kr</p>
            <hr />
            <p className={item.approved ? "ja" : "nei"}>
              {item.approved ? "Approved" : "Not Approved"}
            </p>
            <hr />
            <p>Object ID: {item.id}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
