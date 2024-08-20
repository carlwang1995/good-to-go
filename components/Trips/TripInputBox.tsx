"use client";
import React, { useState } from "react";
import { DB_createNewTrip, DB_createNewPlan } from "@/libs/db/CreateTripPage";
import { useRouter } from "next/navigation";
import { getDateBetween } from "@/libs/getDatesBetween";
import TargetItem from "./TargetItem";

type TripInputProps = {
  userId: string;
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setDialogBoxDisplay: () => void;
  setIsOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
};
type InputContent = string | null;

const TripInput = ({
  userId,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setDialogBoxDisplay,
  setIsOpenCalendar,
}: TripInputProps) => {
  const router = useRouter();
  // 目的地
  const [inputDestinaiton, setInputDestinaiton] = useState<Array<string>>([]);
  // 旅程名稱
  const [inputTripName, setInputTripName] = useState<InputContent>(null);
  // 判斷邏輯
  const [isDateSelect, setIsDateSelect] = useState<boolean>(true);
  const [isDestinaiton, setIsDestination] = useState<boolean>(true);
  const [isTripName, setIsTripName] = useState<boolean>(true);

  // 取消建立行程
  const cancelEdit = (): void => {
    setStartDate("出發日期");
    setEndDate("結束日期");
    setInputDestinaiton([]);
    setInputTripName(null);
    setIsDateSelect(true);
    setIsDestination(true);
    setIsTripName(true);
    setDialogBoxDisplay();
  };
  // 檢查輸入內容
  const checkInput = (): void => {
    startDate === "出發日期" || endDate === "結束日期"
      ? setIsDateSelect(false)
      : setIsDateSelect(true);
    inputDestinaiton.length > 0
      ? setIsDestination(true)
      : setIsDestination(false);
    !inputTripName ? setIsTripName(false) : setIsTripName(true);
  };

  // 建立新行程
  interface Trip {
    startTime: string;
    places: any[];
  }
  const createTrip = async (
    startDate: string,
    endDate: string,
    destination: Array<string>,
    tripName: string,
  ) => {
    const dates = getDateBetween(startDate, endDate);
    let tripsObj: { [key: string]: Trip } = {};
    const tripObject = {
      userId,
      startDate,
      endDate,
      destination,
      tripName,
      dates,
    };
    for (let i: number = 0; i < dates.length; i++) {
      tripsObj[`day${i + 1}`] = { startTime: "08:00", places: [] };
    }
    try {
      const docId = await DB_createNewTrip(tripObject);

      if (docId) {
        const planObject = {
          docId,
          trips: tripsObj,
        };
        await DB_createNewPlan(planObject);
      }

      router.push(`/plan/${docId}`);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="w-[500px] rounded-lg bg-white p-10">
      <div className="text-xl font-bold">建立行程</div>
      <br />
      <h3>旅遊日期</h3>
      <div
        className="flex w-full rounded border-[1px] border-solid border-black p-2 hover:cursor-pointer"
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
      {isDateSelect ? (
        <></>
      ) : (
        <p className="text-sm text-red-500">請選擇出發及結束日期</p>
      )}
      <br />
      <h3>目的地</h3>
      <div className="w-full rounded border border-solid border-black p-2">
        <div className="flex flex-wrap">
          {inputDestinaiton.length > 0 ? (
            inputDestinaiton.map((target, index) => (
              <TargetItem
                key={index}
                number={index}
                target={target}
                inputDestinaiton={inputDestinaiton}
                setInputDestinaiton={setInputDestinaiton}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <input
          autoFocus
          className="w-full outline-none placeholder:text-[#8e8e8e]"
          placeholder="輸入後按下「Enter」，加入多個城市"
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              const target: string = e.target.value;
              setInputDestinaiton((prev) => [...prev, target]);
              e.target.value = "";
            }
          }}
          // value={!inputDestinaiton ? "" : inputDestinaiton}
        ></input>
      </div>
      {isDestinaiton ? (
        <></>
      ) : (
        <p className="text-sm text-red-500">請加入目的地(如:台北、高雄)</p>
      )}
      <br />
      <h3>旅程名稱</h3>
      <div className="flex w-full rounded border border-solid border-black p-2">
        <input
          className="w-full outline-none placeholder:text-[#8e8e8e]"
          placeholder="輸入行程名稱"
          onChange={(e) => setInputTripName(e.target.value)}
          value={!inputTripName ? "" : inputTripName}
        ></input>
      </div>
      {isTripName ? (
        <></>
      ) : (
        <p className="text-sm text-red-500">請輸入行程名稱</p>
      )}
      <br />
      <div className="flex justify-end">
        <button
          onClick={cancelEdit}
          className="mr-3 mt-5 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
        >
          返回
        </button>

        {startDate === "出發日期" || endDate === "結束日期" ? (
          <button
            onClick={checkInput}
            className="mt-5 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
          >
            完成
          </button>
        ) : !inputDestinaiton ? (
          <button
            onClick={checkInput}
            className="mt-5 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
          >
            完成
          </button>
        ) : !inputTripName ? (
          <button
            onClick={checkInput}
            className="mt-5 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
          >
            完成
          </button>
        ) : (
          <button
            onClick={() => {
              checkInput();
              createTrip(startDate, endDate, inputDestinaiton, inputTripName);
              cancelEdit();
            }}
            className="mt-5 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
          >
            完成
          </button>
        )}
      </div>
    </div>
  );
};

export default TripInput;
