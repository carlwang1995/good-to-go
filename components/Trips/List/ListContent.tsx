import React from "react";
import ListItem from "./ListItem";

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

type ListContentProps = {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  trips: Array<TripType>;
};
const ListContent = ({ setDisplay, trips }: ListContentProps) => {
  return (
    <ul className="mt-4 grid w-full grid-cols-3 gap-8 max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
      <button
        onClick={() => setDisplay(true)}
        className="flex min-h-[220px] items-center justify-center rounded-lg border border-solid border-sky-800 bg-white transition hover:cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-solid border-blue-500">
            <p className="text-2xl text-blue-500">+</p>
          </div>
          <p className="mt-1 text-xl text-blue-500">新增行程</p>
        </div>
      </button>
      {trips.length > 0 &&
        trips.map((trip) => (
          <ListItem
            key={trip.docId}
            docId={trip.docId}
            tripName={trip.tripName}
            dates={trip.dates}
            startDate={trip.startDate}
            endDate={trip.endDate}
            photoName={trip.photo.fileName}
            photoUrl={trip.photo.photoUrl}
            privacy={trip.privacy}
            destination={trip.destination}
          />
        ))}
    </ul>
  );
};

export default ListContent;
