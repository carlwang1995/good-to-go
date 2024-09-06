import Image from "next/image";
import React from "react";

const Turtorial = () => {
  return (
    <>
      <div className="flex w-full items-center justify-center p-4">
        <Image
          src="/clipboard.png"
          alt="clipboard"
          width={32}
          height={32}
          className="mr-1 h-[32px]"
        />
        <h1 className="my-4 text-2xl font-bold text-sky-800">
          為旅遊輕鬆做準備
        </h1>
      </div>
      <div className="w-[900px] px-4 max-[900px]:w-full">
        <section>
          <div className="flex items-center">
            <h2 className="mr-4 text-nowrap text-3xl font-bold italic text-sky-800">
              Step 1：建立行程
            </h2>
            <hr className="mt-2 w-full border border-sky-800" />
          </div>
          <div className="flex w-full max-sm:flex-col max-sm:items-center">
            <div className="relative mx-2 my-4 h-[300px] min-w-[420px] shadow-lg max-[430px]:h-[240px] max-[430px]:min-w-[336px]">
              <Image
                priority
                src="/turtorial/create-trip.gif"
                alt="create-trip"
                fill
                className="object-cover"
                sizes="height:300px"
              />
            </div>
            <div className="mx-2 my-4 flex h-[300px] w-1/2 flex-col justify-center max-[900px]:w-full max-sm:h-full">
              <p className="m-2 mb-6 text-xl text-sky-700">
                可以設定行程起訖日期、加入多個目的地城市，並為行程取一個名稱吧！
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center">
            <h2 className="mr-4 text-nowrap text-3xl font-bold italic text-sky-800">
              Step 2：規劃行程
            </h2>
            <hr className="mt-2 w-full border border-sky-800" />
          </div>
          <div className="flex w-full max-sm:flex-col max-sm:items-center">
            <div className="relative mx-2 my-4 h-[300px] min-w-[420px] shadow-lg max-[430px]:h-[240px] max-[430px]:min-w-[336px]">
              <Image
                priority
                src="/turtorial/plan-trip.gif"
                alt="plan-trip"
                fill
                className="object-cover"
                sizes="height:300px"
              />
            </div>
            <div className="mx-2 my-4 flex h-[300px] w-1/2 flex-col justify-center max-[900px]:w-full max-sm:h-full">
              <p className="m-2 mb-6 text-xl text-sky-700">
                為每個日期加入想要去的景點，並設定出發時間、景點停留時間以及交通方式等，取得完整的時間規劃結果，更可以使用拖曳方式調整旅程順序！
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center">
            <h2 className="mr-4 text-nowrap text-3xl font-bold italic text-sky-800">
              Step 3：分享行程
            </h2>
            <hr className="mt-2 w-full border border-sky-800" />
          </div>
          <div className="flex w-full max-sm:flex-col max-sm:items-center">
            <div className="relative mx-2 my-4 h-[300px] min-w-[420px] shadow-lg max-[430px]:h-[240px] max-[430px]:min-w-[336px]">
              <Image
                priority
                src="/turtorial/share-trip.gif"
                alt="share-trip"
                fill
                className="object-cover"
                sizes="height:300px"
              />
            </div>
            <div className="mx-2 my-4 flex h-[300px] w-1/2 flex-col justify-center max-[900px]:w-full max-sm:h-full">
              <p className="m-2 mb-6 text-xl text-sky-700">
                規劃完成後，可以將行程設定為公開，除了能以連結方式分享給親朋好友外，也可在「探索行程」中瀏覽已公開的行程列表。
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Turtorial;
