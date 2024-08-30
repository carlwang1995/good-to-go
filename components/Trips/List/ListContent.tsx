import React from "react";
import ListItem from "./ListItem";
type newTripType = {
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

type ListContentProps = {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  trips: Array<newTripType>;
};
const ListContent = ({ setDisplay, trips }: ListContentProps) => {
  return (
    <>
      <div className="mt-4 flex w-full flex-wrap">
        <div
          onClick={() => setDisplay((prev) => !prev)}
          className="m-4 flex min-h-[200px] min-w-[320px] max-w-[320px] items-center justify-center rounded-lg border border-solid border-slate-500 bg-white hover:cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-solid border-slate-500">
              <p className="text-2xl text-slate-500">+</p>
            </div>
            <div className="text-slate-500">新增行程</div>
          </div>
        </div>
        {trips.length > 0 ? (
          trips.map((trip, index) => (
            <ListItem
              key={index}
              docId={trip.docId}
              tripName={trip.tripName}
              startDate={trip.startDate}
              endDate={trip.endDate}
              photoName={trip.photo.fileName}
              photoUrl={trip.photo.photoUrl}
              privacy={trip.privacy}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ListContent;
