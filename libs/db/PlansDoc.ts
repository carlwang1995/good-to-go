import { db } from "@/config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getTimeNow } from "../timeConvertor";

const DB_createNewPlan = async (plan: { docId: string; trips: object }) => {
  try {
    await addDoc(collection(db, "plans"), plan);
    return true;
  } catch (e) {
    console.error("Error adding document:", e);
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

const DB_getPlanByTripsDocId = async (docId: string) => {
  const q = query(collection(db, "plans"), where("docId", "==", docId));
  try {
    const querySnapshot = await getDocs(q);
    let resultArr: Array<any> = [];
    let planDocIdArr: Array<any> = [];
    querySnapshot.forEach((doc) => {
      resultArr.push(doc.data());
      planDocIdArr.push(doc.id);
    });
    const planDocId: string = planDocIdArr[0];
    const planContent: { trips: object } = resultArr[0];
    return { planDocId, planContent };
  } catch (e) {
    console.error(e);
  }
};

type PlaceType = {
  id?: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  openNow?: boolean;
  stayTime?: string;
  trafficMode?: string;
};
const DB_updateTripPlan = async (
  dayIndex: string,
  docId: string,
  place: PlaceType,
) => {
  const docRef = doc(db, "plans", docId);
  try {
    await updateDoc(docRef, {
      [`trips.${dayIndex}.places`]: arrayUnion(place),
      [`trips.${dayIndex}.lastEditTime`]: getTimeNow(),
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const DB_updateTrips = async (docId: string, newTrips: object) => {
  const docRef = doc(db, "plans", docId);
  try {
    await updateDoc(docRef, { trips: newTrips });
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { error: true, message: "'firebase/plans'文件更新失敗" };
  }
};

const DB_deleteTripPlanPlace = async (
  dayIndex: string,
  docId: string,
  place: PlaceType,
) => {
  const docRef = doc(db, "plans", docId);
  try {
    await updateDoc(docRef, {
      [`trips.${dayIndex}.places`]: arrayRemove(place),
      [`trips.${dayIndex}.lastEditTime`]: getTimeNow(),
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const DB_updateTripStartTime = async (
  docId: string,
  dayIndex: string,
  startTime: string,
) => {
  const docRef = doc(db, "plans", docId);
  try {
    await updateDoc(docRef, {
      [`trips.${dayIndex}.startTime`]: startTime,
      [`trips.${dayIndex}.lastEditTime`]: getTimeNow(),
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const DB_upadatePlaceInfo = async (
  docId: string,
  dayIndex: string,
  newPlaces: Array<object>,
) => {
  const docRef = doc(db, "plans", docId);
  const fieldPath = `trips.${dayIndex}.places`;
  try {
    await updateDoc(docRef, {
      [fieldPath]: newPlaces,
      [`trips.${dayIndex}.lastEditTime`]: getTimeNow(),
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  DB_createNewPlan,
  DB_getPlanByTripsDocId,
  DB_deletePlanByDocId,
  DB_updateTripPlan,
  DB_deleteTripPlanPlace,
  DB_updateTripStartTime,
  DB_upadatePlaceInfo,
  DB_updateTrips,
};
