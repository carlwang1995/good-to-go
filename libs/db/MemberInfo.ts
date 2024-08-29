import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { userAgent } from "next/server";
import { userInfo } from "os";
const DB_createNewMember = async (
  userId: string,
  userName: string,
  email: string,
  photoUrl?: string,
) => {
  try {
    let data;
    if (photoUrl) {
      data = { userId, userName, email, photoUrl };
    } else {
      data = { userId, userName, email, photoUrl: "/user.png" };
    }
    const decRef = await addDoc(collection(db, "members"), data);
    return true;
  } catch (e) {
    console.error("Error adding document:", e);
    return false;
  }
};

const DB_getUserInfoByUserId = async (userId: string) => {
  const q = query(collection(db, "members"), where("userId", "==", userId));
  try {
    const querySnapshot = await getDocs(q);
    let userInfoArr: Array<object> = [];
    let memberDocIdArr: Array<any> = [];
    querySnapshot.docs.map((doc) => {
      userInfoArr.push(doc.data());
      memberDocIdArr.push(doc.id);
    });
    const docId: string = memberDocIdArr[0];
    const userInfo: object = userInfoArr[0];
    return { docId, userInfo };
  } catch (e) {
    console.error(e);
  }
};

const DB_updateUserInfo = async (
  docId: string,
  data: {
    userId: string;
    userName: string;
    email: string;
    photoUrl?: string;
  },
) => {
  const docRef = doc(db, "members", docId);
  try {
    await updateDoc(docRef, data);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export { DB_createNewMember, DB_getUserInfoByUserId, DB_updateUserInfo };
