"use client";
import React, { useState, useEffect, useRef, useMemo, memo } from "react";
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
      className={`relative flex h-full min-w-[500px] max-w-[500px] flex-col transition-all max-[980px]:min-w-full ${showMobileMap ? "max-[980px]:min-h-[60%]" : "max-[980px]:min-h-[calc(100%-60px)]"}`}
    >
      {showMobileMap && (
        <div className="absolute -top-6 flex w-full justify-center min-[980px]:hidden">
          <div
            onClick={() => setShowMobileMap(false)}
            className="z-[25] flex w-[40%] items-center justify-center rounded-t-xl border border-black/30 bg-white/80 shadow-md hover:cursor-pointer"
          >
            <Image
              src="/up-arrow.png"
              alt="arrow up"
              width={16}
              height={16}
              className="my-1"
            />
          </div>
        </div>
      )}

      {!showMobileMap && (
        <div className="absolute top-0 flex w-full justify-center min-[980px]:hidden">
          <div
            onClick={() => setShowMobileMap(true)}
            className="z-[35] flex w-[40%] items-center justify-center rounded-b-xl bg-white/50 shadow-md hover:cursor-pointer"
          >
            <Image
              src="/down-arrow.png"
              alt="arrow up"
              width={16}
              height={16}
              className="my-1"
            />
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
            className="absolute left-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-300 max-sm:hidden"
          >
            <Image
              src="/left-arrow-sm.png"
              width={14}
              height={14}
              alt="left arrow"
            />
          </button>
          <div
            className="flex h-full w-full overflow-x-hidden overflow-y-hidden scroll-smooth whitespace-nowrap px-7 max-sm:overflow-x-auto max-sm:px-1"
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
            className="hover: absolute right-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-300 max-sm:hidden"
          >
            <div className="text-2xl">
              <Image
                src="/right-arrow-sm.png"
                width={14}
                height={14}
                alt="right arrow"
              />
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
