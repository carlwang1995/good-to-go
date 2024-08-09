import Link from "next/link";

type ListCardProps = {
  id?: string;
  tripName: string;
  startDate: string;
  endDate: string;
};
const ListCard = ({ tripName, startDate, endDate }: ListCardProps) => {
  return (
    <div className="m-5 w-[300px] rounded-lg border border-solid border-black bg-white">
      <Link href="/trips/66ac9fee9d031371f0d9d976">
        <div className="hover:shadow-xl">
          <div className="h-[130px] w-full rounded-tl-lg rounded-tr-lg bg-slate-500"></div>
          <div className="px-2 py-5 text-xl font-bold">{tripName}</div>
          <div className="flex px-2 pb-5">
            <div>{startDate}</div>
            <div className="mx-2">~</div>
            <div>{endDate}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListCard;
