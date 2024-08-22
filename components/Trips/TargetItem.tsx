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
    <div className="relative mb-2 mr-2 flex items-center justify-center border border-solid border-slate-400 px-2 py-1">
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
