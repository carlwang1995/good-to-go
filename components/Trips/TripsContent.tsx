"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useUser } from "@/contexts/UserAuth";
import { useRouter } from "next/navigation";
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

const TripsContent = () => {
  const [state, setState] = useState<boolean>(false);
  const [trips, setTrips] = useState<Array<TripType>>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [content, setContent] = useState(true);
  const { user, userName, userId } = useUser();
  const router = useRouter();

  if (user !== undefined) {
    !user && router.push("/");
  }

  useEffect(() => {
    async function getData() {
      try {
        const result: Array<TripType> | undefined = await DB_getTrips(userId);
        if (result && result.length !== 0) {
          setTrips(result);
        } else {
          setTrips([]);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (userId) {
      getData();
    }
  }, [userId, state]);

  useLayoutEffect(() => {
    if (sessionStorage.getItem("page") === "browse") {
      setContent(false);
    } else {
      setContent(true);
    }
  }, []);

  return (
    <>
      <div className="mx-10 mb-6 w-[1100px] max-sm:mx-6">
        <div className="my-5">
          <p className="text-3xl font-bold text-sky-800">
            Hi, {userName ? userName : ""}
          </p>
        </div>
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
          <StateContext.Provider value={setState}>
            <ListContent setDisplay={setDisplay} trips={trips} />
          </StateContext.Provider>
        ) : (
          <BrowseContent />
        )}
      </div>
      {display && <CreateTripCard setDisplay={setDisplay} />}
    </>
  );
};

export default TripsContent;
