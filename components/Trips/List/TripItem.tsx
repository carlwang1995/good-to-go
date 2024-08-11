import Link from "next/link";

type ListCardProps = {
  docId: string;
  tripName: string;
  startDate: string;
  endDate: string;
};
const TripItem = ({ docId, tripName, startDate, endDate }: ListCardProps) => {
  return (
    <div className="m-4 min-w-[30%] rounded-lg bg-white">
      <Link href={`trips/${docId}`}>
        <div className="shadow-lg hover:shadow-xl">
          <div className="h-[130px] w-full rounded-tl-lg rounded-tr-lg bg-slate-500"></div>
          <div className="px-3 py-2 text-xl font-bold">{tripName}</div>
          <div className="flex px-3 pb-2">
            <div>{startDate}</div>
            <div className="mx-2">~</div>
            <div>{endDate}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TripItem;
