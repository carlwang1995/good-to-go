import ListCard from "./ListCard";

type ListContentProps = {
  setDialogBoxDisplay: any;
  newTrip: Array<object>;
};
const ListContent = ({ setDialogBoxDisplay, newTrip }: ListContentProps) => {
  return (
    <>
      <div className="mt-5 flex w-full justify-end">
        <button
          onClick={setDialogBoxDisplay}
          className="rounded border-[1px] border-solid border-black bg-white p-2 text-xl hover:cursor-pointer hover:bg-slate-200"
        >
          新增行程
        </button>
      </div>
      <div className="flex w-full flex-wrap">
        {newTrip.map((trip: any, index: number) => (
          <ListCard
            key={index}
            tripName={trip.tripName}
            startDate={trip.startDate}
            endDate={trip.endDate}
          />
        ))}
      </div>
    </>
  );
};

export default ListContent;
