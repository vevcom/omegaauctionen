"use client";

import { useState } from "react";
import PopUpBox from "@/app/components/popUp/popUp"
import { uploadImage } from "@/app/components/pictureServerComponents/uploadImageServerFunction"
export default function ImageUploaderButton({ setUploadedFileName,styleNameButton,styleNameBrowse }: { setUploadedFileName: React.Dispatch<React.SetStateAction<string>> , styleNameButton:string,styleNameBrowse:string }) {
  /**
   * Uploads file to server
   * takes in a useState changer for the usestate image uploader
   */
  const [popUpOn, SetPopUpOn] = useState(false)
  const [popUpText, SetPopUpText] = useState("")
  const popUpLength_ms = 5000

  const delay = (ms:number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  async function alertBox(alertText: string) {
    SetPopUpText(alertText)
    SetPopUpOn(true)
    await delay(popUpLength_ms);
    SetPopUpOn(false)
    SetPopUpText("")
  }





  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alertBox("Velg en fil først");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await uploadImage(formData);
    if (response.success) {
      setUploadedFileName(response.data.filename); // Update parent state
      alertBox(`Opplastning vellykket`);
    } else {
      alertBox("Noe gikk galt. Vent litt og prøv igjen");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <input className={styleNameBrowse} type="file" accept="image/*" onChange={handleFileChange} />
      <button
        className={styleNameButton}
        onClick={handleUpload}
      >
        Last opp
      </button>
      <PopUpBox text={popUpText} isActive={popUpOn}></PopUpBox>
    </div>
  );
}
