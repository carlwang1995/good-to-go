import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { DeleteContext } from "@/contexts/DeleteContext";

type ListCardProps = {
  index: number;
  docId: string;
  tripName: string;
  startDate: string;
  endDate: string;
};

const TripItem = ({
  index,
  docId,
  tripName,
  startDate,
  endDate,
}: ListCardProps) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false);
  const context = useContext(DeleteContext);
  if (context === undefined || context === null) {
    throw new Error(
      "ChildComponent must be used within a ShowSearchResultContext.Provider",
    );
  }
  const deleteTrip = context;
  return (
    <div
      onMouseEnter={() => setShowDeleteBtn((pre) => !pre)}
      onMouseLeave={() => setShowDeleteBtn((pre) => !pre)}
      className="m-4 min-w-[30%] rounded-lg bg-white"
    >
      <div className="relative rounded-lg shadow-lg hover:shadow-xl">
        <Link href={`trips/${docId}`}>
          <div className="h-[130px] w-full rounded-tl-lg rounded-tr-lg bg-slate-500"></div>
          <div className="px-3 py-2 text-xl font-bold">{tripName}</div>
          <div className="flex px-3 pb-2">
            <div>{startDate}</div>
            <div className="mx-2">~</div>
            <div>{endDate}</div>
          </div>
        </Link>
        {showDeleteBtn ? (
          <div className="absolute right-0 top-0 rounded rounded-tr-lg bg-slate-100/20 p-1 text-2xl hover:cursor-pointer hover:bg-slate-100/80 hover:font-bold">
            <Image
              src="/trash-can.png"
              alt="trash"
              width={25}
              height={25}
              onClick={() => {
                deleteTrip(docId);
              }}
            ></Image>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TripItem;
