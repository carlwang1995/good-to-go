import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { zhCN } from "date-fns/locale";
import { format } from "date-fns";
import { Button } from "../Button";

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
    <div className="relative z-[100]">
      <div
        onClick={() => setIsOpenCalendar(false)}
        className="fixed right-0 top-0 z-[400] h-screen w-screen max-[980px]:bg-black/50"
      ></div>
      <div className="fixed left-3 top-44 z-[500] h-[460px] w-fit rounded-lg border bg-white p-1 shadow-lg max-[980px]:left-[calc(50%-170px)] max-[980px]:top-[calc(50%-170px)]">
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
          <Button
            title="關閉"
            type="cancel"
            onSmash={() => {
              setIsOpenCalendar(false);
            }}
          />
          <Button title="確認" type="confirm" onSmash={confirmDateRange} />
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
