import { auth, provider } from "@/config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.operationType === "signIn") {
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

const signInWithUserEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export { signInWithGoogle, signInWithUserEmailAndPassword };
