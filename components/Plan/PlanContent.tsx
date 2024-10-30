"use client";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserAuth";
import Image from "next/image";
import PlanTitleCard from "./PlanTitleCard";
import PlanTitleEditCard from "./PlanTitleEditCard";
import DateItem from "./DateItem";
import PlanCard from "./PlanCard";
import {
  DayIndexContext,
  DestinationContext,
  EditableContext,
  PlanContentContext,
} from "@/contexts/ContextProvider";
import { useRouter } from "next/navigation";

type TripType = {
  userId: string;
  tripName: string;
  destination: Array<string>;
  dates: Array<string>;
  startDate: string;
  endDate: string;
  photo: { fileName: string; photoUrl: string };
  privacy: boolean;
  createTime: string;
};

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  stayTime: string;
  trafficMode: string;
  photos: Array<string>;
}

interface PlanTripType {
  startTime: string;
  places: Array<PlaceType>;
  lastEditTime: string;
}

interface PlanContentType {
  docId: string;
  trips: {
    [key: string]: PlanTripType;
  };
}

const PlanContent = ({
  docId,
  tripData,
  planDocId,
  planData,
}: {
  docId: string;
  tripData: TripType | undefined;
  planDocId: string | undefined;
  planData: PlanContentType | undefined;
}) => {
  const [tripInfo, setTripInfo] = useState<TripType | undefined>();
  const [planContent, setPlanContent] = useState<PlanContentType | undefined>();
  const [dayIndex, setDayIndex] = useState<string>("day1");
  const [dateCount, setDateCount] = useState<string>("第1天");
  const [showEditInput, setShowEditInput] = useState(false);
  const [showMobileMap, setShowMobileMap] = useState(true);
  const dateSectionRef = useRef<HTMLDivElement | null>(null);
  const { user, userId } = useUser();
  const router = useRouter();

  useEffect(() => {
    setTripInfo(tripData);
    setPlanContent(planData);
    return () => {
      setTripInfo(undefined);
      setPlanContent(undefined);
    };
  }, []);

  let isEditable = false;
  if (user !== undefined && tripInfo) {
    if (checkPermissions() === true) {
      isEditable = true;
    }
  }
  // 判斷編輯、檢視權限
  function checkPermissions() {
    // 未登入
    if (!user && tripInfo) {
      if (!tripInfo.privacy) {
        router.push("/");
        return false;
      } else {
        return false;
      }
    }
    // 有登入
    if (user && tripInfo) {
      // 非公開且非本人，導回首頁
      if (!tripInfo.privacy && tripInfo.userId !== userId) {
        router.push("/");
        return false;
      }
      // 公開但非本人，可瀏覽不可編輯
      if (tripInfo.privacy && tripInfo.userId !== userId) {
        return false;
      }
      // 登入且為本人，可瀏覽可編輯
      if (tripInfo.userId === userId) {
        return true;
      }
    }
  }
  const scrollRange = 300;
  const dateScrollToLeft = () => {
    if (dateSectionRef.current) {
      dateSectionRef.current.scrollLeft -= scrollRange;
    }
  };
  const dateScrollToRight = () => {
    if (dateSectionRef.current) {
      dateSectionRef.current.scrollLeft += scrollRange;
    }
  };

  return (
    <div
      style={{ boxShadow: "5px 0px 15px gray" }}
      className={`relative z-[5] flex h-full min-w-[500px] max-w-[500px] flex-col transition-all max-[980px]:min-w-full ${showMobileMap ? "max-[980px]:min-h-[60%]" : "max-[980px]:min-h-[calc(100%-60px)]"}`}
    >
      {showMobileMap && (
        <div className="absolute -top-6 flex w-full justify-center min-[980px]:hidden">
          <div
            onClick={() => setShowMobileMap(false)}
            className="z-[25] flex w-[40%] items-center justify-center rounded-t-xl border border-black/30 bg-white/80 shadow-md hover:cursor-pointer"
          >
            {/* Up-Arrow Icon */}
            <span className="py-1">
              <svg
                viewBox="0 -4.5 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                width={18}
                height={18}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>arrow_up [#337]</title>{" "}
                  <desc>Created with Sketch.</desc> <defs> </defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-260.000000, -6684.000000)"
                      fill="#000000"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          d="M223.707692,6534.63378 L223.707692,6534.63378 C224.097436,6534.22888 224.097436,6533.57338 223.707692,6533.16951 L215.444127,6524.60657 C214.66364,6523.79781 213.397472,6523.79781 212.616986,6524.60657 L204.29246,6533.23165 C203.906714,6533.6324 203.901717,6534.27962 204.282467,6534.68555 C204.671211,6535.10081 205.31179,6535.10495 205.70653,6534.69695 L213.323521,6526.80297 C213.714264,6526.39807 214.346848,6526.39807 214.737591,6526.80297 L222.294621,6534.63378 C222.684365,6535.03868 223.317949,6535.03868 223.707692,6534.63378"
                          id="arrow_up-[#337]"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
          </div>
        </div>
      )}

      {!showMobileMap && (
        <div className="absolute top-0 flex w-full justify-center min-[980px]:hidden">
          <div
            onClick={() => setShowMobileMap(true)}
            className="z-[35] flex w-[40%] items-center justify-center rounded-b-xl bg-white/50 shadow-md hover:cursor-pointer"
          >
            {/* Down-Arrow Icon */}
            <span className="py-1">
              <svg
                viewBox="0 -4.5 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                transform="rotate(180)"
                width={16}
                height={16}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>arrow_up [#337]</title>{" "}
                  <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-260.000000, -6684.000000)"
                      fill="#000000"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          d="M223.707692,6534.63378 L223.707692,6534.63378 C224.097436,6534.22888 224.097436,6533.57338 223.707692,6533.16951 L215.444127,6524.60657 C214.66364,6523.79781 213.397472,6523.79781 212.616986,6524.60657 L204.29246,6533.23165 C203.906714,6533.6324 203.901717,6534.27962 204.282467,6534.68555 C204.671211,6535.10081 205.31179,6535.10495 205.70653,6534.69695 L213.323521,6526.80297 C213.714264,6526.39807 214.346848,6526.39807 214.737591,6526.80297 L222.294621,6534.63378 C222.684365,6535.03868 223.317949,6535.03868 223.707692,6534.63378"
                          id="arrow_up-[#337]"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
          </div>
        </div>
      )}

      <div className="relative z-30 w-full border-b border-solid border-slate-300 shadow-lg">
        <Image
          priority
          fill={true}
          sizes="min-width:500px"
          src={
            tripInfo && tripInfo.photo.photoUrl
              ? tripInfo.photo.photoUrl
              : "/blur.jpg"
          }
          alt="background"
          className="absolute left-0 top-0 z-0 h-40 w-full"
          style={{ objectFit: "cover" }}
        />
        {showEditInput ? (
          <PlanTitleEditCard
            docId={docId}
            tripInfo={tripInfo}
            setTripInfo={setTripInfo}
            setShowEditInput={setShowEditInput}
            setPlanContent={setPlanContent}
            setDayIndex={setDayIndex}
          />
        ) : (
          <PlanTitleCard
            tripInfo={tripInfo}
            user={user}
            isEditable={isEditable}
            setShowEditInput={setShowEditInput}
          />
        )}

        <div className="relative flex h-14 w-full bg-white">
          <button
            onClick={dateScrollToLeft}
            style={{ boxShadow: "1px 0px 3px gray" }}
            className="absolute left-0 top-0 z-10 flex h-full items-center justify-center bg-white px-1 max-sm:hidden"
          >
            {/* Left Srcoll Arrow Btn */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              strokeWidth="1.2"
              transform="rotate(180)"
              width={16}
              height={16}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
                  fill="#0f0f0f"
                ></path>
              </g>
            </svg>
          </button>
          <div
            className="flex h-full w-full overflow-x-hidden overflow-y-hidden scroll-smooth whitespace-nowrap bg-gray-50 px-7 max-sm:overflow-x-auto max-sm:px-1"
            ref={dateSectionRef}
          >
            {tripInfo &&
              tripInfo.dates.map((date, index) => (
                <DateItem
                  key={date}
                  date={date}
                  dateNumber={index}
                  dayIndex={dayIndex}
                  setDateCount={setDateCount}
                  setDayIndex={setDayIndex}
                />
              ))}
          </div>
          <button
            onClick={dateScrollToRight}
            style={{ boxShadow: "-1px 0px 3px gray" }}
            className="hover: absolute right-0 top-0 z-10 flex h-full items-center justify-center bg-white px-1 max-sm:hidden"
          >
            <div className="text-2xl">
              {/* Right Srcoll Arrow Btn */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
                strokeWidth="1.2"
                width={16}
                height={16}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
                    fill="#0f0f0f"
                  ></path>
                </g>
              </svg>
            </div>
          </button>
        </div>
      </div>
      {tripInfo && userId !== undefined && (
        <DayIndexContext.Provider value={dayIndex}>
          <DestinationContext.Provider
            value={tripInfo ? tripInfo.destination : []}
          >
            <EditableContext.Provider value={isEditable}>
              <PlanContentContext.Provider
                value={{ planContent, setPlanContent }}
              >
                <PlanCard planDocId={planDocId} dateCount={dateCount} />
              </PlanContentContext.Provider>
            </EditableContext.Provider>
          </DestinationContext.Provider>
        </DayIndexContext.Provider>
      )}
    </div>
  );
};

export default PlanContent;
