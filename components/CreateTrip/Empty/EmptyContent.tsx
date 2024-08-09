const EmptyContent = ({
  setDialogBoxDisplay,
}: {
  setDialogBoxDisplay: any;
}) => {
  return (
    <div className="m-8 w-full">
      <div className="flex flex-col items-center">
        <div className="text-xl">
          <p>立即規劃行程，為旅遊輕鬆做準備</p>
        </div>
        <button
          onClick={setDialogBoxDisplay}
          className="mt-5 rounded border-[1px] border-solid border-black bg-white p-2 text-xl hover:cursor-pointer hover:bg-slate-200"
        >
          開始規劃
        </button>
      </div>
    </div>
  );
};

export default EmptyContent;
