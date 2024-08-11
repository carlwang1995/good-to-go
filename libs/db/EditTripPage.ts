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

const DB_getTripInfoByDocId = async (docId: string) => {
  try {
    const docRef = doc(db, "trips", docId);
    const response = await getDoc(docRef);
    const result = response.data();
    if (result !== undefined) {
      return result;
    } else {
      console.log("查無資料");
    }
  } catch (e) {
    console.log(e);
  }
};

export { DB_getTripInfoByDocId };
