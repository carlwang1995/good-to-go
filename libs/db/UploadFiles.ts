import { storage } from "@/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const uploadTripImage = (image: File) => {
  const storageRef = ref(storage, `images/${image.name}`);

  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("上傳進度：" + String(progress) + "%");
      switch (snapshot.state) {
        case "paused":
          console.log("上傳暫停");
          break;
        case "running":
          console.log("上傳進行中");
          break;
      }
    },
    (error) => {
      console.log("上傳失敗");
      throw new Error(error.message);
    },
    () => {
      const fileName = uploadTask.snapshot.ref.name;
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("圖片名稱是：" + fileName);
        console.log("圖片網址是：" + downloadURL);
        return downloadURL;
      });
    },
  );
};

export { uploadTripImage };
