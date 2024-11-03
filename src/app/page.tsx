import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <h1>Hei! Håkon Her, hvis du vil bruke database har jeg laget noen sider med noe testkode. Under en lenkene</h1>
      <p>1:</p>
      <a href="http://localhost:3000/testKodeDataBase/auksjonsObjecterTestSIde">Fremvisning av alle auksjonsobjekter</a>
      <p>2:(min favoritt)</p>
      <a href="http://localhost:3000/testKodeDataBase/genererOgSlettTestAkusjonsObjekter">generer og slett aksjonsobjekter</a>
      <p>3:</p>
      <a href="http://localhost:3000/testKodeDataBase/create-auctionitem-testSide-form">for å legge inn et auksjonsobjekt med form</a>
    </div>
  );
}
