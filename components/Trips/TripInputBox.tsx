import React, { useState } from "react";
import Image from "next/image";
import TargetItem from "./TargetItem";
import { DB_createNewTrip } from "@/libs/db/TripsDoc";
import { DB_createNewPlan } from "@/libs/db/PlansDoc";
import { useUser } from "@/contexts/UserAuth";
import { useRouter } from "next/navigation";
import { getDateBetween } from "@/libs/getDatesBetween";
import { getTimeNow } from "@/libs/timeConvertor";
import { coverPhotos } from "@/constants";
import Button from "../Button";

type TripInputProps = {
  startDate: string;
  endDate: string;
  isOpenCalendar: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
};

const TripInput = ({
  startDate,
  endDate,
  isOpenCalendar,
  setDisplay,
  setIsOpenCalendar,
}: TripInputProps) => {
  const { userId } = useUser();
  const router = useRouter();
  // 目的地
  const [inputDestination, setInputDestination] = useState<string>("");
  const [destinaitonArray, setDestinaitonArray] = useState<Array<string>>([]);
  // 旅程名稱
  const [inputTripName, setInputTripName] = useState<string>("");
  // 判斷邏輯
  const [isDateSelect, setIsDateSelect] = useState<boolean>(true);
  const [isDestinaiton, setIsDestination] = useState<boolean>(true);
  const [isTripName, setIsTripName] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // 取消建立行程
  const cancelEdit = (): void => {
    setDisplay((prev) => !prev);
  };
  // 檢查輸入內容
  const checkInput = (): void => {
    startDate === "出發日期" || endDate === "結束日期"
      ? setIsDateSelect(false)
      : setIsDateSelect(true);
    destinaitonArray.length > 0
      ? setIsDestination(true)
      : setIsDestination(false);
    !inputTripName ? setIsTripName(false) : setIsTripName(true);
  };

  // 建立新行程
  interface Trip {
    startTime: string;
    places: any[];
    lastEditTime: string;
  }
  const createTrip = async (
    startDate: string,
    endDate: string,
    destination: Array<string>,
    tripName: string,
  ) => {
    if (
      startDate === "出發日期" ||
      endDate === "結束日期" ||
      destinaitonArray.length === 0 ||
      !inputTripName
    ) {
      return;
    }
    setIsCreating(true);
    const tripsObj: { [key: string]: Trip } = {};
    const dates = getDateBetween(startDate, endDate);
    const formatDate = getTimeNow();
    const tripObject = {
      userId,
      startDate,
      endDate,
      destination,
      tripName,
      dates,
      photo: {
        fileName: "default",
        photoUrl: `/background/${coverPhotos[Math.floor(Math.random() * coverPhotos.length)]}`,
      },
      createTime: formatDate,
      privacy: false,
    };
    for (let i = 0; i < dates.length; i++) {
      tripsObj[`day${i + 1}`] = {
        startTime: "08:00",
        places: [],
        lastEditTime: formatDate,
      };
    }
    try {
      const docId = await DB_createNewTrip(tripObject);
      if (docId) {
        const planObject = {
          docId,
          trips: tripsObj,
        };
        const result = await DB_createNewPlan(planObject);
        if (result) {
          router.push(`/plan/${docId}`);
        }
      } else {
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div
      className={`mx-4 w-[500px] rounded-lg bg-zinc-100 p-10 ${isOpenCalendar && "opacity-0"}`}
    >
      <div className="text-xl font-bold text-sky-800">建立行程</div>
      <br />
      <h3>旅遊日期</h3>
      <div
        className="flex w-full items-center rounded border border-solid border-black bg-white p-2 transition hover:cursor-pointer"
        onClick={() => setIsOpenCalendar(true)}
      >
        <div
          className="flex-auto"
          style={
            startDate === "出發日期" ? { color: "#8e8e8e" } : { color: "black" }
          }
        >
          {startDate}
        </div>
        <div className="mx-2">
          {/* arrow right */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={"24px"}
            height={"24px"}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M6 12H18M18 12L13 7M18 12L13 17"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </div>
        <div
          className="flex-auto"
          style={
            endDate === "結束日期" ? { color: "#8e8e8e" } : { color: "black" }
          }
        >
          {endDate}
        </div>
      </div>
      {!isDateSelect && (
        <p className="text-sm text-red-500">請選擇出發及結束日期</p>
      )}
      <br />
      <h3>目的地</h3>
      <div className="w-full rounded border border-solid border-black bg-white p-2">
        <div className="flex flex-wrap">
          {destinaitonArray.length > 0 &&
            destinaitonArray.map((target, index) => (
              <TargetItem
                key={target}
                number={index}
                target={target}
                destinaitonArray={destinaitonArray}
                setDestinaitonArray={setDestinaitonArray}
              />
            ))}
        </div>
        <div className="relative flex w-full">
          <input
            autoFocus
            className="w-full outline-none placeholder:text-[#8e8e8e] max-sm:hidden"
            placeholder="輸入後按下「Enter」，加入多個城市"
            value={inputDestination}
            onChange={(e) => {
              setInputDestination(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputDestination) {
                setDestinaitonArray((prev) => [...prev, inputDestination]);
                setInputDestination("");
              }
            }}
          ></input>
          <input
            autoFocus
            className="hidden w-full outline-none placeholder:text-[#8e8e8e] max-sm:block"
            placeholder="加入多個城市"
            value={inputDestination}
            onChange={(e) => {
              setInputDestination(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputDestination) {
                setDestinaitonArray((prev) => [...prev, inputDestination]);
                setInputDestination("");
              }
            }}
          ></input>
          {/* Insert Button */}
          <span
            onClick={() => {
              if (inputDestination) {
                setDestinaitonArray((prev) => [...prev!, inputDestination]);
                setInputDestination("");
              }
            }}
            className="h-6 w-6 hover:cursor-pointer"
            style={{ display: inputDestination ? "block" : "none" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM18 12.75H12.75V18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H11.25V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                  fill="#3b82f6"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>
      {!isDestinaiton && (
        <p className="text-sm text-red-500">請加入目的地(如:台北、高雄)</p>
      )}
      <br />
      <h3>旅程名稱</h3>
      <div className="flex w-full rounded border border-solid border-black bg-white p-2">
        <input
          className="w-full bg-white outline-none placeholder:text-[#8e8e8e]"
          placeholder="輸入行程名稱"
          onChange={(e) => setInputTripName(e.target.value)}
          value={inputTripName}
        ></input>
      </div>
      {!isTripName && <p className="text-sm text-red-500">請輸入行程名稱</p>}
      <br />
      <div className="flex justify-end">
        <Button title="取消" type="cancel" onSmash={cancelEdit} />
        {isCreating ? (
          <button className="flex w-14 items-center justify-center rounded border border-solid border-black px-2 py-1 text-lg hover:cursor-default">
            <Image src="/loading.gif" width={20} height={20} alt="loading" />
          </button>
        ) : (
          <Button
            title="完成"
            type="confirm"
            onSmash={() => {
              checkInput();
              createTrip(startDate, endDate, destinaitonArray, inputTripName);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TripInput;
