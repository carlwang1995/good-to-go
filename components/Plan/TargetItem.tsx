import React from "react";

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
      <span
        onClick={() => {
          removeTarget(number);
        }}
        className="text-red-800 hover:cursor-pointer"
      >
        &#10006;
      </span>
    </div>
  );
};

export default TargetItem;
