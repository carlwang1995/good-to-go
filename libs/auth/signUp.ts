import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const signUpWithUserNameAndEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    return true;
  } catch (e: any) {
    const errorMessage: string =
      "註冊失敗，" + e.message.split(":")[1].split("/")[1].split(")")[0];
    return errorMessage;
  }
};

export { signUpWithUserNameAndEmailAndPassword };
