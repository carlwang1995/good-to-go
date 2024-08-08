import React, { useState } from "react";
import Link from "next/link";
import CalendarCard from "./CalendarCard";

type CreateTripCardProps = {
  display: boolean;
  setDialogBoxDisplay: () => void;
  newTrip: Array<object> | null;
  setNewTrip: React.Dispatch<React.SetStateAction<Array<object> | null>>;
};

type InputContent = string | null;

const CreateTripCard = ({
  display,
  setDialogBoxDisplay,
  newTrip,
  setNewTrip,
}: CreateTripCardProps) => {
  // 日期
  const [startDate, setStartDate] = useState<string>("出發日期");
  const [endDate, setEndDate] = useState<string>("結束日期");
  // 目的地
  const [inputDestinaiton, setInputDestinaiton] = useState<InputContent>(null);
  // 旅程名稱
  const [inputTripName, setInputTripName] = useState<InputContent>(null);
  // 判斷邏輯
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isDateSelect, setIsDateSelect] = useState<boolean>(true);
  const [isDestinaiton, setIsDestination] = useState<boolean>(true);
  const [isTripName, setIsTripName] = useState<boolean>(true);

  // 取消建立行程
  const cancelEdit = (): void => {
    setDialogBoxDisplay();
    setStartDate("出發日期");
    setEndDate("結束日期");
    setInputDestinaiton(null);
    setInputTripName(null);
    setIsDateSelect(true);
    setIsDestination(true);
    setIsTripName(true);
  };
  // 檢查輸入內容
  const checkInput = (): void => {
    startDate === "出發日期" || endDate === "結束日期"
      ? setIsDateSelect(false)
      : setIsDateSelect(true);
    !inputDestinaiton ? setIsDestination(false) : setIsDestination(true);
    !inputTripName ? setIsTripName(false) : setIsTripName(true);
  };

  // 建立新行程
  const createNewTrip = (
    startDate: string,
    endDate: string,
    destination: string,
    tripName: string,
  ): void => {
    const tripObject = { startDate, endDate, destination, tripName };
    newTrip ? setNewTrip([...newTrip, tripObject]) : setNewTrip([tripObject]);
    setDialogBoxDisplay();
  };

  // render
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80"
      style={display ? { display: "flex" } : { display: "none" }}
    >
      {isOpenCalendar ? (
        <CalendarCard
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setIsOpenCalendar={setIsOpenCalendar}
        />
      ) : (
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
                startDate === "出發日期"
                  ? { color: "#8e8e8e" }
                  : { color: "black" }
              }
            >
              {startDate}
            </div>
            <div className="mx-2">→</div>
            <div
              className="flex-auto"
              style={
                endDate === "結束日期"
                  ? { color: "#8e8e8e" }
                  : { color: "black" }
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
          <input
            className="flex w-full rounded border-[1px] border-solid border-black p-2 placeholder:text-[#8e8e8e]"
            placeholder="請輸入目的地名稱"
            onChange={(e) => setInputDestinaiton(e.target.value)}
            value={!inputDestinaiton ? "" : inputDestinaiton}
          ></input>
          {isDestinaiton ? (
            <></>
          ) : (
            <p className="text-sm text-red-500">請輸入目的地名稱</p>
          )}
          <br />
          <h3>旅程名稱</h3>
          <input
            className="roubded flex w-full border-[1px] border-solid border-black p-2 placeholder:text-[#8e8e8e]"
            placeholder="請輸入旅程名稱"
            onChange={(e) => setInputTripName(e.target.value)}
            value={!inputTripName ? "" : inputTripName}
          ></input>
          {isTripName ? (
            <></>
          ) : (
            <p className="text-sm text-red-500">請輸入旅程名稱</p>
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
                  checkInput;
                  createNewTrip(
                    startDate,
                    endDate,
                    inputDestinaiton,
                    inputTripName,
                  );
                }}
                className="mt-5 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
              >
                完成
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTripCard;
