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
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
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
      <div className="absolute z-10 flex h-[440px] w-fit rounded-lg bg-white p-1 max-[700px]:hidden">
        <DateRange
          showDateDisplay={false}
          onChange={(item: any) => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          months={2}
          direction="horizontal"
          locale={zhCN}
        />
        <div className="absolute bottom-5 right-5 flex justify-end">
          <button
            className="btn_white mr-3"
            onClick={() => {
              setIsOpenCalendar(false);
            }}
          >
            返回
          </button>
          <button className="btn_blue" onClick={confirmDateRange}>
            確認
          </button>
        </div>
      </div>
      <div className="absolute z-10 flex h-[440px] w-fit rounded-lg bg-white p-1 min-[700px]:hidden">
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
            title="返回"
            type="cancel"
            onSmash={() => {
              setIsOpenCalendar(false);
            }}
          />
          <Button title="確認" type="confirm" onSmash={confirmDateRange} />
        </div>
      </div>
    </>
  );
};

export default CalendarCard;
