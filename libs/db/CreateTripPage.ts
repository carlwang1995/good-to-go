import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
const DB_createNewTrip = async (trip: object) => {
  try {
    let decRef = await addDoc(collection(db, "trips"), trip);
    return decRef.id;
  } catch (e) {
    console.error("Error adding document:", e);
  }
};

const DB_createNewPlan = async (plan: { docId: string; trips: object }) => {
  try {
    let decRef = await addDoc(collection(db, "plans"), plan);
    return decRef.id;
  } catch (e) {
    console.error("Error adding document:", e);
  }
};

const DB_getTrips = async (userId: string) => {
  const q = query(
    collection(db, "trips"),
    where("userId", "==", userId),
    orderBy("startDate", "asc"),
  );
  try {
    const querySnapshot = await getDocs(q);
    let result: Array<object> = [];
    querySnapshot.forEach((doc) => {
      const docId = doc.id;
      result.push({ docId, ...doc.data() });
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};

const DB_deleteTrip = async (docId: string) => {
  try {
    await deleteDoc(doc(db, "trips", docId));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const DB_deletePlanByDocId = async (docId: string) => {
  const q = query(collection(db, "plans"), where("docId", "==", docId));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, "plans", docSnapshot.id));
      return true;
    });
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  DB_createNewTrip,
  DB_createNewPlan,
  DB_getTrips,
  DB_deleteTrip,
  DB_deletePlanByDocId,
};
