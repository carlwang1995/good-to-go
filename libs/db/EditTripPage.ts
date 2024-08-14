import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

const DB_getTripNameByDocId = async (docId: string) => {
  const docRef = doc(db, "trips", docId);
  try {
    const response = await getDoc(docRef);
    const result = response.data();
    if (result !== undefined) {
      return result;
    } else {
      console.log("查無資料");
    }
  } catch (e) {
    console.error(e);
  }
};

const DB_getPlanByDocId = async (docId: string) => {
  const q = query(collection(db, "plans"), where("docId", "==", docId));
  try {
    const querySnapshot = await getDocs(q);
    let resultArr: Array<object> = [];
    let planDocIdArr: Array<any> = [];
    querySnapshot.forEach((doc) => {
      resultArr.push(doc.data());
      planDocIdArr.push(doc.id);
    });
    const result = resultArr[0];
    const planDocId = planDocIdArr[0];
    return { planDocId, result };
  } catch (e) {
    console.error(e);
  }
};

const DB_getTripInfo = async () => {
  const data = {
    docId: "6mNLLq2srPuWGXx3a2Uc",
    trips: [
      {
        // 第1天
        startTime: "08:00",
        places: [
          {
            placeId: "aaaa",
            name: "台北小巨蛋",
            address: "台北市南京東路",
            stayTime: "00:30",
          },
          {
            placeId: "bbbb",
            name: "台北101",
            address: "台北市信義路101號",
            stayTime: "00:40",
          },
          {
            placeId: "cccc",
            name: "松山機場",
            address: "松山路123號",
            stayTime: "00:50",
          },
        ],
      },
      {
        // 第2天
        startTime: "10:00",
        places: [
          {
            placeId: "dddd",
            name: "台北火車站",
            address: "台北市忠孝西路1號",
            stayTime: "01:00",
          },
          {
            placeId: "eeee",
            name: "中山捷運站",
            address: "中山路1111號",
            stayTime: "01:00",
          },
          {
            placeId: "ffff",
            name: "西門町",
            address: "中華路一段123號",
            stayTime: "01:00",
          },
        ],
      },
    ],
  };
  return data;
};

export { DB_getTripNameByDocId, DB_getPlanByDocId, DB_getTripInfo };
