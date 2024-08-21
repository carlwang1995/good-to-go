import React from "react";

type TargetItemProps = {
  number: number;
  target: string;
  inputDestinaiton: Array<string>;
  setInputDestinaiton: React.Dispatch<React.SetStateAction<Array<string>>>;
};

const TargetItem = ({
  number,
  target,
  inputDestinaiton,
  setInputDestinaiton,
}: TargetItemProps) => {
  const removeTarget = (index: number) => {
    const newArray = [...inputDestinaiton];
    newArray.splice(index, 1);
    setInputDestinaiton(newArray);
  };
  return (
    <div className="mb-2 mr-2 flex items-center justify-center border border-solid border-slate-400 px-2 py-1">
      <p className="mr-2">{target}</p>
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
