
import { Committee} from "@prisma/client";

const committeeToLink = {
  [Committee.NOTCOM]: "https://omega.ntnu.no/static/479220c49c7c0b2f742d.png",
  [Committee.VEVCOM]: 'https://www.omega.ntnu.no/store/image/default/vevcomlogo.webp?url=/store/images/1ca57af5-141f-4037-b1a2-61120e0bc8c8.webp',
  [Committee.HS]: "https://www.omega.ntnu.no/store/image/default/omega_icon3.webp?url=/store/images/3a9012c3-f51a-4aa8-8ba5-78b51626eb40.webp",
  [Committee.FADDERSTYRET]: "https://www.omega.ntnu.no/store/image/default/fadderstyret.webp?url=/store/images/5777e00c-3255-4413-b73b-d3b88ad33a06.webp&webp=true",
  [Committee.OMBUL]: "https://www.omega.ntnu.no/store/image/default/ombul.webp?url=/store/images/24f38ad0-2870-4f27-9f73-30c844925347.webp&webp=true",
  [Committee.LOCCOM]: "https://www.omega.ntnu.no/store/image/default/loccom.webp?url=/store/images/953c910a-0b03-43fa-9fc7-7e4d55b1592f.webp",
  [Committee.CONTACTOR]: "https://www.omega.ntnu.no/store/image/default/contactor.webp?url=/store/images/824dc0fb-692e-46bb-9b15-99190fc2a5fb.webp&webp=true",
  [Committee.KIELDER]: "https://www.omega.ntnu.no/store/image/default/kielder.webp?url=/store/images/22d51933-8b68-48fb-ba9a-1ba8cc9512b7.webp&webp=true",
  [Committee.PHAESTCOM]: "https://www.omega.ntnu.no/store/image/default/phaestcom.jpg?url=/store/images/e9c4d5e3-6fa0-4335-8101-a21d01b36c95.jpg&webp=true",
  [Committee.SPORTOGSPILL]: "https://www.omega.ntnu.no/store/image/default/sport%26spill.jpg?url=/store/images/d37b7184-6fda-45ae-9686-6b0e8e246c9e.jpg&webp=tru",
  [Committee.DGR]: "https://www.omega.ntnu.no/store/image/default/omega_icon3.webp?url=/store/images/3a9012c3-f51a-4aa8-8ba5-78b51626eb40.webp",
  [Committee.OV]: "https://www.omega.ntnu.no/store/image/default/ov.webp?url=/store/images/ca3f89fd-c538-4922-beb6-9a0d9af43e2a.webp&webp=true",
  [Committee.SOSCOM]: "https://www.omega.ntnu.no/store/image/default/soscom.webp?url=/store/images/00d27b98-1749-4b59-a478-05f802eceedc.webp",
  [Committee.HEUTTECOM]: "https://www.omega.ntnu.no/store/image/resize/2000/2000/IMG_1802.jpg?url=/store/images/349d4e57-320b-4db7-882c-c43168f4c16f.jpg&progressive=true&quality=100&format=jpeg",
  [Committee.BRYGCOM]: "https://www.omega.ntnu.no/store/image/default/bryggcom2.webp?url=/store/images/70257369-d841-472a-aadb-6a3ed1e32d46.webp&webp=true",
  [Committee.BLAESTCOM]: "https://www.omega.ntnu.no/store/image/default/omegalogo blast.webp?url=/store/images/9a9fce66-bf6c-4370-893e-149771a0e1b2.webp&webp=true",
  [Committee.LOPHTCOM]: "https://www.omega.ntnu.no/store/image/default/lophtcom.webp?url=/store/images/54678ea8-57d4-43b7-857b-46cb60304d98.webp",
  [Committee.OMEGAREVYEN]: "https://www.omega.ntnu.no/store/image/default/oemgarevyen.jpg?url=/store/images/504bf697-2715-4f68-9e2c-814683ba5994.jpg&webp=true",
  [Committee.PHINANSCOM]: "https://www.omega.ntnu.no/store/image/default/finans-black-box.webp?url=/store/images/592bd532-cc6c-4881-b502-aecf5d70b087.webp&webp=true",
};


export function getLogo(committee:Committee){
    return committeeToLink[committee]
}