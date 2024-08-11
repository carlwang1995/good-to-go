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

export { DB_createNewTrip, DB_getTrips };
