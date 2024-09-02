import { auth, provider } from "@/config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const signInWithGoogle = async () => {
  try {
    const googleUser = await signInWithPopup(auth, provider);
    if (googleUser.operationType === "signIn") {
      return { ok: true, message: googleUser };
    }
  } catch (e) {
    console.error(e);
    return { error: true, message: "登入失敗" };
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
    return { ok: true, user };
  } catch (e) {
    console.error(e);
    return { error: true, message: "登入失敗" };
  }
};

export { signInWithGoogle, signInWithUserEmailAndPassword };
