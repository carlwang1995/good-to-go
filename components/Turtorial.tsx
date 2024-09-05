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
      <div className="w-[900px]">
        <section>
          <div className="flex items-center">
            <h2 className="mr-4 text-nowrap text-3xl font-bold italic text-sky-800">
              Step 1 → 建立行程
            </h2>
            <hr className="mt-2 w-full border border-sky-800" />
          </div>
          <div className="flex w-full">
            <div className="mx-2 my-4 h-[300px] w-1/2 bg-zinc-200"></div>
            <div className="mx-2 my-4 flex h-[300px] w-1/2 flex-col justify-center">
              <p className="m-2 mb-6 text-xl text-sky-700">
                可以設定行程起訖日期、加入多個目的地城市，並為行程取一個名稱吧！
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center">
            <h2 className="mr-4 text-nowrap text-3xl font-bold italic text-sky-800">
              Step 2 → 規劃行程
            </h2>
            <hr className="mt-2 w-full border border-sky-800" />
          </div>
          <div className="flex w-full">
            <div className="mx-2 my-4 h-[300px] w-1/2 bg-zinc-200"></div>
            <div className="mx-2 my-4 flex h-[300px] w-1/2 flex-col justify-center">
              <p className="m-2 mb-6 text-xl text-sky-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                corporis dolor pariatur illum omnis ab asperiores quod minus
                repellat ullam! Provident voluptas nulla cupiditate neque
                deserunt sapiente iste velit modi.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center">
            <h2 className="mr-4 text-nowrap text-3xl font-bold italic text-sky-800">
              Step 3 → 分享行程
            </h2>
            <hr className="mt-2 w-full border border-sky-800" />
          </div>
          <div className="flex w-full">
            <div className="mx-2 my-4 h-[300px] w-1/2 bg-zinc-200"></div>
            <div className="mx-2 my-4 flex h-[300px] w-1/2 flex-col justify-center">
              <p className="m-2 mb-6 text-xl text-sky-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                consectetur delectus perferendis saepe molestias ea quas
                distinctio sunt, vero consequuntur. Mollitia similique quas
                ullam magni consectetur dolor corporis eligendi reprehenderit.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Turtorial;
