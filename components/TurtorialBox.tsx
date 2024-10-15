type TurtorialBoxProps = {
  title: string;
  videoUrl: string;
  msgs: string[];
};

const TurtorialBox = ({ title, videoUrl, msgs }: TurtorialBoxProps) => {
  return (
    <section>
      <div className="flex items-center">
        <h2 className="mr-4 text-nowrap text-3xl font-bold italic text-sky-800">
          {title}
        </h2>
        <hr className="mt-2 w-full border border-sky-800" />
      </div>
      <div className="flex w-full max-[680px]:flex-col max-sm:items-center">
        <video
          className="relative my-4 aspect-[1/0.572] w-full shadow-lg min-[680px]:mx-2 min-[680px]:min-w-[450px] min-[880px]:min-w-[600px]"
          src={videoUrl}
          autoPlay
          muted
          loop
        ></video>
        <ul className="flex w-full flex-col justify-center">
          {msgs.map((msg, index) => (
            <li
              key={index}
              className="m-2 flex items-start text-xl text-sky-700 min-[880px]:m-4"
            >
              <span className="mr-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={28}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7"
                      stroke="#0369a1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </span>
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TurtorialBox;
