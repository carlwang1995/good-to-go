import Image from "next/image";
import React from "react";

type TargetItemProps = {
  number: number;
  target: string;
  destinaitonArray: Array<string>;
  setDestinaitonArray: React.Dispatch<React.SetStateAction<Array<string>>>;
};

const TargetItem = ({
  number,
  target,
  destinaitonArray,
  setDestinaitonArray,
}: TargetItemProps) => {
  const removeTarget = (index: number) => {
    const newArray = [...destinaitonArray];
    newArray.splice(index, 1);
    setDestinaitonArray(newArray);
  };
  return (
    <div className="relative mb-2 mr-2 flex items-center justify-center border border-gray-500 px-2 py-1">
      <p className="mr-2 max-w-[360px] overflow-hidden text-ellipsis text-nowrap">
        {target}
      </p>
      {/* Delete Button */}
      <span
        onClick={() => {
          removeTarget(number);
        }}
        className="hover:cursor-pointer"
      >
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          width={18}
          height={18}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#ff0000"
              d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
            ></path>
          </g>
        </svg>
      </span>
    </div>
  );
};

export default TargetItem;
