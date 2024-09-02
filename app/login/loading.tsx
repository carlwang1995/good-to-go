import LoadingUI from "@/components/Loading";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoadingUI widthPx={50} heightPx={50} />
    </div>
  );
};

export default Loading;
