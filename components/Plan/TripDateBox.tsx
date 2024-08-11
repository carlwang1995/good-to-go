import React from "react";

type TripDateProps = {
  date: string;
  dateNumber: number;
  setDateCount: React.Dispatch<React.SetStateAction<string>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const TripDate = ({
  date,
  dateNumber,
  setDateCount,
  setIndex,
}: TripDateProps) => {
  const dateCountString = `第${String(dateNumber + 1)}天`;
  return (
    <div
      className="flex h-full min-w-24 flex-col items-center justify-center border-r bg-white hover:cursor-pointer hover:font-bold"
      onClick={() => {
        setDateCount(dateCountString);
        setIndex(dateNumber);
      }}
    >
      <p>{date}</p>
      <p>{dateCountString}</p>
    </div>
  );
};

export default TripDate;
