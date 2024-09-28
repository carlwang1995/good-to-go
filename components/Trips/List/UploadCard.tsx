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
import { Button } from "@/components/Button";

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
            <Image
              src="/upload-sky.png"
              alt="upload"
              width={30}
              height={30}
              style={{ width: "20px", height: "20px", marginRight: "4px" }}
              loading="eager"
            />
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
