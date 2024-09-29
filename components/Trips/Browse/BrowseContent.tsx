import React, { useState, useEffect } from "react";
import BrowseItem from "./BrowseItem";
import { DB_getTripsByPrivacy } from "@/libs/db/TripsDoc";

type TripType = {
  docId: string;
  userId: string;
  tripName: string;
  destination: Array<string>;
  dates: Array<string>;
  startDate: string;
  endDate: string;
  photo: { fileName: string; photoUrl: string };
  privacy: boolean;
  createTime: string;
};

const BrowseContent = () => {
  const [tripsArr, setTripsArr] = useState<Array<TripType>>([]);
  useEffect(() => {
    DB_getTripsByPrivacy()
      .then((result: any) => {
        const trips: Array<TripType> = result;
        setTripsArr(trips);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return (
    <div className="mt-4 flex w-full flex-col">
      <ul className="flex w-full flex-col">
        {tripsArr &&
          tripsArr.length > 0 &&
          tripsArr.map((trip, index) => (
            <BrowseItem trip={trip} key={trip.docId} />
          ))}
      </ul>
    </div>
  );
};

export default BrowseContent;
