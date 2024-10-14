import React, { useContext } from "react";
import Image from "next/image";
import { StateContext } from "@/contexts/ContextProvider";
import { DB_deleteTrip } from "@/libs/db/TripsDoc";
import { DB_deletePlanByDocId } from "@/libs/db/PlansDoc";
import { storage } from "@/config/firebase";
import { ref, deleteObject } from "firebase/storage";
import shareIcon from "@/public/share-svg.svg";

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
        className="fixed left-0 top-0 z-30 h-screen w-screen"
      ></div>
      <ul className="absolute right-2 top-2 z-40 h-fit items-center justify-center bg-white shadow-md">
        <li
          onClick={() => {
            setShowPravicy(true);
            setShowSetting(false);
          }}
          className="flex items-center p-1 transition hover:cursor-pointer hover:bg-blue-100"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z"
              fill="#1C274C"
            />
          </svg>
          隱私設定與分享
        </li>
        <li
          onClick={() => {
            setShowUpload(true);
            setShowSetting(false);
          }}
          className="flex items-center p-1 transition hover:cursor-pointer hover:bg-blue-100"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ff0000"
            className="mr-1"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M10 12V17"
                stroke="#ff0000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M14 12V17"
                stroke="#ff0000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M4 7H20"
                stroke="#ff0000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                stroke="#ff0000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                stroke="#ff0000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          刪除行程
        </li>
      </ul>
    </>
  );
};

export default ListSetting;
