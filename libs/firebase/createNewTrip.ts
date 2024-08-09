import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
const createNewTrip = async (trip: object) => {
  try {
    let decRef = await addDoc(collection(db, "trips"), trip);
    return decRef.id;
  } catch (e) {
    console.log("Error adding document:", e);
  }
};

export { createNewTrip };
