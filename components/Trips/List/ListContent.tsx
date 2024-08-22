import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
type newTripType = {
  docId: string;
  tripName: string;
  startDate: string;
  endDate: string;
  photo: { fileName: string; photoUrl: string };
};
type ListContentProps = {
  setDialogBoxDisplay: any;
  newTrip: Array<newTripType> | undefined;
};
const ListContent = ({ setDialogBoxDisplay, newTrip }: ListContentProps) => {
  const [tripItemArr, setTripItemArr] = useState<
    Array<React.JSX.Element> | undefined
  >(undefined);
  useEffect(() => {
    const newArr = [];
    if (newTrip) {
      for (let i = 0; i < newTrip.length; i++) {
        newArr.push(
          <ListItem
            key={i}
            index={i}
            docId={newTrip[i].docId}
            tripName={newTrip[i].tripName}
            startDate={newTrip[i].startDate}
            endDate={newTrip[i].endDate}
            photoName={newTrip[i].photo.fileName}
            photoUrl={newTrip[i].photo.photoUrl}
          />,
        );
      }
      setTripItemArr(newArr);
    }
  }, [newTrip]);
  return (
    <>
      <div className="mt-5 flex w-full justify-end">
        <button
          onClick={setDialogBoxDisplay}
          className="mr-3 rounded border-[1px] border-solid border-black bg-white p-2 text-xl hover:cursor-pointer hover:bg-slate-200"
        >
          新增行程
        </button>
      </div>
      <div className="flex w-full flex-wrap">{tripItemArr}</div>
    </>
  );
};

export default ListContent;
