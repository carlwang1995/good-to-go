import { auth, provider } from "@/config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const signInWithGoogle = async () => {
  try {
    const googleUser = await signInWithPopup(auth, provider);
    if (googleUser.operationType === "signIn") {
      return { result: true, message: googleUser };
    }
  } catch (e) {
    console.error(e);
    return { result: false, message: String(e) };
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
