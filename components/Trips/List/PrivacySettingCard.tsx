import React, { useState, useContext } from "react";
import { StateContext } from "@/contexts/ContextProvider";
import { DB_updateTripInfoByDocId } from "@/libs/db/TripsDoc";
import Image from "next/image";

const PrivacySettingCard = ({
  setShowPravicy,
  docId,
  currentPrivacy,
}: {
  setShowPravicy: React.Dispatch<React.SetStateAction<boolean>>;
  docId: string;
  currentPrivacy: boolean;
}) => {
  const [privacy, setPrivacy] = useState(currentPrivacy);
  const [copyMessage, setCopyMessage] = useState("");

  const setState = useContext(StateContext);
  if (!setState) {
    throw new Error("Can't access StateContext from PrivacySettingCard.tsx.");
  }

  const upadtePrivacy = async (docId: string, privacy: boolean) => {
    const value = { privacy: privacy };
    if (privacy !== currentPrivacy) {
      try {
        const result = await DB_updateTripInfoByDocId(docId, value);
        if (result) {
          setState((prev) => !prev);
        }
      } catch (e) {
        console.error(e);
      }
    }
    setShowPravicy(false);
  };
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80">
      <div
        onClick={() => setShowPravicy(false)}
        className="absolute h-full w-full items-center justify-center"
      ></div>
      <div className="z-50 mx-4 h-fit rounded-lg bg-white max-sm:w-full sm:min-w-[600px]">
        <div className="flex h-full w-full flex-col p-4">
          <div className="flex justify-center"></div>
          <div className="mx-2 mb-2 flex items-center">
            <Image
              src="/share-sky.png"
              alt="share"
              width={30}
              height={30}
              style={{ width: "20px", height: "20px", marginRight: "4px" }}
            />
            <p className="text-xl font-bold text-sky-800">隱私設定與分享</p>
          </div>
          <div className="m-2 flex items-center">
            <div
              onClick={() => setPrivacy((prev) => !prev)}
              className={`relative h-8 w-14 rounded-full border border-solid border-blue-900 ${privacy ? "bg-blue-500" : "bg-blue-100"} transition-all hover:cursor-pointer`}
            >
              <div
                className={`absolute ${privacy ? "translate-x-7" : "translate-x-0"} top-[calc(50%-14px)] h-7 w-7 rounded-full border border-solid border-blue-500 bg-white transition-all`}
              ></div>
            </div>
            <div className="ml-1 text-lg">{privacy ? "公開" : "私人"}</div>
          </div>
          <div className="m-2">
            {privacy ? (
              <>
                <p className="text-wrap">
                  行程將分享至「探索行程」列表，所有人都可以瀏覽。或透過以下連結分享：
                </p>
                <div className="mt-2 flex h-fit items-center text-wrap max-sm:block">
                  <p className="mr-2 text-sm text-gray-500 max-sm:hidden max-sm:break-all">
                    {process.env.NODE_ENV === "development"
                      ? `http://localhost:3000/plan/${docId}`
                      : `https://goodtogo-project.vercel.app/plan/${docId}`}
                  </p>
                  <p
                    onClick={() => {
                      navigator.clipboard.writeText(
                        process.env.NODE_ENV === "development"
                          ? `http://localhost:3000/plan/${docId}`
                          : `https://goodtogo-project.vercel.app/plan/${docId}`,
                      );
                      setCopyMessage("已複製");
                    }}
                    className="mr-2 hidden text-sm text-gray-500 max-sm:block max-sm:break-all"
                  >
                    {process.env.NODE_ENV === "development"
                      ? `http://localhost:3000/plan/${docId} (按一下即可複製)`
                      : `https://goodtogo-project.vercel.app/plan/${docId} (按一下即可複製)`}
                  </p>
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(
                        process.env.NODE_ENV === "development"
                          ? `http://localhost:3000/plan/${docId}`
                          : `https://goodtogo-project.vercel.app/plan/${docId}`,
                      );
                      setCopyMessage("已複製");
                    }}
                    className="hover:cursor-pointer"
                  >
                    <Image
                      src="/copy.png"
                      alt="copy"
                      width={24}
                      height={24}
                      className="max-sm:hidden"
                    />
                  </div>
                  {copyMessage && (
                    <p className="ml-2 text-green-500">&#10003; 已複製</p>
                  )}
                </div>
              </>
            ) : (
              <p className="pb-[20px]">只有您可以瀏覽此行程。</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowPravicy(false)}
              className="mr-4 rounded px-2 py-1 text-lg text-blue-500 transition hover:bg-blue-50"
            >
              取消
            </button>
            <button
              onClick={() => {
                if (docId) {
                  upadtePrivacy(docId, privacy);
                }
              }}
              className="mr-2 rounded border border-solid border-blue-700 bg-blue-500 px-2 py-1 text-lg text-white transition hover:bg-blue-700"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingCard;
