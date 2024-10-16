const TripsContentSkeleton = () => {
  return (
    <div className="mx-10 mb-6 w-[1100px] max-sm:mx-6">
      <div className="my-5">
        <p className="text-3xl font-bold text-sky-800">Loading...</p>
      </div>
      <div className="flex">
        <button className="border-b-4 border-solid border-transparent p-2 text-lg text-[#f4f4f5]">
          我的行程
        </button>
        <button className="border-b-4 border-solid border-transparent p-2 text-lg text-[#f4f4f5]">
          探索行程
        </button>
      </div>
      <hr className="border-slate-400" />
      <ul className="mt-4 grid w-full grid-cols-3 gap-8 max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
        <li className="h-[220px] rounded-lg bg-gray-300 transition-all"></li>
        <li className="h-[220px] rounded-lg bg-gray-300 transition-all"></li>
        <li className="h-[220px] rounded-lg bg-gray-300 transition-all"></li>
        <li className="h-[220px] rounded-lg bg-gray-300 transition-all"></li>
        <li className="h-[220px] rounded-lg bg-gray-300 transition-all"></li>
        <li className="h-[220px] rounded-lg bg-gray-300 transition-all"></li>
      </ul>
    </div>
  );
};

export default TripsContentSkeleton;
