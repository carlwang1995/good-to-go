import React, { useState, useContext } from "react";
import { StateContext } from "@/contexts/ContextProvider";
import { storage } from "@/config/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { DB_updateTripInfoByDocId } from "@/libs/db/TripsDoc";
import Image from "next/image";
import Button from "@/components/Button";

const UploadCard = ({
  docId,
  oldPhotoName,
  setShowUpload,
}: {
  docId: string;
  oldPhotoName: string;
  setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const context = useContext(StateContext);
  if (context === undefined || context === null) {
    throw new Error(
      "ChildComponent must be used within a StateContext.Provider",
    );
  }
  const setState = context;

  const uploadTripImage = (docId: string, image: File) => {
    const storageRef = ref(storage, `images/${docId + "-" + image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setUploadProgress(String(progress) + "%");
        switch (snapshot.state) {
          case "paused":
            setUploadState("上傳暫停");
            break;
          case "running":
            setUploadState("上傳進度");
            break;
        }
      },
      (error) => {
        setUploadState("上傳失敗");
        setUploadProgress(null);
        throw new Error(error.message);
      },
      () => {
        const fileName = uploadTask.snapshot.ref.name;
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const value = { photo: { fileName, photoUrl: downloadURL } };
          DB_updateTripInfoByDocId(docId, value).then((result) => {
            if (result) {
              setMessage("圖片更新成功");
              setState((prev) => !prev);
            } else {
              setMessage("圖片更新失敗");
            }
            if (fileName !== oldPhotoName) {
              deleteOldPhoto(oldPhotoName);
            }
          });
        });
      },
    );
  };

  const deleteOldPhoto = async (oldPhoto: string) => {
    if (!oldPhoto || oldPhoto == "default") {
      return;
    }
    const desertRef = ref(storage, `images/${oldPhoto}`);
    try {
      await deleteObject(desertRef);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80">
      <div
        onClick={() => setShowUpload(false)}
        className="absolute h-full w-full items-center justify-center"
      ></div>
      <div className="z-50 mx-4 h-fit w-[380px] rounded-lg bg-white max-[420px]:w-full">
        <div className="flex h-full w-full flex-col p-4 max-[420px]:px-2">
          <div className="mx-2 flex items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              className="mr-1"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z"
                  fill="#0369a1"
                ></path>{" "}
                <path
                  d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
                  fill="#0369a1"
                ></path>{" "}
              </g>
            </svg>
            <p className="text-xl font-bold text-sky-800">上傳封面圖</p>
          </div>
          <div className="text m-2">
            <span>{uploadState && `${uploadState}： `}</span>
            <span>{uploadState && uploadProgress && uploadProgress}</span>
            <div className="w-full">
              {uploadState && uploadProgress && (
                <div
                  className={`h-2 bg-blue-500`}
                  style={{ width: uploadProgress }}
                ></div>
              )}
            </div>
          </div>
          <div className="mx-2 my-4 overflow-hidden border border-sky-800 p-1">
            {message ? (
              <div className="mx-2 text-sky-600">{message}</div>
            ) : (
              <input
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}
                type="file"
                accept="image/*"
                className="text-ellipsis text-nowrap hover:cursor-pointer"
              />
            )}
          </div>
          <div className="mr-2 flex justify-end">
            <Button
              title="關閉"
              type="cancel"
              onSmash={() => setShowUpload(false)}
            />
            {!message && image ? (
              <Button
                title="上傳"
                type="confirm"
                onSmash={async () => {
                  if (image) {
                    uploadTripImage(docId, image);
                  }
                }}
              />
            ) : (
              <Button title="上傳" type="undone" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCard;
