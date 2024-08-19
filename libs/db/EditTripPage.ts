import { db } from "@/config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
    const planDocId: string = planDocIdArr[0];
    const planContent: object = resultArr[0];
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
  stayTime?: string;
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
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
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
    await updateDoc(docRef, { [`trips.${dayIndex}.startTime`]: startTime });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const DB_upadateTripStayTime = async (
  docId: string,
  dayIndex: string,
  newPlaces: Array<object>,
) => {
  const docRef = doc(db, "plans", docId);
  const fieldPath = `trips.${dayIndex}.places`;
  try {
    await updateDoc(docRef, {
      [fieldPath]: newPlaces,
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export {
  DB_getTripNameByDocId,
  DB_getPlanByDocId,
  DB_updateTripPlan,
  DB_deleteTripPlanPlace,
  DB_updateTripStartTime,
  DB_upadateTripStayTime,
};
