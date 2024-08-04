"use client";
import React from "react";
import Link from "next/link";

const TripEdit = () => {
  return (
    <div>
      <div className="z-10 h-56 w-full bg-slate-500 shadow-lg">
        <div className="flex h-16 w-full items-center bg-black/50 p-3">
          <Link href="/trips">
            <span className="mr-3 w-8 text-xl text-white hover:font-bold">
              ←
            </span>
          </Link>
          <span className="text-xl text-white">台北一日遊</span>
        </div>
        <div className="flex h-24 w-full flex-col items-center justify-center p-3">
          <div className="w-full">
            <span className="text-white">2024/08/05</span>
            <span className="text-white"> - </span>
            <span className="text-white">2024/08/07</span>
          </div>
          <div className="w-full">
            <p className="text-white"> 台北市</p>
          </div>
        </div>
        <div className="flex h-16 w-full bg-white">
          <div className="flex h-full w-28 flex-col items-center justify-center border-r-2 bg-white hover:cursor-pointer hover:font-bold">
            <p>8月5日</p>
            <p>第一天</p>
          </div>
          <div className="flex h-full w-28 flex-col items-center justify-center border-r-2 bg-white hover:cursor-pointer hover:font-bold">
            <p>8月6日</p>
            <p>第二天</p>
          </div>
          <div className="flex h-full w-28 flex-col items-center justify-center border-r-2 bg-white hover:cursor-pointer hover:font-bold">
            <p>8月7日</p>
            <p>第三天</p>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-4 flex items-center justify-center bg-slate-200">
          <p>第一天</p>
        </div>
        <div className="p-2">
          <span>出發時間：</span>
          <span className="underline hover:cursor-pointer hover:font-bold">
            08:00
          </span>
        </div>
        <div className="flex border-b-2 border-t-2 p-5 shadow-lg">
          <div className="relative h-20 w-20 bg-slate-400">
            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center bg-slate-600">
              <p className="text-white">1</p>
            </div>
          </div>
          <div className="ml-2 flex flex-col justify-center">
            <div>
              <span className="underline hover:cursor-pointer hover:font-bold">
                1小時
              </span>
              <> | </>
              <span>08:00 - 09:00</span>
            </div>
            <div className="font-bold">台北101</div>
            <div>台灣 11049 信義區 信義路五段7號</div>
          </div>
        </div>
        <div className="flex items-center hover:cursor-pointer hover:bg-slate-200">
          <div className="w-10"></div>
          <div className="text-4xl">｜</div>
          <div className="pl-2 pr-2">開車</div>
          <div className="pl-2 pr-2">約 10 分</div>
        </div>
        <div className="flex border-b-2 border-t-2 p-5 shadow-lg">
          <div className="relative h-20 w-20 bg-slate-400">
            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center bg-slate-600">
              <p className="text-white">2</p>
            </div>
          </div>
          <div className="ml-2 flex flex-col justify-center">
            <div>
              <span className="underline hover:cursor-pointer hover:font-bold">
                1小時
              </span>
              <> | </>
              <span>09:10 - 10:10</span>
            </div>
            <div className="font-bold">臺北松山機場</div>
            <div>台灣 10512 台北 台北市 敦化北路340-10號</div>
          </div>
        </div>
        <div className="flex items-center justify-center p-10">
          <button className="mt-5 rounded border-[1px] border-solid border-black p-2 text-xl hover:cursor-pointer hover:bg-slate-200">
            + 搜尋並加入景點
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripEdit;
