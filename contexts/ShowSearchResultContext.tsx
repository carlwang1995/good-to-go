import { createContext } from "react";

const ShowSearchResultContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export { ShowSearchResultContext };
