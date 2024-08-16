import React from "react";

type DateItemProps = {
  date: string;
  dateNumber: number;
  setDateCount: React.Dispatch<React.SetStateAction<string>>;
  setDayIndex: React.Dispatch<React.SetStateAction<string>>;
};

const DateItem = ({
  date,
  dateNumber,
  setDateCount,
  setDayIndex,
}: DateItemProps) => {
  const dateCountString = `第${String(dateNumber + 1)}天`;
  return (
    <div
      className="flex h-full min-w-24 flex-col items-center justify-center border-r bg-white hover:cursor-pointer hover:font-bold"
      onClick={() => {
        setDateCount(dateCountString);
        const dayIndex: string = "day" + String(dateNumber + 1);
        setDayIndex(dayIndex);
      }}
    >
      <p>{date}</p>
      <p>{dateCountString}</p>
    </div>
  );
};

export default DateItem;
