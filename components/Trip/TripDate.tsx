import React from "react";

type TripDateProps = {
  date: string;
  dateCount: string;
  setDateCount: React.Dispatch<React.SetStateAction<string>>;
};

const TripDate = ({ date, dateCount, setDateCount }: TripDateProps) => {
  return (
    <div
      className="flex h-full w-28 flex-col items-center justify-center border-r bg-white hover:cursor-pointer hover:font-bold"
      onClick={() => setDateCount(dateCount)}
    >
      <p>{date}</p>
      <p>{dateCount}</p>
    </div>
  );
};

export default TripDate;
