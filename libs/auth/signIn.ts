import { auth, provider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.operationType === "signIn") {
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export { signInWithGoogle };
