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
    <Image
      src="/loading-2.gif"
      alt="loading"
      width={widthPx}
      height={heightPx}
    />
  );
};

const PageLoading = ({
  widthPx,
  heightPx,
}: {
  widthPx: number;
  heightPx: number;
}) => {
  return (
    <Image
      src="/pageLoading.gif"
      alt="loading"
      width={widthPx}
      height={heightPx}
    />
  );
};

export { Loading, PageLoading };
