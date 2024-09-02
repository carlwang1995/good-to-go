import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
const DB_createNewTrip = async (trip: object) => {
  try {
    let decRef = await addDoc(collection(db, "trips"), trip);
    return decRef.id;
  } catch (e) {
    console.error("Error adding document:", e);
    return false;
  }
};

const DB_createNewPlan = async (plan: { docId: string; trips: object }) => {
  try {
    await addDoc(collection(db, "plans"), plan);
    return true;
  } catch (e) {
    console.error("Error adding document:", e);
    return false;
  }
};

const DB_getTrips = async (userId: string) => {
  const q = query(
    collection(db, "trips"),
    where("userId", "==", userId),
    orderBy("createTime", "desc"),
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

const DB_updateTripInfoByDocId = async (docId: string, value: object) => {
  const docRef = doc(db, "trips", docId);
  try {
    await updateDoc(docRef, value);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { error: true, message: e };
  }
};

const DB_getTripsByPrivacy = async () => {
  const q = query(
    collection(db, "trips"),
    where("privacy", "==", true),
    orderBy("createTime", "desc"),
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

export {
  DB_createNewTrip,
  DB_createNewPlan,
  DB_getTrips,
  DB_deleteTrip,
  DB_deletePlanByDocId,
  DB_updateTripInfoByDocId,
  DB_getTripsByPrivacy,
};
