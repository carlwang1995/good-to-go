import React from "react";

type DateItemProps = {
  date: string;
  dateNumber: number;
  dayIndex: string;
  setDateCount: React.Dispatch<React.SetStateAction<string>>;
  setDayIndex: React.Dispatch<React.SetStateAction<string>>;
};

const DateItem = ({
  date,
  dateNumber,
  dayIndex,
  setDateCount,
  setDayIndex,
}: DateItemProps) => {
  const dateCountString = `第${String(dateNumber + 1)}天`;
  return (
    <button
      className={`flex h-full min-w-24 flex-col items-center justify-center transition hover:cursor-pointer ${String(dateNumber + 1) == dayIndex.split("day")[1] ? "border-b-4 border-b-blue-500 bg-white text-blue-700" : "bg-gray-50 text-gray-700 hover:border-b-4 hover:border-b-blue-200 hover:bg-white hover:text-blue-400"}`}
      onClick={() => {
        setDateCount(dateCountString);
        const dayIndex: string = "day" + String(dateNumber + 1);
        setDayIndex(dayIndex);
      }}
    >
      <p
        className={`${String(dateNumber + 1) == dayIndex.split("day")[1] && "font-bold"} text-inherit max-sm:text-sm`}
      >
        {date}
      </p>
      <p className={`text-inherit max-sm:text-sm`}>{dateCountString}</p>
    </button>
  );
};

export default DateItem;
