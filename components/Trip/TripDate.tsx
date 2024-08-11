import React from "react";

type TripDateProps = {
  date: string;
  dateCount: number;
  setDateCount: React.Dispatch<React.SetStateAction<string>>;
};

const TripDate = ({ date, dateCount, setDateCount }: TripDateProps) => {
  const dateCountString = `第${String(dateCount + 1)}天`;
  return (
    <div
      className="flex h-full min-w-24 flex-col items-center justify-center border-r bg-white hover:cursor-pointer hover:font-bold"
      onClick={() => setDateCount(dateCountString)}
    >
      <p>{date}</p>
      <p>{dateCountString}</p>
    </div>
  );
};

export default TripDate;
