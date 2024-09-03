"use client";
import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { zhCN } from "date-fns/locale";
import { format } from "date-fns";

type CalendarCardProps = {
  currentStartDate?: string;
  currentEndDate?: string;
  setStartDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
};

type DateRangeType = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const CalendarCard = ({
  currentStartDate,
  currentEndDate,
  setStartDate,
  setEndDate,
  setIsOpenCalendar,
}: CalendarCardProps) => {
  const [pendingStartDate, setPendingStartDate] = useState<string>("");
  const [pendingEndDate, setPendingEndDate] = useState<string>("");
  const [dateRange, setDateRange] = useState<Array<DateRangeType>>(
    currentStartDate && currentEndDate
      ? [
          {
            startDate: new Date(currentStartDate),
            endDate: new Date(currentEndDate),
            key: "selection",
          },
        ]
      : [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ],
  );

  useEffect(() => {
    const startDate: string = format(dateRange[0].startDate, "yyyy/MM/dd");
    const endDate: string = format(dateRange[0].endDate, "yyyy/MM/dd");
    setPendingStartDate(startDate);
    setPendingEndDate(endDate);
  }, [dateRange]);

  const confirmDateRange = () => {
    setStartDate(pendingStartDate);
    setEndDate(pendingEndDate);
    setIsOpenCalendar(false);
  };

  return (
    <>
      <div
        onClick={() => setIsOpenCalendar(false)}
        className="fixed right-0 top-0 z-40 h-screen w-screen"
      ></div>
      <div className="fixed left-3 top-44 z-50 h-[460px] w-fit rounded-lg border bg-white p-5 shadow-lg">
        <DateRange
          showDateDisplay={false}
          onChange={(item: any) => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          months={1}
          direction="horizontal"
          locale={zhCN}
        />
        <div className="absolute bottom-5 right-5 flex justify-end">
          <button
            className="mr-3 mt-5 rounded px-2 py-1 text-lg text-blue-500 hover:bg-blue-50"
            onClick={() => {
              setIsOpenCalendar(false);
            }}
          >
            關閉
          </button>
          <button
            className="mt-5 rounded border border-solid border-black bg-blue-500 px-2 py-1 text-lg text-white transition hover:cursor-pointer hover:bg-blue-700"
            onClick={confirmDateRange}
          >
            確認
          </button>
        </div>
      </div>
    </>
  );
};

export default CalendarCard;