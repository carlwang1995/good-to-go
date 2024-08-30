import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { StateContext } from "@/contexts/ContextProvider";
import UploadCard from "./UploadCard";
import { DB_deleteTrip, DB_deletePlanByDocId } from "@/libs/db/CreateTripPage";
import { storage } from "@/config/firebase";
import { ref, deleteObject } from "firebase/storage";
import PrivacySettingCard from "./PrivacySettingCard";

type ListItemProps = {
  docId: string;
  tripName: string;
  startDate: string;
  endDate: string;
  photoName: string;
  photoUrl: string;
  privacy: boolean;
};

const ListItem = ({
  docId,
  tripName,
  startDate,
  endDate,
  photoName,
  photoUrl,
  privacy,
}: ListItemProps) => {
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [showPravicy, setShowPravicy] = useState<boolean>(false);
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
      <div className="m-4 rounded-lg bg-white">
        <div className="relative rounded-lg shadow-lg transition hover:shadow-xl">
          <Link href={`plan/${docId}`}>
            <div className="relative z-10 flex min-h-[200px] min-w-[320px] max-w-[320px] flex-col justify-end rounded-lg">
              <div className={`absolute left-0 top-0 z-10 rounded-tl-lg`}>
                <div
                  className={`m-2 w-12 rounded-lg ${privacy ? "bg-green-900/70" : "bg-gray-800/70"} ${privacy ? "text-green-500" : "text-gray-400"} text-center`}
                >
                  {privacy ? "公開" : "私人"}
                </div>
              </div>
              <Image
                priority={true}
                src={photoUrl}
                alt="background"
                fill={true}
                sizes="{min-width:'300px'}"
                style={{ objectFit: "cover" }}
                className="absolute left-0 top-0 h-full w-full rounded-lg"
              ></Image>
              <div className="relative z-10 bg-white bg-white/80 px-3 py-2 text-xl font-bold">
                {tripName}
              </div>
              <div className="relative z-10 flex rounded-b-lg bg-white/80 px-3 pb-2">
                <div>{startDate}</div>
                <div className="mx-2">~</div>
                <div>{endDate}</div>
              </div>
            </div>
          </Link>
          <div
            onClick={() => setShowSetting(true)}
            className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:cursor-pointer hover:bg-white hover:shadow-lg"
          >
            <Image
              src="/setting.png"
              alt="setting"
              width={20}
              height={20}
            ></Image>
          </div>
          {showSetting ? (
            <>
              <div
                onClick={() => setShowSetting(false)}
                className="fixed left-0 top-0 z-20 h-screen w-screen"
              ></div>
              <ul className="absolute right-2 top-2 z-20 h-fit items-center justify-center bg-white hover:shadow-lg">
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
                    priority={true}
                  ></Image>
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
                    alt="upload"
                    width={15}
                    height={15}
                    className="mr-1 h-full w-fit"
                    priority={true}
                  ></Image>
                  上傳封面
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
                    priority={true}
                  ></Image>
                  刪除行程
                </li>
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {showUpload ? (
        <UploadCard
          docId={docId}
          setShowUpload={setShowUpload}
          oldPhotoName={photoName}
        />
      ) : (
        <></>
      )}
      {showPravicy ? (
        <PrivacySettingCard
          setShowPravicy={setShowPravicy}
          docId={docId}
          currentPrivacy={privacy}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ListItem;
