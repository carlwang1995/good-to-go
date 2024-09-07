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
} from "@/contexts/ContextProvider";
import { useRouter } from "next/navigation";
import { DB_getTripNameByDocId } from "@/libs/db/TripsDoc";

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

const PlanContent = ({ docId }: { docId: string }) => {
  const [planTitleState, setPlanTitleState] = useState(false);
  const [tripInfo, setTripInfo] = useState<TripType>();
  const [dayIndex, setDayIndex] = useState<string>("day1");
  const [dateCount, setDateCount] = useState<string>("第1天");
  const [isEditable, setIsEditable] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [showMobileMap, setShowMobileMap] = useState(true);
  const dateSectionRef = useRef<HTMLDivElement | null>(null);
  const { user, userId } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (docId) {
      DB_getTripNameByDocId(docId).then((result) => {
        if (result) {
          setTripInfo(result);
        }
      });
    }
  }, []);

  // 判斷編輯、檢視權限
  useEffect(() => {
    if (user === undefined) {
      return;
    }
    // 未登入
    if (!user && tripInfo) {
      if (!tripInfo.privacy) {
        setIsEditable(false);
        router.push("/");
        return;
      } else {
        setIsEditable(false);
        return;
      }
    }
    // 有登入
    if (user && tripInfo) {
      // 非公開且非本人，導回首頁
      if (!tripInfo.privacy && tripInfo.userId !== userId) {
        setIsEditable(false);
        router.push("/");
        return;
      }
      // 公開但非本人，可瀏覽不可編輯
      if (tripInfo.privacy && tripInfo.userId !== userId) {
        setIsEditable(false);
        return;
      }
      // 登入且為本人，可瀏覽可編輯
      if (tripInfo.userId === userId) {
        setIsEditable(true);
        return;
      }
    }
  }, [tripInfo, user]);

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
      className={`relative flex h-full min-w-[500px] max-w-[500px] flex-col transition-all max-[980px]:min-w-full ${showMobileMap ? "max-[980px]:min-h-[65%]" : "max-[980px]:min-h-[100%]"}`}
    >
      {showMobileMap && (
        <div className="absolute -top-6 flex w-full justify-center min-[980px]:hidden">
          <div
            onClick={() => setShowMobileMap(false)}
            className="z-[25] flex w-[40%] items-center justify-center rounded-t-xl border border-black bg-white/80 shadow-md hover:cursor-pointer"
          >
            <Image
              src="/arrow-up.png"
              alt="arrow up"
              width={15}
              height={15}
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
              src="/arrow-down.png"
              alt="arrow up"
              width={15}
              height={15}
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
            setState={setPlanTitleState}
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
          <div
            onClick={dateScrollToLeft}
            className="absolute left-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-300 max-sm:hidden"
          >
            <Image
              src="/left-arrow-sm.png"
              width={14}
              height={14}
              alt="left arrow"
            />
          </div>
          <div
            className="flex h-full w-full overflow-x-hidden overflow-y-hidden scroll-smooth whitespace-nowrap px-7 max-sm:overflow-x-auto max-sm:px-1"
            ref={dateSectionRef}
          >
            {tripInfo &&
              tripInfo.dates.map((date, index) => (
                <DateItem
                  key={index}
                  date={date}
                  dateNumber={index}
                  dayIndex={dayIndex}
                  setDateCount={setDateCount}
                  setDayIndex={setDayIndex}
                />
              ))}
          </div>
          <div
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
          </div>
        </div>
      </div>
      {tripInfo && userId !== undefined && (
        <DayIndexContext.Provider value={dayIndex}>
          <DestinationContext.Provider
            value={tripInfo ? tripInfo.destination : []}
          >
            <EditableContext.Provider value={isEditable}>
              <PlanCard
                docId={docId}
                dateCount={dateCount}
                planTitleState={planTitleState}
              />
            </EditableContext.Provider>
          </DestinationContext.Provider>
        </DayIndexContext.Provider>
      )}
    </div>
  );
};

export default PlanContent;
