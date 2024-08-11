import React from "react";

const TrafficTimeBox = () => {
  return (
    <div className="flex items-center hover:cursor-pointer hover:bg-slate-200">
      <div className="w-10"></div>
      <div className="text-4xl">｜</div>
      <div className="pl-2 pr-2">開車</div>
      <div className="pl-2 pr-2">約 10 分</div>
    </div>
  );
};

export default TrafficTimeBox;
