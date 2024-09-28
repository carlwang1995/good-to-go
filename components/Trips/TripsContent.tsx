import React, { useState, useEffect } from "react";
import ListContent from "@/components/Trips/List/ListContent";
import CreateTripCard from "@/components/Trips/CreateTripCard";
import BrowseContent from "./Browse/BrowseContent";
import { StateContext } from "@/contexts/ContextProvider";
import { DB_getTrips } from "@/libs/db/TripsDoc";

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
      DB_getTrips(userId)
        .then((result: any) => {
          if (result && result.length !== 0) {
            setTrips(result);
          } else {
            setTrips([]);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [userId, state]);

  useEffect(() => {
    if (sessionStorage.getItem("page") === "browse") {
      setContent(false);
    } else {
      setContent(true);
    }
  }, []);

  return (
    <StateContext.Provider value={setState}>
      <div className="flex">
        <button
          onClick={() => {
            setContent(true);
            sessionStorage.setItem("page", "list");
          }}
          className={`border-b-4 border-solid p-2 text-lg transition ${content ? "border-blue-700 font-bold text-blue-700 hover:border-blue-700" : "border-transparent hover:border-blue-300 hover:text-blue-300"} `}
        >
          我的行程
        </button>
        <button
          onClick={() => {
            setContent(false);
            sessionStorage.setItem("page", "browse");
          }}
          className={`border-b-4 border-solid p-2 text-lg transition ${!content ? "border-blue-700 font-bold text-blue-700 hover:border-blue-700" : "border-transparent hover:border-blue-300 hover:text-blue-300"} `}
        >
          探索行程
        </button>
      </div>
      <hr className="border-slate-400" />
      {content ? (
        <ListContent setDisplay={setDisplay} trips={trips} />
      ) : (
        <BrowseContent />
      )}

      {display && <CreateTripCard setDisplay={setDisplay} />}
    </StateContext.Provider>
  );
};

export default TripsContent;
