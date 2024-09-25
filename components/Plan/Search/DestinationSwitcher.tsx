import React, { useContext } from "react";
import { DestinationContext } from "@/contexts/ContextProvider";

type DestinationSwitcherProps = {
  destinationName: string;
  setDestinationName: React.Dispatch<React.SetStateAction<string>>;
};

const DestinationSwitcher = ({
  destinationName,
  setDestinationName,
}: DestinationSwitcherProps) => {
  const destinationArr = useContext(DestinationContext);
  if (!destinationArr) {
    throw new Error("Can't access DestinationContext.");
  }

  return (
    <div className="mt-2 text-lg">
      在
      <select
        value={destinationName}
        onChange={(e) => setDestinationName(e.target.value)}
        className="mx-1 rounded-md border border-solid border-slate-500 px-2 outline-none"
      >
        {destinationArr.map((location, index) => {
          return (
            <option key={index} value={location}>
              {location}
            </option>
          );
        })}
        <option value={""} className="text-gray-400">
          不限
        </option>
      </select>
      盡情探索吧！
    </div>
  );
};

export default DestinationSwitcher;
