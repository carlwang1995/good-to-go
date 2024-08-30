import Image from "next/image";
import React from "react";

const TrafficModeButton = ({
  mode,
  setMode,
}: {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="my-4 flex">
      <button
        onClick={() => setMode("driving")}
        className={`m-2 flex h-16 w-16 items-center justify-center rounded-lg border transition ${mode == "driving" ? "border-blue-700 bg-blue-500 hover:bg-blue-500" : "border-blue-300 bg-white hover:bg-blue-200"}`}
      >
        <Image
          src={
            mode == "driving"
              ? "/trafficIcon/car-white.png"
              : "/trafficIcon/car-blue.png"
          }
          alt="car icon"
          width={35}
          height={35}
          priority={true}
        />
      </button>
      <button
        onClick={() => setMode("transit")}
        className={`m-2 flex h-16 w-16 items-center justify-center rounded-lg border transition ${mode == "transit" ? "border-blue-700 bg-blue-500 hover:bg-blue-500" : "border-blue-300 bg-white hover:bg-blue-200"}`}
      >
        <Image
          src={
            mode == "transit"
              ? "/trafficIcon/bus-white.png"
              : "/trafficIcon/bus-blue.png"
          }
          alt="bus icon"
          width={35}
          height={35}
          priority={true}
        />
      </button>
      <button
        onClick={() => setMode("walking")}
        className={`m-2 flex h-16 w-16 items-center justify-center rounded-lg border transition ${mode == "walking" ? "border-blue-700 bg-blue-500 hover:bg-blue-500" : "border-blue-300 bg-white hover:bg-blue-200"}`}
      >
        <Image
          src={
            mode == "walking"
              ? "/trafficIcon/walking-white.png"
              : "/trafficIcon/walking-blue.png"
          }
          alt="walking icon"
          width={35}
          height={35}
          priority={true}
        />
      </button>
      <button
        onClick={() => setMode("bicycling")}
        className={`m-2 flex h-16 w-16 items-center justify-center rounded-lg border transition ${mode == "bicycling" ? "border-blue-700 bg-blue-500 hover:bg-blue-500" : "border-blue-300 bg-white hover:bg-blue-200"}`}
      >
        <Image
          src={
            mode == "bicycling"
              ? "/trafficIcon/bike-white.png"
              : "/trafficIcon/bike-blue.png"
          }
          alt="bike icon"
          width={35}
          height={35}
          priority={true}
        />
      </button>
    </div>
  );
};

export default TrafficModeButton;
