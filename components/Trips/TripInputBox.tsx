import React, { useState } from "react";
import { DB_createNewTrip } from "@/libs/db/TripsDoc";
import { DB_createNewPlan } from "@/libs/db/PlansDoc";
import { useUser } from "@/contexts/UserAuth";
import { useRouter } from "next/navigation";
import { getDateBetween } from "@/libs/getDatesBetween";
import TargetItem from "./TargetItem";
import { photos } from "@/libs/photosArr";
import Image from "next/image";
import { getTimeNow } from "@/libs/timeConvertor";

type TripInputProps = {
  startDate: string;
  endDate: string;
  isOpenCalendar: boolean;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
};

const TripInput = ({
  startDate,
  endDate,
  isOpenCalendar,
  setStartDate,
  setEndDate,
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
    setStartDate("出發日期");
    setEndDate("結束日期");
    setDestinaitonArray([]);
    setInputTripName("");
    setIsDateSelect(true);
    setIsDestination(true);
    setIsTripName(true);
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
    const dates = getDateBetween(startDate, endDate);
    let tripsObj: { [key: string]: Trip } = {};
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
        photoUrl: `/background/${photos[Math.floor(Math.random() * photos.length)]}`,
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
      className={`mx-4 w-[500px] rounded-lg bg-zinc-100 p-10 ${isOpenCalendar && "hidden"}`}
    >
      <div className="text-xl font-bold text-sky-800">建立行程</div>
      <br />
      <h3>旅遊日期</h3>
      <div
        className="flex w-full rounded border-[1px] border-solid border-black bg-white p-2 hover:cursor-pointer"
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
        <div className="mx-2">→</div>
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
                key={index}
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
            onChange={(e: any) => {
              setInputDestination(e.target.value);
            }}
            onKeyDown={(e: any) => {
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
            onChange={(e: any) => {
              setInputDestination(e.target.value);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter" && inputDestination) {
                setDestinaitonArray((prev) => [...prev, inputDestination]);
                setInputDestination("");
              }
            }}
          ></input>
          <Image
            onClick={() => {
              if (inputDestination) {
                setDestinaitonArray((prev) => [...prev!, inputDestination]);
                setInputDestination("");
              }
            }}
            src="/insert-blue.png"
            alt="insert"
            width={50}
            height={50}
            className="h-6 w-6 hover:cursor-pointer"
            style={{ display: inputDestination ? "block" : "none" }}
          />
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
        <button
          onClick={cancelEdit}
          className="mr-3 mt-5 w-14 rounded px-2 py-1 text-lg text-blue-500 transition hover:bg-blue-50"
        >
          取消
        </button>
        {isCreating ? (
          <button className="mt-5 flex w-14 items-center justify-center rounded border border-solid border-black px-2 py-1 text-lg hover:cursor-default">
            <Image src="/loading.gif" width={20} height={20} alt="loading" />
          </button>
        ) : (
          <button
            onClick={() => {
              checkInput();
              createTrip(startDate, endDate, destinaitonArray, inputTripName);
            }}
            className="mt-5 w-14 rounded border border-solid border-blue-700 bg-blue-500 px-2 py-1 text-lg text-white transition hover:bg-blue-700"
          >
            完成
          </button>
        )}
      </div>
    </div>
  );
};

export default TripInput;
