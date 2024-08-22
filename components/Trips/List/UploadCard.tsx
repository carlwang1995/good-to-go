import React, { useState, useContext } from "react";
import { StateContext } from "@/contexts/ContextProvider";
import { storage } from "@/config/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { DB_updateTripPhotoByDocId } from "@/libs/db/CreateTripPage";

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
          const photoObj = { fileName, photoUrl: downloadURL };
          DB_updateTripPhotoByDocId(docId, photoObj).then((result) => {
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
      <div className="z-50 h-fit min-w-[380px] rounded-lg bg-slate-100">
        <div className="flex h-full w-full flex-col p-4">
          <div className="flex justify-center"></div>
          <div className="ml-2 text-lg font-bold">上傳封面圖</div>
          <div className="text m-2">
            <span>{uploadState ? `${uploadState}： ` : null}</span>
            <span>{uploadState && uploadProgress ? uploadProgress : null}</span>
          </div>
          <div className="mx-2 my-4 overflow-hidden border border-solid border-slate-500 p-2">
            {message ? (
              <div>{message}</div>
            ) : (
              <input
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}
                type="file"
                accept="image/*"
                className="text-ellipsis text-nowrap hover:cursor-pointer hover:bg-slate-200"
              />
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowUpload(false)}
              className="mr-4 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
            >
              返回
            </button>
            {message ? (
              <></>
            ) : image ? (
              <button
                onClick={async () => {
                  if (image) {
                    uploadTripImage(docId, image);
                  }
                }}
                className="mr-2 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
              >
                上傳
              </button>
            ) : (
              <button className="mr-2 rounded border-[1px] border-solid border-slate-400 bg-gray-200 px-2 py-1 text-lg text-gray-400 hover:cursor-default">
                上傳
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCard;
