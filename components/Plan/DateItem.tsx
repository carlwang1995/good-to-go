import React from "react";

type DateItemProps = {
  date: string;
  dateNumber: number;
  dayIndex: string;
  setDateCount: React.Dispatch<React.SetStateAction<string>>;
  setDayIndex: React.Dispatch<React.SetStateAction<string>>;
};

const DateItemSelected = ({
  date,
  dateNumber,
  dayIndex,
  setDateCount,
  setDayIndex,
}: DateItemProps) => {
  const dateCountString = `第${String(dateNumber + 1)}天`;
  return (
    <>
      {String(dateNumber + 1) == dayIndex.split("day")[1] ? (
        <div
          className="flex h-full min-w-24 flex-col items-center justify-center border-b-4 border-r border-b-blue-500 bg-white font-bold transition hover:cursor-pointer"
          onClick={() => {
            setDateCount(dateCountString);
            const dayIndex: string = "day" + String(dateNumber + 1);
            setDayIndex(dayIndex);
          }}
        >
          <p>{date}</p>
          <p>{dateCountString}</p>
        </div>
      ) : (
        <div
          className="flex h-full min-w-24 flex-col items-center justify-center border-r bg-white transition hover:cursor-pointer hover:border-b-4 hover:border-b-blue-200"
          onClick={() => {
            setDateCount(dateCountString);
            const dayIndex: string = "day" + String(dateNumber + 1);
            setDayIndex(dayIndex);
          }}
        >
          <p>{date}</p>
          <p>{dateCountString}</p>
        </div>
      )}
    </>
  );
};

export default DateItemSelected;
