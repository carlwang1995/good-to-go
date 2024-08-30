import React, { useState, useEffect } from "react";
import ListContent from "@/components/Trips/List/ListContent";
import CreateTripCard from "@/components/Trips/CreateTripCard";
import BrowseContent from "./Browse/BrowseContent";
import { StateContext } from "@/contexts/ContextProvider";
import { DB_getTrips } from "@/libs/db/CreateTripPage";

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

const TripsContent = ({ userId }: { userId: string }) => {
  const [state, setState] = useState<boolean>(false);
  const [trips, setTrips] = useState<Array<TripType>>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [content, setContent] = useState(true);

  useEffect(() => {
    if (userId) {
      DB_getTrips(userId).then((result: any) => {
        if (result && result.length !== 0) {
          setTrips(result);
        } else {
          setTrips([]);
        }
      });
    }
  }, [userId, state]);

  return (
    <StateContext.Provider value={setState}>
      <div className="flex">
        <div
          onClick={() => setContent(true)}
          className={`border-b-4 border-solid p-2 text-lg transition ${content ? "border-blue-700" : "border-transparent"} hover:cursor-pointer ${content ? "hover:border-blue-700" : "hover:border-blue-300"}`}
        >
          我的行程
        </div>
        <div
          onClick={() => setContent(false)}
          className={`border-b-4 border-solid p-2 text-lg transition ${!content ? "border-blue-700" : "border-transparent"} hover:cursor-pointer ${!content ? "hover:border-blue-700" : "hover:border-blue-300"}`}
        >
          探索行程
        </div>
      </div>
      <hr className="border-slate-400" />
      {content ? (
        <ListContent setDisplay={setDisplay} trips={trips} />
      ) : (
        <BrowseContent />
      )}
      {display ? <CreateTripCard setDisplay={setDisplay} /> : <></>}
    </StateContext.Provider>
  );
};

export default TripsContent;
