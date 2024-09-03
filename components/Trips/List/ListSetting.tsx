import React, { useContext } from "react";
import Image from "next/image";
import { StateContext } from "@/contexts/ContextProvider";
import { DB_deleteTrip } from "@/libs/db/TripsDoc";
import { DB_deletePlanByDocId } from "@/libs/db/PlansDoc";
import { storage } from "@/config/firebase";
import { ref, deleteObject } from "firebase/storage";

type ListSettingProps = {
  docId: string;
  photoName: string;
  setShowSetting: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPravicy: React.Dispatch<React.SetStateAction<boolean>>;
};
const ListSetting = ({
  docId,
  photoName,
  setShowSetting,
  setShowUpload,
  setShowPravicy,
}: ListSettingProps) => {
  const setState = useContext(StateContext);
  if (!setState) {
    throw new Error("Can't access StateContext from ListItem.tsx.");
  }
  const deleteTrip = async (docId: string) => {
    try {
      let result = await DB_deleteTrip(docId);
      if (result) {
        DB_deletePlanByDocId(docId);
        setState((pre) => !pre);
      }
    } catch (e) {
      console.error(e);
    }
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
    <>
      <div
        onClick={() => setShowSetting(false)}
        className="fixed left-0 top-0 z-20 h-screen w-screen"
      ></div>
      <ul className="absolute right-2 top-2 z-20 h-fit items-center justify-center bg-white shadow-md">
        <li
          onClick={() => {
            setShowPravicy(true);
            setShowSetting(false);
          }}
          className="flex items-center p-1 transition hover:cursor-pointer hover:bg-blue-100"
        >
          <Image
            src="/share.png"
            alt="share"
            width={15}
            height={15}
            className="mr-1 h-full w-fit"
          />
          隱私設定與分享
        </li>
        <li
          onClick={() => {
            setShowUpload(true);
            setShowSetting(false);
          }}
          className="flex items-center p-1 transition hover:cursor-pointer hover:bg-blue-100"
        >
          <Image
            src="/upload.png"
            alt="edit"
            width={15}
            height={15}
            className="mr-1 h-full w-fit"
          />
          上傳封面圖
        </li>
        <li
          onClick={() => {
            deleteTrip(docId);
            deleteOldPhoto(photoName);
            setShowSetting(false);
          }}
          className="flex items-center p-1 text-red-400 transition hover:cursor-pointer hover:bg-blue-100"
        >
          <Image
            src="/delete.png"
            alt="delete"
            width={15}
            height={15}
            className="mr-1 h-full w-fit"
          />
          刪除行程
        </li>
      </ul>
    </>
  );
};

export default ListSetting;
