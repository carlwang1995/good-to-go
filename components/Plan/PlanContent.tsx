"use client";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserAuth";
import Image from "next/image";
import Link from "next/link";
import DateItem from "./DateItem";
import PlanCard from "./PlanCard";
import { DB_getTripNameByDocId } from "@/libs/db/EditTripPage";
import {
  DayIndexContext,
  DestinationContext,
  EditableContext,
} from "@/contexts/ContextProvider";
import { useRouter } from "next/navigation";

type TripType = {
  docId: string;
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
  const { isLogin, userName, userId } = useUser();
  const [dayIndex, setDayIndex] = useState<string>("day1");
  const [dateCount, setDateCount] = useState<string>("第1天");
  const [tripName, setTripName] = useState<string | undefined>(undefined);
  const [destinationArr, setDestinationArr] = useState<
    Array<string> | undefined
  >();
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [dates, setDates] = useState<Array<string>>();
  const dateSectionRef = useRef<HTMLDivElement | null>(null);
  const [tripPhoto, setTripPhoto] = useState<string | undefined>();
  const [isEditable, setIsEditable] = useState(false);
  const [authorId, setAuthorId] = useState<string>("");
  const [privacy, setPrivacy] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    DB_getTripNameByDocId(docId).then((tripInfo: any) => {
      const {
        tripName,
        destination,
        startDate,
        endDate,
        dates,
        photo,
        userId,
        privacy,
      } = tripInfo;
      setDestinationArr(destination);
      setTripName(tripName);
      setStartDate(startDate);
      setEndDate(endDate);
      setDates(dates);
      setTripPhoto(photo.photoUrl);
      setAuthorId(userId);
      setPrivacy(privacy);
    });
  }, [docId]);

  // 判斷是否可編輯、可查看
  useEffect(() => {
    if (authorId) {
      // 未登入且非本人
      if (!privacy && !isLogin) {
        // console.log("未登入且非本人");
        setIsEditable(false);
        router.push("/");
        return;
      }
      // 非公開且非本人，不可瀏覽不可編輯，導回首頁
      if (!privacy && authorId !== userId) {
        // console.log("非公開且非本人，不可瀏覽不可編輯，導回首頁");
        setIsEditable(false);
        router.push("/");
        return;
      }
      // 公開但非本人，可瀏覽不可編輯
      if (privacy && authorId !== userId) {
        // console.log("公開但非本人，可瀏覽不可編輯");
        setIsEditable(false);
        return;
      }
      // 登入且為本人，可瀏覽可編輯
      if (isLogin && authorId === userId) {
        // console.log("登入且為本人，可瀏覽可編輯");
        setIsEditable(true);
        return;
      }
      // 登出狀態定為編輯模式
      if (!isLogin) {
        // console.log("登出狀態定為編輯模式");
        setIsEditable(false);
        return;
      }
    }
  }, [authorId, privacy, isLogin]);

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
    <div className="flex h-full min-w-[500px] max-w-[500px] flex-col border-r border-slate-200 bg-slate-50">
      <div className="relative border-b border-solid border-slate-300 shadow-lg">
        {tripPhoto ? (
          <Image
            priority={true}
            fill={true}
            sizes="min-width:500px"
            src={tripPhoto}
            alt="background"
            className="absolute left-0 top-0 z-0 h-40 w-full"
          ></Image>
        ) : (
          <div className="absolute left-0 top-0 z-0 flex h-40 w-full items-center justify-center">
            <Image
              src="/loading.gif"
              alt="loading"
              width={50}
              height={50}
            ></Image>
          </div>
        )}
        <div className="relative z-10 bg-black/30">
          <div className="flex h-16 w-full items-center bg-black/60 p-3">
            {isLogin ? (
              <Link href="/trips">
                <span className="mr-3 w-8 text-xl text-white hover:font-bold">
                  ←
                </span>
              </Link>
            ) : (
              <></>
            )}
            <span className="text-xl text-white">{tripName}</span>
          </div>
          <div className="flex h-24 w-full flex-col items-center justify-center p-3">
            <div className="w-full">
              <span className="text-white">{startDate}</span>
              <span className="text-white"> - </span>
              <span className="text-white">{endDate}</span>
            </div>
            <div className="mt-1 w-full">
              <p className="text-white">{destinationArr?.toString()}</p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 m-2 text-sm text-white">
            {isEditable ? "編輯模式" : "檢視模式"}
          </div>
        </div>

        <div className="relative flex h-14 w-full bg-white">
          <div
            onClick={dateScrollToLeft}
            className="absolute left-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-300"
          >
            <div className="text-2xl">&#10094;</div>
          </div>
          <div
            className="flex h-full w-full overflow-x-hidden scroll-smooth whitespace-nowrap px-7"
            ref={dateSectionRef}
          >
            {dates?.map((date, index) => (
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
            className="hover: absolute right-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-300"
          >
            <div className="text-2xl">&#10095;</div>
          </div>
        </div>
      </div>
      <DayIndexContext.Provider value={dayIndex}>
        <DestinationContext.Provider
          value={destinationArr ? destinationArr : []}
        >
          <EditableContext.Provider value={isEditable}>
            <PlanCard docId={docId} dateCount={dateCount} />
          </EditableContext.Provider>
        </DestinationContext.Provider>
      </DayIndexContext.Provider>
    </div>
  );
};

export default PlanContent;
