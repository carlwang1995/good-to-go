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
      <Image
        onClick={() => {
          removeTarget(number);
        }}
        className="hover:cursor-pointer"
        src="/close-r.png"
        alt="close"
        width={12}
        height={12}
      />
    </div>
  );
};

export default TargetItem;
