import React, { useState, useContext } from "react";
import { StateContext } from "@/contexts/ContextProvider";
import { DB_updateTripInfoByDocId } from "@/libs/db/TripsDoc";
import Button from "@/components/Button";

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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z"
                  fill="#155e75"
                ></path>
              </g>
            </svg>
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      className="max-sm:hidden"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
                          fill="#6b7280"
                        ></path>
                        <path
                          d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
                          fill="#6b7280"
                        ></path>
                      </g>
                    </svg>
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
          <div className="mr-2 flex justify-end">
            <Button
              title="取消"
              type="cancel"
              onSmash={() => setShowPravicy(false)}
            />
            <Button
              title="完成"
              type="confirm"
              onSmash={() => {
                if (docId) {
                  upadtePrivacy(docId, privacy);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingCard;
