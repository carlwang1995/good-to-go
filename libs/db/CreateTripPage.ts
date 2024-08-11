import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
const DB_createNewTrip = async (trip: object) => {
  try {
    let decRef = await addDoc(collection(db, "trips"), trip);
    return decRef.id;
  } catch (e) {
    console.log("Error adding document:", e);
  }
};

const DB_getTrips = async (userId: string) => {
  const q = query(
    collection(db, "trips"),
    where("userId", "==", userId),
    orderBy("startDate", "asc"),
  );
  const querySnapshot = await getDocs(q);
  let result: Array<object> = [];
  querySnapshot.forEach((doc) => {
    const docId = doc.id;
    result.push({ docId, ...doc.data() });
  });
  return result;
};
// docId: string, dates: Array<string>
const DB_getTripInfo = () => {
  const data = {
    docId: "6mNLLq2srPuWGXx3a2Uc",
    trips: {
      "1": {
        // 第1天
        startTime: "08:00",
        places: [
          {
            name: "台北小巨蛋",
            address: "台北市南京東路",
            stayTime: "01:00",
          },
          {
            name: "台北101",
            address: "台北市信義路101號",
            stayTime: "01:00",
          },
          {
            name: "松山機場",
            address: "松山路123號",
            stayTime: "01:00",
          },
        ],
      },
      "2": {
        // 第2天
        startTime: "08:00",
        places: [
          {
            name: "台北火車站",
            address: "台北市忠孝西路1號",
            stayTime: "01:00",
          },
          {
            name: "中山捷運站",
            address: "中山路1111號",
            stayTime: "01:00",
          },
          {
            name: "西門町",
            address: "中華路一段123號",
            stayTime: "01:00",
          },
        ],
      },
    },
  };
};

export { DB_createNewTrip, DB_getTrips };
