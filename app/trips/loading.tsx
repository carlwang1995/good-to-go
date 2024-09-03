import React from "react";
import LoadingUI from "@/components/Loading";

const Loading = () => {
  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center">
      <LoadingUI widthPx={80} heightPx={80} />
    </div>
  );
};

export default Loading;
