import Image from "next/image";
import React from "react";

const Loading = ({
  widthPx,
  heightPx,
}: {
  widthPx: number;
  heightPx: number;
}) => {
  return (
    <Image src="/loading.gif" alt="loading" width={widthPx} height={heightPx} />
  );
};

export default Loading;
