import React from "react";
import Image from "next/image";

type TargetItemProps = {
  number: number;
  target: string;
  destinaitonArray: Array<string> | undefined;
  setDestinaitonArray: React.Dispatch<
    React.SetStateAction<Array<string> | undefined>
  >;
};

const TargetItem = ({
  number,
  target,
  destinaitonArray,
  setDestinaitonArray,
}: TargetItemProps) => {
  const removeTarget = (index: number) => {
    if (destinaitonArray) {
      const newArray = [...destinaitonArray];
      newArray.splice(index, 1);
      setDestinaitonArray(newArray);
    }
  };
  return (
    <div className="relative mb-2 mr-2 flex items-center justify-center bg-white px-2 py-1 text-sm">
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
