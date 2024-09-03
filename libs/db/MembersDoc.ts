import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
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

interface UserInfo {
  userId: string;
  userName: string;
  email: string;
  photoUrl: string;
}
const DB_getUserInfoByUserId = async (userId: string) => {
  const q = query(collection(db, "members"), where("userId", "==", userId));
  try {
    const querySnapshot = await getDocs(q);
    let userInfoArr: Array<any> = [];
    let memberDocIdArr: Array<any> = [];
    querySnapshot.docs.map((doc) => {
      userInfoArr.push(doc.data());
      memberDocIdArr.push(doc.id);
    });
    const docId: string = memberDocIdArr[0];
    const userInfo: UserInfo = userInfoArr[0];
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
