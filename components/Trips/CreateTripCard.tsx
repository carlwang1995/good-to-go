import React, { useState } from "react";
import Calendar from "./Calendar";
import TripInputBox from "./TripInputBox";

type CreateTripCardProps = {
  userId: string;
  setDialogBoxDisplay: () => void;
};

const CreateTripCard = ({
  userId,
  setDialogBoxDisplay,
}: CreateTripCardProps) => {
  const [startDate, setStartDate] = useState<string>("出發日期");
  const [endDate, setEndDate] = useState<string>("結束日期");
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80"
      // style={display ? { display: "flex" } : { display: "none" }}
    >
      <TripInputBox
        userId={userId}
        startDate={startDate}
        endDate={endDate}
        setIsOpenCalendar={setIsOpenCalendar}
        setDialogBoxDisplay={setDialogBoxDisplay}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {isOpenCalendar ? (
        <Calendar
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setIsOpenCalendar={setIsOpenCalendar}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateTripCard;
